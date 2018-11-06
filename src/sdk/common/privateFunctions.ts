import { TrustedCertificate } from "../entities";

export function isDeveloperCertificateGetter(self: TrustedCertificate) {
    return self.deviceExecutionMode ? !!self.deviceExecutionMode : false;
}

export function isDeveloperCertificateSetter(self: TrustedCertificate, value: boolean): void {
    self.deviceExecutionMode = value ? 1 : 0;
    self.isDeveloperCertificate = value;
}
