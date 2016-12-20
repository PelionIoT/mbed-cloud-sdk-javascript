var path        = require("path");
var browserify  = require("browserify");
var gulp        = require("gulp");
var buffer      = require("gulp-buffer");
var sourcemaps  = require('gulp-sourcemaps');
var tap         = require("gulp-tap");
var typedoc     = require("gulp-typedoc");
var ts          = require("gulp-typescript");
var uglify      = require("gulp-uglify");

var distDir = "dist";
var tsDir = distDir + "/typescript";
var nodeDir = distDir + "/node";
var bundleDir = distDir + "/bundles";
var docsDir = "docs";

gulp.task("doc", function() {
    return gulp.src(tsDir + "/*.ts")
        .pipe(typedoc({
            out: docsDir,
            module: "commonjs",
            target: "es6",
            name: "mbed Cloud SDK",
            readme: "./README.md",
            ignoreCompilerErrors: true,
            excludePrivate: true,
            hideGenerator: true
            //gaID
            //gaSite
        }))
    ;
});

gulp.task("typescript", function () {
    return gulp.src(tsDir + "/*.ts")
    .pipe(ts({
        target: "es5",
        lib: ["es5", "es2015.promise"],
        allowJs: true,
        alwaysStrict: true,
        noEmitOnError: true,
        noUnusedLocals: true
        //noUnusedParameters: true
        //noImplicitAny: true,
        //declaration: true
    }))
    .pipe(gulp.dest(nodeDir));
});

gulp.task("browserify", ["typescript"], function () {
    return gulp.src(nodeDir + "/*.js", {
        read: false
    })
    .pipe(tap(function(file) {
        var name = path.basename(file.path, ".js");
        name = name[0].toUpperCase() + name.slice(1);
        console.log("Creating", bundleDir + "/" + name);

        file.contents = browserify(file.path, {
            debug: true,
            standalone: name
        }).ignore("buffer")
        .bundle();
    }))
    .pipe(buffer())
    .pipe(sourcemaps.init({
        loadMaps: true
    }))
    .pipe(uglify({
        preserveComments: function(node, comment) {
            return comment.value.includes("Copyright");
        }
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(bundleDir));
});

gulp.task("default", ["doc", "browserify"]);
