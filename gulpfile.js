const path        = require("path");
const browserify  = require("browserify");
const del         = require("del");
const merge       = require("merge2");
const tslint      = require("tslint");
const gulp        = require("gulp");
const buffer      = require("gulp-buffer");
const sourcemaps  = require("gulp-sourcemaps");
const tap         = require("gulp-tap");
const typedoc     = require("gulp-typedoc");
const ts          = require("gulp-typescript");
const uglify      = require("gulp-uglify");
const gulpTslint  = require("gulp-tslint");

const name = "Mbed Cloud SDK for JavaScript";
const namespace = "MbedCloudSDK";
const docsToc = "AccountManagementApi,CertificatesApi,ConnectApi,DeviceDirectoryApi,UpdateApi,ConnectionOptions,EnrollmentApi";

// Source
const srcDir = "src";
const srcFiles = srcDir + "/**/*.ts";
const srcFilesOnly = [
    srcFiles,
    "!" + srcDir + "/_api/**",
    "!" + srcDir + "/_tests/**"
];

// Node
const nodeDir = "lib";
const bundleFiles = nodeDir + "/**/index.js";
const testFiles = nodeDir + "/_tests/**/*.js";

// Browser bundles
const bundleDir = "bundles";
const testDir = bundleDir + "/_tests";

// Other
const docsDir = "docs";
const typesDir = "types";

let watching = false;

// Error handler suppresses exists during watch
function handleError() {
    if (watching) this.emit("end");
    else process.exit(1);
}

// Set watching
gulp.task("setWatch", function() {
    watching = true;
});

// Clear built directories
gulp.task("clean", function() {
    return del([nodeDir, typesDir, bundleDir]);
});

// Lint the source
gulp.task("lint", function() {
    const program = tslint.Linter.createProgram("./");

    gulp.src(srcFiles)
    .pipe(gulpTslint({
        program: program,
        formatter: "stylish"
    }))
    .pipe(gulpTslint.report({
        emitError: !watching
    }))
});

// Create documentation
gulp.task("doc", function() {
    return gulp.src(srcFilesOnly)
    .pipe(typedoc({
        name: name,
        readme: srcDir + "/documentation.md",
        theme: srcDir + "/theme",
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
gulp.task("typescript", ["clean"], function() {
    const options = {
        target: "es5",
        types: ["intern"],
        lib: [
            "dom",
            "es5",
            "es2015.promise",
            "es2015.symbol.wellknown"
        ],
        alwaysStrict: true,
        noEmitOnError: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        declaration: true
    };

    return merge([
        gulp.src(srcFiles)
            .pipe(sourcemaps.init())
            .pipe(ts(options))
            .on("error", handleError).js
            .pipe(sourcemaps.write(".", {
                sourceRoot: path.relative(nodeDir, srcDir)
            }))
            .pipe(gulp.dest(nodeDir)),
        gulp.src(srcFilesOnly)
            .pipe(ts(options))
            .on("error", handleError).dts
            .pipe(gulp.dest(typesDir))
    ]);
});

// Browserify helper function
function bundle(srcFiles, destDir, optionsFn) {
    return gulp.src(srcFiles, {
        read: false
    })
    .pipe(tap(function(file) {
        let options = {};
        if (optionsFn) options = optionsFn(file);
        const fileName = options.fileName || path.basename(file.path);

        if (options.standalone)
            console.log(`Creating ${options.standalone} in ${destDir}/${fileName}`);
        else
            console.log(`Creating ${destDir}/${fileName}`);

        file.contents = browserify(file.path, options)
        .ignore("buffer")
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
gulp.task("bundleSource", ["typescript"], function() {
    return bundle(bundleFiles, bundleDir, function(file) {
        const name = path.dirname(file.relative);
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
gulp.task("bundleTests", ["typescript"], function() {
    return bundle(testFiles, testDir);
});

gulp.task("watch", ["setWatch", "default"], function() {
    gulp.watch(srcFiles, ["default"]);
});

gulp.task("default", ["lint", "doc", "bundleSource", "bundleTests"]);
