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

var name = "mbed Cloud SDK";
var bundleName = name.replace(/\s/g, "");

var srcDir = "src";
var docsDir = "docs";
var distDir = "dist";
var nodeDir = distDir + "/node";
var typesDir = distDir + "/types";
var bundleDir = distDir + "/bundles";

function handleError() {
    this.emit("end");
}

gulp.task("clean", function() {
    return del(distDir);
});

gulp.task("doc", function() {
    return gulp.src([srcDir + "/**/*.ts", "!" + srcDir + "/_api/**"])
    .pipe(typedoc({
        name: name,
        readme: "./README.md",
        module: "commonjs",
        target: "es6",
        mode: "file",
        out: docsDir,
        excludeExternals: true,
        excludePrivate: true,
        hideGenerator: true,
        //entryPoint: "mbedSDK"
        //theme: "minimal"//"node_modules/typedoc-markdown-theme/bin"
        //gaID
        //gaSite
    }))
    .on('error', handleError);
});

gulp.task("typescript", ["clean"], function() {
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
        .pipe(ts(options))
        .on('error', handleError).js
        .pipe(gulp.dest(nodeDir)),
        gulp.src([srcDir + "/**/*.ts", "!" + srcDir + "/_api/*"])
        .pipe(ts(options))
        .on('error', handleError).dts
        .pipe(gulp.dest(typesDir))
    ]);
});

gulp.task("browserify", ["typescript"], function() {
    return gulp.src(nodeDir + "/**/index.js", {
        read: false
    })
    .pipe(tap(function(file) {
        var name = path.dirname(file.relative);
        if (name === ".") name = "index";
        name += path.extname(file.relative)
        console.log("Creating", bundleDir + "/" + name);

        file.contents = browserify(file.path, {
            standalone: bundleName
        })
        .ignore("buffer")
        .bundle();
        file.path = path.join(file.base, name);
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
    .pipe(gulp.dest(bundleDir))
    .on('error', handleError);
});

gulp.task("watch", ["doc", "browserify"], function() {
    gulp.watch(srcDir + "/**", ["doc", "browserify"]);
});

gulp.task("default", ["doc", "browserify"]);
