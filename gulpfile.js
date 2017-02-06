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

var name = "mbed Cloud SDK for JavaScript";
var bundleName = "mbedCloudSDK";

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

gulp.task("clean", function() {
    return del([nodeDir, typesDir, bundleDir]);
});

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
        toc: "DevicesApi,AccessApi,DevelopmentApi,LoggingApi,UpdateApi,ConnectionOptions"
    }))
    .on("error", handleError);
});

gulp.task("typescript", function() {
    var options = {
        target: "es5",
        lib: ["dom", "es5", "es2015.promise"],
        alwaysStrict: true,
        noEmitOnError: true,
        noUnusedLocals: true,
        declaration: true,
        noUnusedParameters: true
        //noImplicitAny: true
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

gulp.task("browserify", ["typescript"], function() {
    return gulp.src(nodeDir + "/**/index.js", {
        read: false
    })
    .pipe(tap(function(file) {
        var name = path.dirname(file.relative);
        if (name === ".") name = "index";
        name += ".min" + path.extname(file.relative)
        console.log("Creating", bundleDir + "/" + name);

        file.contents = browserify(file.path, {
            standalone: bundleName
        })
        .ignore("buffer")
        .bundle()
        .on("error", handleError);
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
    .pipe(gulp.dest(bundleDir));
});

gulp.task("default", ["clean", "doc", "browserify"]);

gulp.task("watch", ["default"], function() {
    watching = true;
    gulp.watch(srcDir + "/**/*.*", ["clean", "doc", "browserify"]);
});
