"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var functions_1 = require("../legacy/common/functions");
var superagent_1 = require("superagent");
var path = require("path");
/**
 * Internal function
 * @ignore
 */
function isDeveloperCertificateGetter(self) {
    // tslint:disable-next-line:no-string-literal
    self["isDeveloperCertificate"] = self.deviceExecutionMode === 1;
}
exports.isDeveloperCertificateGetter = isDeveloperCertificateGetter;
function preSharedKeyIdSetter(self) {
    self.id = self.endpointName;
}
exports.preSharedKeyIdSetter = preSharedKeyIdSetter;
/**
 * Internal function
 * @ignore
 */
function downloadErrorsReportFile(self, model) {
    return new Promise(function (resolve, reject) {
        return streamToFile(self.config, model.errorsReportFile, resolve, reject, path.resolve(__dirname, "..", "..", "error-report.csv"));
    });
}
exports.downloadErrorsReportFile = downloadErrorsReportFile;
/**
 * Internal function
 * @ignore
 */
function downloadFullReportFile(self, model) {
    return new Promise(function (resolve, reject) {
        return streamToFile(self.config, model.fullReportFile, resolve, reject);
    });
}
exports.downloadFullReportFile = downloadFullReportFile;
function deviceFilterHelperSetter(self) {
    if (!self.deviceFilter && self.deviceFilterHelper) {
        self.deviceFilter = functions_1.encodeFilter(self.deviceFilterHelper);
    }
    self.deviceFilterHelper = self.deviceFilterHelper || null;
}
exports.deviceFilterHelperSetter = deviceFilterHelperSetter;
/**
 * Internal function
 * @ignore
 */
function streamToFile(config, url, resolve, reject, filePath) {
    if (!functions_1.isThisNode()) {
        return reject("Can only download file in Node environment!");
    }
    var tempPath = filePath || path.resolve(__dirname, "..", "..", "report.csv");
    if (url && config) {
        var fileStream_1 = fs_1.createWriteStream(tempPath);
        fileStream_1.on("open", function () {
            var req = superagent_1.get(url);
            req.set("Authorization", "" + config.apiKey);
            req.pipe(fileStream_1).on("finish", function (_) {
                fileStream_1.close();
            });
            req.on("error", function (error) {
                reject(error);
            });
        });
        fileStream_1.on("close", function () {
            var file = fs_1.createReadStream(tempPath);
            return resolve(file);
        });
        fileStream_1.on("error", function () {
            return reject("No file found.");
        });
    }
    else {
        return reject("No url provided!");
    }
}
//# sourceMappingURL=privateFunctions.js.map