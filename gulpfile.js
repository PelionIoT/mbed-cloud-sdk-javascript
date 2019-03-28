var path        = require("path");
var browserify  = require("browserify");
var gulp        = require("gulp");
var buffer      = require("gulp-buffer");
var sourcemaps  = require("gulp-sourcemaps");
var tap         = require("gulp-tap");
var uglify      = require("gulp-uglify");

var namespace = "MbedCloudSDK";
var foundationNamespace = "Mbed.Cloud";

// Source
var srcDir = "src";

// Node
var nodeDir = "lib";
var bundleFiles = nodeDir + "/legacy/**/index.js";
var foundationFiles = nodeDir + "/foundation/**/index.js";
var sdkDirectory = nodeDir + "/sdk.js";

// Browser bundles
var bundleDir = "bundles";

// Browserify helper function
function bundle(srcFiles, destDir, optionsFn) {
    return gulp.src(srcFiles, {
        read: false
    })
    .pipe(tap(function(file) {
        var options = {};
        if (optionsFn) options = optionsFn(file);
        // strip legacy from filename to preserve old bundles
        var fileName = options.fileName || path.basename(file.path);

        if (options.standalone)
            console.log(`Creating ${options.standalone} in ${destDir}/${fileName}`);
        else
            console.log(`Creating ${destDir}/${fileName}`);

        file.contents = browserify(file.path, options)
            .ignore("buffer")
            .ignore("dotenv")
        .bundle()
            .on("error", function (err) {
                console.log(err);
            });
        file.path = path.join(file.base, fileName);
    }))
    .pipe(buffer())
    .pipe(sourcemaps.init({
        loadMaps: true
    }))
    .pipe(uglify({
        preserveComments: function(node, comment) {
            return comment.value.includes("Copyright Arm");
        }
    }))
    .pipe(sourcemaps.write(".", {
        sourceRoot: path.relative(destDir, nodeDir)
    }))
    .pipe(gulp.dest(destDir));
}

function camelToKebab(camel) {
    return camel.replace(/([A-Z]+)/g, function (match) {
        return `-${match.toLowerCase()}`;
    });
}

function camelToPascal(camel) {
    return camel.charAt(0).toUpperCase() + camel.slice(1);
};

// Build CommonJS modules into browser bundles
gulp.task("bundleLegacy", function() {
    return bundle(bundleFiles, bundleDir, function(file) {
        var name = path.dirname(file.relative);
        if (name === ".") {
            return {
                fileName: "index.min.js",
                standalone: namespace
            };
        }

        return {
            fileName: `${camelToKebab(name)}.min${path.extname(file.relative)}`,
            standalone: `${namespace}.${name.charAt(0).toUpperCase()}${name.slice(1)}Api`
        };
    });
});

gulp.task("bundleFoundation", function () {
    return bundle(foundationFiles, bundleDir, function (file) {
        var groupPath = path.dirname(file.relative);
        var name = groupPath.substring(groupPath.indexOf("/") + 1);
        var pascalName = camelToPascal(name);

        if (name === ".") {
            return {
                fileName: "foundation/index.min.js",
                standalone: `${foundationNamespace}.Foundation`
            };
        }

        console.log("filename " + `foundation/${camelToKebab(name)}.min${path.extname(file.relative)}`);
        console.log("standalone " + `${foundationNamespace}.Foundation.${pascalName}`);

        return {
            fileName: `foundation/${camelToKebab(name)}.min${path.extname(file.relative)}`,
            standalone: `${foundationNamespace}.Foundation.${pascalName}`
        };
    });
});

gulp.task("bundleSdk", function () {
    return bundle(sdkDirectory, bundleDir, function (file) {
        var name = path.dirname(file.relative);
        console.log(name);

        return {
            fileName: "sdk.min.js",
            standalone: `${foundationNamespace}.SDK`
        };
    });
});

gulp.task("default", ["bundleLegacy", "bundleFoundation", "bundleSdk"]);
