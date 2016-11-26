/*var gulp = require('gulp');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');

gulp.task('browserify', function () {

  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });

  return gulp.src(['./dist/*.js']) // hello `gulp.src()` my old friend
    .pipe(browserified)
    .pipe(uglify())
    .pipe(gulp.dest('./test'));
});

gulp.task("default", ["browserify"]);
*/


var gulp = require('gulp');
var browserify = require('browserify');
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');
var uglify = require('gulp-uglify');
var path = require('path');
var jsdoc = require('gulp-jsdoc3');

gulp.task('browserify', function () {
    return gulp.src(['dist/*.js', '!dist/*.bundle.js'], {
        read: false
    })
    .pipe(tap(function(file) {
        var name = path.basename(file.path, ".js");
        name = name[0].toUpperCase() + name.slice(1);
        console.log("Creating", name);
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
    .pipe(gulp.dest('dist/bundles'));
});

gulp.task('doc', function (cb) {
    gulp.src(['README.md', 'dist/*.js', '!dist/*.bundle.js'], {read: false})
        .pipe(jsdoc({

  "tags": {
    "allowUnknownTags": true
  },
  "opts": {
    "destination": "./docs"
  },
  "plugins": [
    "plugins/markdown"
  ],
  "templates": {
    "cleverLinks": false,
    "monospaceLinks": false,
    "default": {
      "outputSourceFiles": true
    },
    "path": "ink-docstrap",
    "theme": "slate",
    "navType": "vertical",
    "linenums": true,
    "dateFormat": "MMMM Do YYYY, h:mm:ss a"
  }

        }, cb));
});

gulp.task("default", ["doc", "browserify"]);

/*var gulp       = require('gulp'),
    browserify = require('browserify'),
    source     = require('vinyl-source-stream');

gulp.task('browserify', function() {
    return browserify({ entries: ['dist/devices.js'] })
        .bundle()
        .pipe(source('devices.bundled.js'))
        .pipe(gulp.dest('test'));
});

/*var gulp = require('gulp');
var browserify = require('browserify');
var gutil = require('gulp-util');
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('js', function () {

  return gulp.src('dist/*.js', {read: false}) // no need of reading file because browserify does.

    // transform file objects using gulp-tap plugin
    .pipe(tap(function (file) {

      gutil.log('bundling ' + file.path);

      // replace file contents with browserify's bundle stream
      file.contents = browserify(file.path, {debug: true}).bundle();

    }))

    // transform streaming contents into buffer contents (because gulp-sourcemaps does not support streaming contents)
    .pipe(buffer())


    .pipe(gulp.dest('test'));

});

/*var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
 
gulp.task('browserify', function() {
    return browserify('./dist/devices.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('test_bundle.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./dist/'));
});

gulp.task("default", ["browserify"]);



gulp.task('js', function () {

  return gulp.src('dist/*.js', {read: false})

    // transform file objects using gulp-tap plugin
    .pipe(tap(function (file) {

      gutil.log('bundling ' + file.path);

      // replace file contents with browserify's bundle stream
      file.contents = browserify(file.path, {debug: true}).bundle();

    }))

    // transform streaming contents into buffer contents (because gulp-sourcemaps does not support streaming contents)
    .pipe(buffer())

    // load and init sourcemaps
    .pipe(sourcemaps.init({loadMaps: true}))

    .pipe(uglify())

    // write sourcemaps
    .pipe(sourcemaps.write('./'))

    .pipe(gulp.dest('dest'));
});
*/