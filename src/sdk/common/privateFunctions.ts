import { ReadStream, createWriteStream, createReadStream } from "fs";
import { isThisNode } from "../../common/functions";
import { get as http_get } from "superagent";
import { Config } from "../client/config";
import { DeviceEnrollmentBulkCreate, DeviceEnrollmentBulkDelete, DeviceEnrollmentBulkCreateRepository, DeviceEnrollmentBulkDeleteRepository } from "../generatedV2";

// export function isDeveloperCertificateGetter(self: TrustedCertificate | SubtenantTrustedCertificate) {
//     return self.deviceExecutionMode ? !!self.deviceExecutionMode : false;
// }

// export function isDeveloperCertificateSetter(self: TrustedCertificate | SubtenantTrustedCertificate, value: boolean): void {
//     self.deviceExecutionMode = value ? 1 : 0;
//     self.isDeveloperCertificate = value;
// }

export function downloadErrorsReportFile(self: DeviceEnrollmentBulkCreateRepository | DeviceEnrollmentBulkDeleteRepository, model: DeviceEnrollmentBulkCreate | DeviceEnrollmentBulkDelete): Promise<ReadStream | Buffer | File | Blob> {
    return new Promise<ReadStream>((resolve, reject) => {
        return streamToFile(self.getConfig(), model.errorsReportFile, resolve, reject, "error-report.csv");
    });
}

export function downloadFullReportFile(self: DeviceEnrollmentBulkCreateRepository | DeviceEnrollmentBulkDeleteRepository, model: DeviceEnrollmentBulkCreate | DeviceEnrollmentBulkDelete): Promise<ReadStream | Buffer | File | Blob> {
    return new Promise<ReadStream>((resolve, reject) => {
        return streamToFile(self.getConfig(), model.fullReportFile, resolve, reject);
    });
}

function streamToFile(config: Config, url: string, resolve: (value: ReadStream) => void, reject: (reason: any) => void, filePath?: string) {
    if (!isThisNode()) {
        return reject("Can only download file in Node environment!");
    }

    const tempPath = filePath || "report.csv";
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
    } else {
        const file = createReadStream(tempPath);
        return resolve(file);
    }
}
