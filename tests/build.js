var rimraf = require('rimraf');
var fs = require('fs');
var tsc = require('typescript')

function copyFile(source, target, cb) {

    var rd = fs.createReadStream(source);
    rd.on("error", function (err) {
        cb(err);
    });
    var wr = fs.createWriteStream(target);
    wr.on("error", function (err) {
        cb(err);
    });
    wr.on("close", function (ex) {});
    rd.pipe(wr);

    cb(`Copied '${source}' to '${target}'`)

}


// Build steps
rimraf("./tests/server/", function () {
    console.log("Cleaned build folder");
});
rimraf("./tests/common/", function () {
    console.log("Cleaned SDK methods");
    fs.mkdir("./tests/common/", function () {});
    copyFile("./src/common/interfaces.ts", "./tests/common/interfaces.ts", function (message) {
        console.log(message);
    })
    copyFile("./src/common/sdkError.ts", "./tests/common/sdkError.ts", function (message) {
        console.log(message);
    })
});
