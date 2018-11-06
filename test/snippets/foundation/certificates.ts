import { TrustedCertificate, DeveloperCertificate } from "../../../src/sdk/entities";

describe("certificate examples", () => {
    it("should list trusted certificates", async () => {
        const certificate = (await new TrustedCertificate().list().all()).filter(t => t.isDeveloperCertificate === true)[0];

        expect(certificate instanceof TrustedCertificate).toBeTruthy();

        const devInfo = await certificate.developerCertificateInfo();

        expect(devInfo instanceof DeveloperCertificate).toBeTruthy();
    });
});
