import { createWriteStream, createReadStream } from "fs";
import { isThisNode, encodeFilter } from "../legacy/common/functions";
import { get as http_get } from "superagent";
import * as path from "path";
/**
 * Internal function
 * @ignore
 */
export function isDeveloperCertificateGetter(self) {
    // tslint:disable-next-line:no-string-literal
    self["isDeveloperCertificate"] = self.deviceExecutionMode === 1;
}
export function preSharedKeyIdSetter(self) {
    self.id = self.endpointName;
}
/**
 * Internal function
 * @ignore
 */
export function downloadErrorsReportFile(self, model) {
    return new Promise((resolve, reject) => {
        return streamToFile(self.config, model.errorsReportFile, resolve, reject, path.resolve(__dirname, "..", "..", "error-report.csv"));
    });
}
/**
 * Internal function
 * @ignore
 */
export function downloadFullReportFile(self, model) {
    return new Promise((resolve, reject) => {
        return streamToFile(self.config, model.fullReportFile, resolve, reject);
    });
}
export function deviceFilterHelperSetter(self) {
    if (!self.deviceFilter && self.deviceFilterHelper) {
        self.deviceFilter = encodeFilter(self.deviceFilterHelper);
    }
    self.deviceFilterHelper = self.deviceFilterHelper || null;
}
/**
 * Internal function
 * @ignore
 */
function streamToFile(config, url, resolve, reject, filePath) {
    if (!isThisNode()) {
        return reject("Can only download file in Node environment!");
    }
    const tempPath = filePath || path.resolve(__dirname, "..", "..", "report.csv");
    if (url && config) {
        const fileStream = createWriteStream(tempPath);
        fileStream.on("open", () => {
            const req = http_get(url);
            req.set("Authorization", `${config.apiKey}`);
            req.pipe(fileStream).on("finish", _ => {
                fileStream.close();
            });
            req.on("error", error => {
                reject(error);
            });
        });
        fileStream.on("close", () => {
            const file = createReadStream(tempPath);
            return resolve(file);
        });
        fileStream.on("error", () => {
            return reject("No file found.");
        });
    }
    else {
        return reject("No url provided!");
    }
}
//# sourceMappingURL=privateFunctions.js.map