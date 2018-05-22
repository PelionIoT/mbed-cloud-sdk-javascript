var nlf = require('nlf');
var fs = require('fs');
var path = require('path');
var csvWriter = require('csv-write-stream');

// Where to write the file. Can optionally be set by parsing full
// path as first argument.
var outputDir = path.resolve(__dirname, "../");
var outputFile = path.join(outputDir, "tpip.csv");
var projectDirectory = path.resolve(__dirname, "../");
if (process.argv.length >= 3) {
    projectDirectory = process.argv[2];
}
if (process.argv.length >= 4) {
    outputFile = process.argv[3];
}

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}



nlf.find({
    directory: projectDirectory,
    production: true,
    summaryMode: 'detail',
    depth: 1,
}, function (err, packages) {
    // Get all licenses
    packages = packages.map(function (pkg) {
        return Object.assign({}, pkg, {
            licenses: getAllLicenses(pkg),
            licenseUrl: getAllLicenseUrls(pkg)
        });
    }).map(function (pkg) {
        return {
            PkgName: pkg.name,
            PkgType: "npm",
            PkgOriginator: "",
            PkgVersion: pkg.version,
            PkgSummary: null,
            PkgHomePageURL: pkg.repository,
            PkgLicense: pkg.licenses.join(","),
            PkgLicenseURL: pkg.licenseUrl.join(","),
            PkgMgrURL: "https://www.npmjs.com/package/" + pkg.name,
        };
    });

    // // Write results to file
    writeCsvFile(packages);
    /*eslint no-console: ["error", { allow: ["log"] }] */
    console.log("Done, wrote results (" + packages.length + " packages) to '" + outputFile + "'");
});

var writeCsvFile = function (packages) {
    var writer = csvWriter({ headers: Object.keys(packages[0]) });
    writer.pipe(fs.createWriteStream(outputFile));
    for (var i = 0; i < packages.length; i++) {
        writer.write(packages[i]);
    }
    writer.end();
};

var getFieldInSource = function (pkg, source, field) {
    var fields = [];
    var sources = pkg.licenseSources[source].sources;
    for (var i = 0; i < sources.length; i++) {
        var fieldValue = sources[i][field];
        if (!fieldValue || fieldValue === '(none)') { continue; }
        var txt = fieldValue + (source !== "package" ? " (" + source + ")" : "");
        fields.push(txt);
    }
    return fields;
};

var getAllLicenses = function (pkg) {
    return [].concat.apply([], [
        getFieldInSource(pkg, "package", "license"),
        getFieldInSource(pkg, "license", "license"),
        getFieldInSource(pkg, "readme", "license")
    ]);
};

var getAllLicenseUrls = function (pkg) {
    return [].concat.apply([], [
        getFieldInSource(pkg, "package", "url"),
        getFieldInSource(pkg, "license", "url"),
        getFieldInSource(pkg, "readme", "url")
    ]);
};