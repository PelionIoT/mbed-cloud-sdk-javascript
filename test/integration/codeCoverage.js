var fs = require("fs");
var path = require("path");
var nyc = require("nyc");
var glob = require("glob");
var istanbulHook = require("istanbul-lib-hook");
var istanbulMaps = require("istanbul-lib-source-maps");
var istanbulCoverage = require("istanbul-lib-coverage");
var istanbulInstrument = require("istanbul-lib-instrument");

// Variables
var root = path.join(__dirname, "../..");
var projectRoot = path.join(__dirname, "../../../../..");
var coverageDir = path.join(projectRoot, "coverage");
var coverageFile = path.join(coverageDir, "int_coverage.json");

var collectCoverageFrom = ["src/**/*.js", "!src/legacy/_api/**", "!src/schema/**/*.ts", "!src/foundation/_schemas/**/*.ts",];

if (!fs.existsSync(coverageDir)) {
    fs.mkdirSync(coverageDir);
}

var reporter = new nyc({
    tempDirectory: coverageDir,
    reportDir: path.join(projectRoot, "reports"),
    reporter: ["html", "lcov", "cobertura"]
});

// Determine files to cover
var coverageFiles = expandFiles(collectCoverageFrom);

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
        .map(pattern => glob.sync(pattern, {
            ignore: excludes
        }))
        .reduce((allFiles, files) => allFiles.concat(files), paths)
        .map(p => path.normalize(p));
}

// Instrumentation
var instrumenter = istanbulInstrument.createInstrumenter({
    preserveComments: true,
    produceSourceMap: true
});

function instrumentCode(code, sourceFile) {
    var sourceMapRegEx = /^(?:\/{2}[#@]{1,2}|\/\*)\s+sourceMappingURL\s*=\s*(data:(?:[^;]+;)+base64,)?(\S+)/;
    if (!code) code = fs.readFileSync(sourceFile.filename, {
        encoding: "utf8"
    });
    var lastNewline = code.lastIndexOf("\n", code.length - 2);
    var lastLine = code.slice(lastNewline + 1);
    var sourceMap = null;
    var match;

    if ((match = sourceMapRegEx.exec(lastLine))) {
        if (match[1]) { //It is a data URI.
            sourceMap = JSON.parse(new Buffer(match[2], "base64").toString("utf8"));
        } else {
            sourceMap = JSON.parse(fs.readFileSync(sourceFile.filename + ".map", {
                encoding: "utf8"
            }));
        }
    }

    try {
        return instrumenter.instrumentSync(code, path.normalize(sourceFile.filename), sourceMap);
    } catch (error) {
        console.log(error);
        return code;
    }
}


var unhookRequire = istanbulHook.hookRequire(file => {
    return coverageFiles.indexOf(path.normalize(file)) !== -1;
}, instrumentCode);

// The server cannot be required so that it gets hooked by Istanbul
var server = require("./server/server")

// Add an exit callback to the server so that a coverage report gets generated.
server.addExitCallback(function () {
    if (unhookRequire) unhookRequire();

    var coverageMap = istanbulCoverage.createCoverageMap(__coverage__);
    var sourceMaps = istanbulMaps.createSourceMapStore();
    var transformed = sourceMaps.transformCoverage(coverageMap);
    fs.writeFileSync(coverageFile, JSON.stringify(transformed.map));

    reporter.report();
});

// Start the SDK test server.
server.start();
