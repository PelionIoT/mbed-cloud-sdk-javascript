import { TrustedCertificate, DeviceEnrollmentBulkCreate, DeviceEnrollmentBulkDelete } from "../entities";
import { ReadStream, createWriteStream, createReadStream } from "fs";
import { isThisNode } from "../../common/functions";
import { get as http_get } from "superagent";
import { SDKError } from "../../common/sdkError";
import { fstat } from "fs-extra";

export function isDeveloperCertificateGetter(self: TrustedCertificate) {
    return self.deviceExecutionMode ? !!self.deviceExecutionMode : false;
}

export function isDeveloperCertificateSetter(self: TrustedCertificate, value: boolean): void {
    self.deviceExecutionMode = value ? 1 : 0;
    self.isDeveloperCertificate = value;
}

export function getErrorsReportFile(self: DeviceEnrollmentBulkCreate | DeviceEnrollmentBulkDelete): Promise<ReadStream | Buffer | File | Blob> {
    return new Promise<ReadStream>(() => {
        return streamToFile(self.errorsReportFile);
    });
}

export function getFullReportFile(_self: DeviceEnrollmentBulkCreate | DeviceEnrollmentBulkDelete): Promise<ReadStream | Buffer | File | Blob> {
    return null;
}

function streamToFile(url: string, filePath?: string) {
    if (isThisNode()) {
        const tempPath = filePath || "/temp/reports/report.csv";
        // we're in node and want to stream a file
        const fileStream = createWriteStream(tempPath, { flags: "a+" });
        const req = http_get(url);
        req.set("auth", "Bearer soomeshit");

        req.pipe(fileStream).on("finish", _ => {
            fileStream.close();
            const file = createReadStream(tempPath);
            return file;
        });
        req.on("error", error => {
            throw error;
        });
    } else {
        return;
    }
}
