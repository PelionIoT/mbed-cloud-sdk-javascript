var path = require("path");
var gulp = require("gulp");
var tap = require("gulp-tap");
var buffer = require("gulp-buffer");
var uglify = require("gulp-uglify");
var jsdoc = require("gulp-jsdoc3");
var browserify = require("browserify");

var files = "dist/*.js";
var bundleDir = "dist/bundles";
var docsDir = "./docs";

gulp.task("doc", function (callback) {
    gulp.src(files, {
      read: false
    })
    .pipe(jsdoc({
        opts: {
            readme: "./README.md",
            package: "./package.json",
            destination: docsDir
        },
        plugins: [
            "plugins/markdown",
//            "plugins/summarize"
        ],
        templates: {
            theme: "slate",
            includeDate: false,
            systemName: "mbed Cloud SDK",
            copyright: "Copyright 2016 ARM Limited",
//            analytics: {"ua":"UA-XXXXX-XXX", "domain":"XXXX"}
        }
    }, callback));
});

gulp.task("browserify", function () {
    return gulp.src(files, {
        read: false
    })
    .pipe(tap(function(file) {
        var name = path.basename(file.path, ".js");
        name = name[0].toUpperCase() + name.slice(1);
        console.log("Creating", bundleDir + "/" + name);

        file.contents = browserify(file.path, {
            debug: true,
            standalone: name
        }).ignore("buffer").bundle();
    }))
    .pipe(buffer())
    .pipe(uglify({
        preserveComments: function(node, comment) {
            return comment.value.includes("@mbed");
        }
    }))
    .pipe(gulp.dest(bundleDir));
});

gulp.task("default", ["doc", "browserify"]);
