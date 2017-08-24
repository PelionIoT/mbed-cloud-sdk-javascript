var path        = require("path");
var browserify  = require("browserify");
var del         = require("del");
var merge       = require('merge2');
var gulp        = require("gulp");
var buffer      = require("gulp-buffer");
var sourcemaps  = require('gulp-sourcemaps');
var tap         = require("gulp-tap");
var typedoc     = require("gulp-typedoc");
var ts          = require("gulp-typescript");
var uglify      = require("gulp-uglify");

var name = "Mbed Cloud SDK for JavaScript";
var namespace = "MbedCloudSDK";
var docsToc = "AccountManagementApi,CertificatesApi,ConnectApi,DeviceDirectoryApi,UpdateApi,ConnectionOptions";

var srcDir = "src";
var docsDir = "docs";
var nodeDir = "lib";
var typesDir = "types";
var bundleDir = "bundles";
var watching = false;

function handleError() {
    if (watching) this.emit("end");
    else process.exit(1);
}

// Clear built directories
gulp.task("clean", function() {
    return del([nodeDir, typesDir, bundleDir]);
});

// Create documentation
gulp.task("doc", function() {
    return gulp.src([srcDir + "/**/*.ts", "!" + srcDir + "/_api/**"])
    .pipe(typedoc({
        name: name,
        readme: "src/documentation.md",
        theme: "src/theme",
        module: "commonjs",
        target: "es6",
        mode: "file",
        out: docsDir,
        excludeExternals: true,
        excludePrivate: true,
        hideGenerator: true,
        toc: docsToc
    }))
    .on("error", handleError);
});

// Build TypeScript source into CommonJS Node modules
gulp.task("typescript", function() {
    var options = {
        target: "es5",
        lib: ["dom", "es5", "es2015.promise"],
        alwaysStrict: true,
        noEmitOnError: true,
        noUnusedLocals: true,
        declaration: true,
        noUnusedParameters: true
    };

    return merge([
        gulp.src(srcDir + "/**/*.ts")
        .pipe(ts(options))
        .on("error", handleError).js
        .pipe(gulp.dest(nodeDir)),
        gulp.src([srcDir + "/**/*.ts", "!" + srcDir + "/_api/*"])
        .pipe(ts(options))
        .on("error", handleError).dts
        .pipe(gulp.dest(typesDir))
    ]);
});

function getBundleName(file) {
    var name = path.dirname(file.relative);
    if (name === ".") return namespace;
    return `${namespace}.${name.charAt(0).toUpperCase()}${name.slice(1)}Api`;
}

function getBundleFile(file) {
    var name = path.dirname(file.relative);
    if (name === ".") name = "index";

    name = name.replace(/([A-Z]+)/g, function(match) {
        return `-${match.toLowerCase()}`;
    });

    return `${name}.min${path.extname(file.relative)}`;
}

// Build CommonJS modules into browser bundles
gulp.task("browserify", ["typescript"], function() {
    return gulp.src(nodeDir + "/**/index.js", {
        read: false
    })
    .pipe(tap(function(file) {
        var bundleName = getBundleName(file);
        var bundleFile = getBundleFile(file);

        console.log(`Creating ${bundleName} in ${bundleDir}/${bundleFile}`);
        file.contents = browserify(file.path, {
            standalone: bundleName
        })
        .ignore("buffer")
        .bundle()
        .on("error", handleError);
        file.path = path.join(file.base, bundleFile);
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
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(bundleDir));
});

gulp.task("watch", ["default"], function() {
    watching = true;
    gulp.watch(srcDir + "/**/*.*", ["default"]);
});

gulp.task("default", ["clean", "doc", "browserify"]);
