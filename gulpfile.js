var path        = require("path");
var browserify  = require("browserify");
var del         = require("del");
var merge       = require("merge2");
var tslint      = require("tslint");
var gulp        = require("gulp");
var buffer      = require("gulp-buffer");
var sourcemaps  = require("gulp-sourcemaps");
var tap         = require("gulp-tap");
var typedoc     = require("gulp-typedoc");
var ts          = require("gulp-typescript");
var uglify      = require("gulp-uglify");
var gulpTslint  = require("gulp-tslint");

var namespace = "MbedCloudSDK";

// Source
var srcDir = "src";
var srcFiles = srcDir + "/**/*.ts";
var srcFilesOnly = [
    srcFiles,
    "!" + srcDir + "/_api/**",
    "!" + srcDir + "/_tests/**"
];

// Node
var nodeDir = "lib";
var bundleFiles = nodeDir + "/**/index.js";
var testFiles = nodeDir + "/_tests/**/*.js";

// Browser bundles
var bundleDir = "bundles";
var testDir = bundleDir + "/_tests";

// Other
var docsDir = "docs/_docs";
var typesDir = "types";

var watching = false;

// Error handler suppresses exists during watch
function handleError() {
    if (watching) this.emit("end");
    else process.exit(1);
}

// Set watching
gulp.task("setWatch", function() {
    watching = true;
});

// Browserify helper function
function bundle(srcFiles, destDir, optionsFn) {
    return gulp.src(srcFiles, {
        read: false
    })
    .pipe(tap(function(file) {
        var options = {};
        if (optionsFn) options = optionsFn(file);
        var fileName = options.fileName || path.basename(file.path);

        if (options.standalone)
            console.log(`Creating ${options.standalone} in ${destDir}/${fileName}`);
        else
            console.log(`Creating ${destDir}/${fileName}`);

        file.contents = browserify(file.path, options)
            .ignore("buffer")
            .ignore("dotenv")
        .bundle()
        .on("error", handleError);
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

// Build CommonJS modules into browser bundles
gulp.task("bundleSource", function() {
    return bundle(bundleFiles, bundleDir, function(file) {
        var name = path.dirname(file.relative);
        if (name === ".") {
            return {
                fileName: "index.min.js",
                standalone: namespace
            };
        }

        function camelToKebab(camel) {
            return camel.replace(/([A-Z]+)/g, function(match) {
                return `-${match.toLowerCase()}`;
            });
        }

        return {
            fileName: `${camelToKebab(name)}.min${path.extname(file.relative)}`,
            standalone: `${namespace}.${name.charAt(0).toUpperCase()}${name.slice(1)}Api`
        };
    });
});

// Build CommonJS tests into browser tests
gulp.task("bundleTests", function() {
    return bundle(testFiles, testDir);
});

gulp.task("watch", ["setWatch", "default"], function() {
    gulp.watch(srcFiles, ["default"]);
});

gulp.task("default", ["bundleSource", "bundleTests"]);
