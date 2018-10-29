import { TrustedCertificate, DeveloperCertificate } from "../../src/sdk/entities";

describe("certificates", () => {

    test("certificate crud", async () => {

        const certificate = new TrustedCertificate();

        const allCerts = await certificate.list().all();

        // find a developer certificate
        const devCert = allCerts.find(c => c.isDeveloperCertificate);

        const isDev = devCert.isDeveloperCertificate === true;
        expect(isDev).toBeTruthy();

        // get the developer cert info and check its not null
        const devInfo = await devCert.developerCertificateInfo();
        expect(devInfo.certificate).not.toBeNull();

        // create a new dev cert object
        const devCertObject = new DeveloperCertificate();
        devCertObject.id = devCert.id;
        await devCertObject.get();
        expect(devCertObject.certificate).not.toBeNull();

        // dev certificate should have some trusted info
        const devCertTrustedInfo = await devCertObject.trustedCertificateInfo();
        expect(devCertTrustedInfo).not.toBeNull();

        // find a trusted cert
        const trustedCert = allCerts.find(c => c.isDeveloperCertificate === false);

        // developer should be false
        const isTrust = trustedCert.isDeveloperCertificate === false;
        expect(isTrust).toBeTruthy();

        // shouldn't have any dev info
        const emptyDevInfo = await trustedCert.developerCertificateInfo();
        expect(emptyDevInfo).toBeNull();
    });
});
