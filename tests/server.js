var fs = require("fs");
var path = require("path");
var http = require("http");

var nyc = require("nyc");
var glob = require("glob");
var express = require("express");

var istanbulHook = require("istanbul-lib-hook");
var istanbulMaps = require("istanbul-lib-source-maps");
var istanbulCoverage = require("istanbul-lib-coverage");
var istanbulInstrument = require("istanbul-lib-instrument");

var mapping = require("./mapping");
var intern = require("../intern.json");

// Variables
var port = 5000;
var logPrefix = "  \x1b[1m\x1b[34mtestserver\x1b[0m ";
var envVarKey = "MBED_CLOUD_API_KEY";
var host = process.env["MBED_CLOUD_HOST"];
var root = path.join(__dirname, "..");
var coverageDir = path.join(root, "coverage");
var coverageFile = path.join(coverageDir, "int_coverage.json");

var reporter = new nyc({
    tempDirectory: coverageDir,
    reportDir: path.join(root, "reports"),
    reporter: ["html", "lcov", "cobertura"]
});

// Environment configuration
var config = {
    apiKey: process.env[envVarKey],
};

if (!config.apiKey) {
    console.log(`Unable to find ${envVarKey} environment variable`);
    process.exit();
}

if (host) {
    config.host = host;
    console.log(`Using host ${config.host}`);
}

// Determine files to cover
var coverageFiles = expandFiles(intern.coverage);
function expandFiles(patterns) {
	var excludes = [];
	var includes = [];
	var paths = [];

	patterns.forEach(pattern => {
		if (pattern[0] === "!") excludes.push(path.resolve(root, pattern.slice(1)));
		else {
			if (glob.hasMagic(pattern)) includes.push(path.resolve(root, pattern));
			else paths.push(path.resolve(root, pattern));
		}
    });

    return includes
    .map(pattern => glob.sync(pattern, { ignore: excludes }))
    .reduce((allFiles, files) => allFiles.concat(files), paths);
}

// Instrumentation
var instrumenter = istanbulInstrument.createInstrumenter({
    preserveComments: true,
    produceSourceMap: true
});

function instrumentCode(code, sourceFile) {
    var sourceMapRegEx = /^(?:\/{2}[#@]{1,2}|\/\*)\s+sourceMappingURL\s*=\s*(data:(?:[^;]+;)+base64,)?(\S+)/;

    if (!code) code = fs.readFileSync(sourceFile, { encoding: "utf8" });
    var lastNewline = code.lastIndexOf("\n", code.length - 2);
    var lastLine = code.slice(lastNewline + 1);
    var sourceMap = null;
    var match;

    if ((match = sourceMapRegEx.exec(lastLine))) {
        if (match[1]) sourceMap = JSON.parse(new Buffer(match[2], "base64").toString("utf8"));
        else {
            var mapFile = path.join(path.dirname(sourceFile), match[2]);
            sourceMap = JSON.parse(fs.readFileSync(mapFile, { encoding: "utf8" }));
        }
    }

    try {
        return instrumenter.instrumentSync(code, path.normalize(sourceFile), sourceMap);
    } catch (error) {
        return code;
    }
}

var unhookRequire = istanbulHook.hookRequire(file => {
    return coverageFiles.indexOf(file) !== -1;
}, instrumentCode);

// On exit
process.on("SIGTERM", function() {
    if (unhookRequire) unhookRequire();

    var coverageMap = istanbulCoverage.createCoverageMap(__coverage__);
    var sourceMaps = istanbulMaps.createSourceMapStore();
    var transformed = sourceMaps.transformCoverage(coverageMap);
    fs.writeFileSync(coverageFile, JSON.stringify(transformed.map));

    reporter.report();
    process.exit();
});

// Setup server
var MbedCloudSDK = require("../lib/");

var modules = {
    AccountManagementApi: new MbedCloudSDK.AccountManagementApi(config),
    CertificatesApi: new MbedCloudSDK.CertificatesApi(config),
    ConnectApi: new MbedCloudSDK.ConnectApi(config),
    DeviceDirectoryApi: new MbedCloudSDK.DeviceDirectoryApi(config),
    UpdateApi: new MbedCloudSDK.UpdateApi(config)
}

var app = express();
app.get("/_init", (req, res, next) => {
    res.send({});
});

function sendError(res, error) {
    var statusCode = error.code || 500;
    var message = error.message;
    console.log(`${logPrefix}${statusCode}: ${message}`);

    res.status(statusCode).send({
        message: message
    });
}

app.get("/:module/:method", (req, res, next) => {

    console.log(`${logPrefix}TEST http://localhost:${port}${req.url} at ${new Date().toISOString()}`);

    // Module
    var module = mapping.mapModule(req.params["module"]);

    // Method
    var method = mapping.mapMethod(module, req.params["method"]);

    if (!modules[module] || !modules[module][method]) {
        return sendError(res, {
            message: `'${method}' not found on '${module}'`
        });
    }

    // Args
    var args = mapping.mapArgs(module, method, req.query["args"]);

    console.log(`${logPrefix}CALLING '${method}' on '${module}'`);
    if (args.length) {
        console.log(`${logPrefix}USING`, args);
    }

    args.push((error, result) => {
        if (error) {
            return sendError(res, error);
        }
        result = mapping.mapResult(module, method, result);
        res.json(result);
    });

    // Call
    modules[module][method].apply(modules[module], args);
});

// Start server
http.createServer(app)
.listen(port, () => console.log(`Tests server listening on port ${port}`));
