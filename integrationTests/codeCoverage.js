var fs = require("fs");
var path = require("path");
var nyc = require("nyc");
var glob = require("glob");
var istanbulHook = require("istanbul-lib-hook");
var istanbulMaps = require("istanbul-lib-source-maps");
var istanbulCoverage = require("istanbul-lib-coverage");
var istanbulInstrument = require("istanbul-lib-instrument");
var sourceMapMerger = require("source-map-merger");
var intern = require("../../intern.json");


// Variables
var root = path.join(__dirname, "..");
var builtSdkDir = path.join(root, "./lib");
var projectRoot = path.join(__dirname, "../..");
var projectRootBuild = path.join(projectRoot, "./lib");
var projectRootSrc = path.join(projectRoot, "./src");
var coverageDir = path.join(projectRoot, "coverage");
var coverageFile = path.join(coverageDir, "int_coverage.json");

if (!fs.existsSync(coverageDir)) {
    fs.mkdirSync(coverageDir);
}

var reporter = new nyc({
    tempDirectory: coverageDir,
    reportDir: path.join(projectRoot, "reports"),
    reporter: ["html", "lcov", "cobertura"]
});


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

function findAndCorrectMapFile(sourceFile, mapFileName) {
    // Method to find the correct SDK map files which maps the "built" javascript to the corresponding typescript.
    var dirPath = path.normalize(path.dirname(sourceFile));
    var relativePathFromTop = path.relative(builtSdkDir, dirPath);
    var relativePathToSrc = path.relative(dirPath, projectRootSrc);
    var relatedProjectBuildFolder = path.normalize(path.join(projectRootBuild, relativePathFromTop));
    var correctMapFile = path.normalize(path.join(relatedProjectBuildFolder, mapFileName));
    var mapFileToChange = path.normalize(path.join(dirPath, mapFileName));
    // load correct map file and modify path fields.
    var correctSourceMap = JSON.parse(fs.readFileSync(correctMapFile, {
        encoding: "utf8"
    }));
    // Merge source maps.
    var mergedMapStr = sourceMapMerger.createMergedSourceMapFromFiles([
        correctMapFile,
        mapFileToChange
    ], true /* Ignore missing statements */ );
    var mergedMap = JSON.parse(mergedMapStr);
    // Fix source paths.
    if (correctSourceMap.sourceRoot) {
        mergedMap.sourceRoot = relativePathToSrc;
    }
    if (correctSourceMap.sources) {
        mergedMap.sources = correctSourceMap.sources;
    }
    // Override current source map file content.
    fs.writeFileSync(mapFileToChange, JSON.stringify(mergedMap));
    return mapFileToChange;
}

function instrumentCode(code, sourceFile) {
    var sourceMapRegEx = /^(?:\/{2}[#@]{1,2}|\/\*)\s+sourceMappingURL\s*=\s*(data:(?:[^;]+;)+base64,)?(\S+)/;
    if (!code) code = fs.readFileSync(sourceFile, {
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
            // The mapping is defined in a different file.
            var mapFile = findAndCorrectMapFile(sourceFile, match[2]);
            sourceMap = JSON.parse(fs.readFileSync(mapFile, {
                encoding: "utf8"
            }));
        }
    }

    try {
        return instrumenter.instrumentSync(code, path.normalize(sourceFile), sourceMap);
    } catch (error) {
        return code;
    }
}


var unhookRequire = istanbulHook.hookRequire(file => {
    return coverageFiles.indexOf(path.normalize(file)) !== -1;
}, instrumentCode);

// The server cannot be required so that it gets hooked by Istanbul
var server = require("./server")

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
