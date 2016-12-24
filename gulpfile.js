var path        = require("path");
var browserify  = require("browserify");
var merge       = require('merge2');
var gulp        = require("gulp");
var buffer      = require("gulp-buffer");
var sourcemaps  = require('gulp-sourcemaps');
var tap         = require("gulp-tap");
var typedoc     = require("gulp-typedoc");
var ts          = require("gulp-typescript");
var uglify      = require("gulp-uglify");

var srcDir = "src";
var docsDir = "docs";
var distDir = "dist";
var nodeDir = distDir + "/node";
var typesDir = distDir + "/types";
var bundleDir = distDir + "/bundles";

gulp.task("doc", function() {
    return gulp.src([srcDir + "/*.ts", "!" + srcDir + "/main.ts"])
        .pipe(typedoc({
            name: "mbed Cloud JavaScript SDK",
            readme: "./README.md",
            module: "commonjs",
            target: "es6",
            out: docsDir,
            excludeExternals: true,
            excludePrivate: true,
            hideGenerator: true
            //gaID
            //gaSite
        }))
    ;
});

gulp.task("typescript", function () {
    var options = {
        target: "es5",
        lib: ["dom", "es5", "es2015.promise"],
        alwaysStrict: true,
        noEmitOnError: true,
        noUnusedLocals: true,
        declaration: true
        //noImplicitAny: true,
        //noUnusedParameters: true
    };

    return merge([
        gulp.src(srcDir + "/**/*.ts")
        .pipe(ts(options)).js
        .pipe(gulp.dest(nodeDir)),
        gulp.src(srcDir + "/*.ts")
        .pipe(ts(options)).dts
        .pipe(gulp.dest(typesDir))
    ]);
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
            return comment.value.includes("Copyright ARM");
        }
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(bundleDir));
});

gulp.task("default", ["doc", "browserify"]);
