import { TrustedCertificate, DeveloperCertificate, TrustedCertificateRepository, DeveloperCertificateRepository } from "../../../src/sdk/entities";
import { instanceOf } from "../../functions";

describe("certificate examples", () => {
    it("should get developer info", async () => {
        const trustedCertificateContext = new TrustedCertificateRepository();
        const certificate = (await trustedCertificateContext.list().all()).filter(t => t.isDeveloperCertificate === true)[0];

        expect(instanceOf<TrustedCertificate>(certificate, "TRUSTED_CERTIFICATE")).toBeTruthy();

        const devInfo = await trustedCertificateContext.getDeveloperCertificateInfo(certificate.id);

        expect(instanceOf<DeveloperCertificate>(devInfo, "DEVELOPER_CERTIFICATE")).toBeTruthy();
    });

    it("should get trusted cert info", async () => {
        const trustedCertificateContext = new TrustedCertificateRepository();
        const certificate = (await trustedCertificateContext.list().all()).filter(t => t.isDeveloperCertificate === true)[0];

        const developerCertificateContext = new DeveloperCertificateRepository();
        const devCertificate = await developerCertificateContext.get(certificate.id);

        const trustedCertInfo = await developerCertificateContext.getTrustedCertificateInfo(devCertificate.id);
        expect(instanceOf<TrustedCertificate>(trustedCertInfo, "TRUSTED_CERTIFICATE")).toBeTruthy();
    });
});
