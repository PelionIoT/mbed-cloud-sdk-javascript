import { TrustedCertificate, DeviceEnrollmentBulkCreate, DeviceEnrollmentBulkDelete } from "../entities";
import { ReadStream, createWriteStream, createReadStream } from "fs";
import { isThisNode } from "../../common/functions";
import { get as http_get } from "superagent";
import { Config } from "../client/config";

export function isDeveloperCertificateGetter(self: TrustedCertificate) {
    return self.deviceExecutionMode ? !!self.deviceExecutionMode : false;
}

export function isDeveloperCertificateSetter(self: TrustedCertificate, value: boolean): void {
    self.deviceExecutionMode = value ? 1 : 0;
    self.isDeveloperCertificate = value;
}

export function downloadErrorsReportFile(self: DeviceEnrollmentBulkCreate | DeviceEnrollmentBulkDelete): Promise<ReadStream | Buffer | File | Blob> {
    return new Promise<ReadStream>((resolve, reject) => {
        return streamToFile(self.config, self.errorsReportFile, resolve, reject);
    });
}

export function downloadFullReportFile(self: DeviceEnrollmentBulkCreate | DeviceEnrollmentBulkDelete): Promise<ReadStream | Buffer | File | Blob> {
    return new Promise<ReadStream>((resolve, reject) => {
        return streamToFile(self.config, self.fullReportFile, resolve, reject);
    });
}

function streamToFile(config: Config, url: string, resolve: (value: ReadStream) => void, reject: (reason: any) => void,  filePath?: string) {
    if (isThisNode()) {
        const tempPath = filePath || "report.csv";
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
        return reject("Can only download file in Node environment!");
    }
}
