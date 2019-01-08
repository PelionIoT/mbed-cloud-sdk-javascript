import { CertificateIssuerConfig, CertificateEnrollment, CertificateIssuerConfigRepository, DeviceRepository, CertificateEnrollmentRepository } from "../../../src/sdk/entities";
import { instanceOf } from "../../functions";

describe("cert renew snippets", async () => {

    it("should renew device certificate", async () => {
        try {
            // an example: certificate renew
            const certificateIssuerConfigContext = new CertificateIssuerConfigRepository();
            const myConfig = (await certificateIssuerConfigContext.list().all()).find(c => c.certificateReference === "LWM2M");
            // cloak
            expect(instanceOf<CertificateIssuerConfig>(myConfig, "CERTIFICATE_ISSUER_CONFIG")).toBeTruthy();
            // uncloak

            const deviceContext = new DeviceRepository();
            const connectedDevices = (await deviceContext.list().all()).filter(device => device.state === "registered");
            // cloak
            expect(connectedDevices.length).toBeGreaterThanOrEqual(1);
            // uncloak

            for (const device of connectedDevices) {
                await deviceContext.renewCertificate(myConfig.certificateReference, device.id);
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
            const certificateEnrollmentContext = new CertificateEnrollmentRepository();
            const enrollment = await certificateEnrollmentContext.list().first();

            expect(instanceOf<CertificateEnrollment>(enrollment, "CERTIFICATE_ENROLLMENT")).toBeTruthy();
        } catch (e) {
            throw e;
        }
    });

});
