import { createReadStream, createWriteStream, PathLike, ReadStream } from "fs";
import * as path from "path";
import { get as http_get } from "superagent";
import {
    DeviceEnrollmentBulkCreate,
    DeviceEnrollmentBulkCreateRepository,
    DeviceEnrollmentBulkDelete,
    DeviceEnrollmentBulkDeleteRepository,
    UpdateCampaign,
} from "../foundation";
import { encodeFilter, isThisNode } from "../legacy/common/functions";
import { Config } from "./config";

/**
 * Internal function
 * @ignore
 */
export function isDeveloperCertificateGetter(self: any): void {
    // tslint:disable-next-line:no-string-literal
    self["isDeveloperCertificate"] = self.deviceExecutionMode === 1;
}

export function preSharedKeyIdSetter(self: any): void {
    self.id = self.endpointName;
}

/**
 * Internal function
 * @ignore
 */
export function downloadErrorsReportFile(
    self: DeviceEnrollmentBulkCreateRepository | DeviceEnrollmentBulkDeleteRepository,
    model: DeviceEnrollmentBulkCreate | DeviceEnrollmentBulkDelete
): Promise<ReadStream | Buffer | File | Blob> {
    return new Promise<ReadStream>((resolve, reject) => {
        return streamToFile(
            self.config,
            model.errorsReportFile,
            resolve,
            reject,
            path.resolve(__dirname, "..", "..", "error-report.csv")
        );
    });
}

/**
 * Internal function
 * @ignore
 */
export function downloadFullReportFile(
    self: DeviceEnrollmentBulkCreateRepository | DeviceEnrollmentBulkDeleteRepository,
    model: DeviceEnrollmentBulkCreate | DeviceEnrollmentBulkDelete
): Promise<ReadStream | Buffer | File | Blob> {
    return new Promise<ReadStream>((resolve, reject) => {
        return streamToFile(self.config, model.fullReportFile, resolve, reject);
    });
}

export function deviceFilterHelperSetter(self: UpdateCampaign): void {
    if (!self.deviceFilter && self.deviceFilterHelper) {
        self.deviceFilter = encodeFilter(self.deviceFilterHelper);
    }

    self.deviceFilterHelper = self.deviceFilterHelper || null;
}

/**
 * Internal function
 * @ignore
 */
function streamToFile(
    config: Config,
    url: string,
    resolve: (value: ReadStream) => void,
    reject: (reason: any) => void,
    filePath?: string | PathLike
) {
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
    } else {
        return reject("No url provided!");
    }
}
