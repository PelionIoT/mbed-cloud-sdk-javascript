import { CertificateIssuerConfig, Device } from "../../../src/sdk/entities";

describe("cert renew snippets", async () => {

    it("should renew device certificate", async () => {
        try {
            // an example: certificate renew
            const myConfig = (await new CertificateIssuerConfig().list().all()).find(c => c.reference === "LWM2M");
            // cloak
            expect(myConfig instanceof CertificateIssuerConfig).toBeTruthy();
            // uncloak

            const connectedDevices = (await new Device().list().all()).filter(device => device.state === "registered");
            // cloak
            expect(connectedDevices.length).toBeGreaterThanOrEqual(1);
            // uncloak

            for (const device of connectedDevices) {
                await device.renewCertificate(myConfig.reference);
            }
            // end of example

            return connectedDevices;
        } catch (e) {
            // should throw 400, device cert cannot be renewed
            if (e.details && e.details.code === 400) {
                return;
            }

            throw e;
        }

    });

});
