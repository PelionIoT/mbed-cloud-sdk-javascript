import { CertificateIssuerConfig, Device, CertificateEnrollment } from "../../../src/sdk/entities";

describe("cert renew snippets", async () => {

    it("should renew device certificate", async () => {
        try {
            // an example: certificate renew
            const myConfig = (await new CertificateIssuerConfig().list().all()).find(c => c.certificateReference === "LWM2M");
            // cloak
            expect(myConfig).toBeInstanceOf(CertificateIssuerConfig);
            // uncloak

            const connectedDevices = (await new Device().list().all()).filter(device => device.state === "registered");
            // cloak
            expect(connectedDevices.length).toBeGreaterThanOrEqual(1);
            // uncloak

            for (const device of connectedDevices) {
                await device.renewCertificate(myConfig.certificateReference);
            }
            // end of example

            return connectedDevices;
        } catch (e) {
            // should throw 400, device cert cannot be renewed
            if (e.details && e.details.code === 400 || e.details.code === 423) {
                return;
            }

            throw e;
        }

    });

    it("should list enrollments", async () => {
        try {
            const enrollment = await new CertificateEnrollment().list().first();

            expect(enrollment).toBeInstanceOf(CertificateEnrollment);
        } catch (e) {
            throw e;
        }
    });

});
