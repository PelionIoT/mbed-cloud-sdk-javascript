import { TrustedCertificate, DeveloperCertificate } from "../../../src/sdk/entities";

describe("certificate examples", () => {
    it("should get developer info", async () => {
        const certificate = (await new TrustedCertificate().list().all()).filter(t => t.isDeveloperCertificate === true)[0];

        expect(certificate instanceof TrustedCertificate).toBeTruthy();

        const devInfo = await certificate.developerCertificateInfo();

        expect(devInfo instanceof DeveloperCertificate).toBeTruthy();
    });

    it("should get trusted cert info", async () => {
        const certificate = (await new TrustedCertificate().list().all()).filter(t => t.isDeveloperCertificate === true)[0];

        const devCertificate = new DeveloperCertificate();
        devCertificate.id = certificate.id;
        await devCertificate.get();

        const trustedCertInfo = await devCertificate.trustedCertificateInfo();
        expect(trustedCertInfo instanceof TrustedCertificate).toBeTruthy();
    })
});
