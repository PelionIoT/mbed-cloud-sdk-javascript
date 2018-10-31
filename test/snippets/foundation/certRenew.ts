import { CertificateIssuerConfig, Device } from "../../../src/sdk/entities";

describe("cert renew snippets", async () => {

    it("should renew device certificate", async () => {
        // an example: certificate renew
        const myConfig = (await new CertificateIssuerConfig().list().all()).find(c => c.reference === "LWM2M");

        const connectedDevices = (await new Device().list().all()).filter(device => device.state === "registered");

        for (const device of connectedDevices) {
            await device.renewCertificate(myConfig.reference);
        }
        // end of example

        return connectedDevices;
    });

});
