import { TrustedCertificate, DeveloperCertificate, TrustedCertificateRepository, DeveloperCertificateRepository } from "../../../src/sdk/entities";
import { Config } from "../../../src/sdk";
import { instanceOf } from "../../functions";

describe("certificate examples", () => {
    it("should get developer info", async () => {
        const trustedCertificateContext = new TrustedCertificateRepository(new Config());
        const certificate = (await trustedCertificateContext.list().all()).filter(t => t.isDeveloperCertificate === true)[0];

        expect(instanceOf<TrustedCertificate>(certificate, "TRUSTED_CERTIFICATE")).toBeTruthy();

        const devInfo = await trustedCertificateContext.developerCertificateInfo(certificate.id);

        expect(instanceOf<DeveloperCertificate>(devInfo, "DEVELOPER_CERTIFICATE")).toBeTruthy();
    });

    it("should get trusted cert info", async () => {
        const trustedCertificateContext = new TrustedCertificateRepository(new Config());
        const certificate = (await trustedCertificateContext.list().all()).filter(t => t.isDeveloperCertificate === true)[0];

        const developerCertificateContext = new DeveloperCertificateRepository(new Config());
        const devCertificate = await developerCertificateContext.get(certificate.id);

        const trustedCertInfo = await developerCertificateContext.trustedCertificateInfo(devCertificate.id);
        expect(instanceOf<TrustedCertificate>(trustedCertInfo, "TRUSTED_CERTIFICATE")).toBeTruthy();
    });
});
