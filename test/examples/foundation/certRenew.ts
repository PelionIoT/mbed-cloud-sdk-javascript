/* tslint:disable: no-console */
import {
    CertificateIssuerConfig,
    CertificateEnrollment,
    CertificateIssuerConfigRepository,
    DeviceRepository,
    CertificateEnrollmentRepository,
} from "../../../src";
import { instanceOf } from "../../functions";

describe("examples of certificate renew", () => {
    test("certificate renew", () => {
        try {
            // an example: certificate renew
            (async () => {
                const certificateIssuerConfigContext = new CertificateIssuerConfigRepository();
                const myConfig = (await certificateIssuerConfigContext.list().all()).find(c => c.reference === "LWM2M");
                // cloak
                expect(instanceOf<CertificateIssuerConfig>(myConfig, "CERTIFICATE_ISSUER_CONFIG")).toBeTruthy();
                // uncloak

                const deviceContext = new DeviceRepository();
                const connectedDevices = (await deviceContext.list().all()).filter(
                    device => device.state === "registered"
                );
                // cloak
                expect(connectedDevices.length).toBeGreaterThanOrEqual(1);
                // uncloak

                for (const device of connectedDevices) {
                    await deviceContext.renewCertificate(myConfig.reference, device.id);
                }
            })();
            // end of example
        } catch (e) {
            // should throw 400, device cert cannot be renewed
            if ((e.details && e.details.code === 400) || e.details.code === 423) {
                return;
            }

            throw e;
        }
    });
});
