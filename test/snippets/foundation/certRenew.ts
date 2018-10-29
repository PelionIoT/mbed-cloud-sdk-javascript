import { CertificateIssuerConfig, Device } from "../../../src/sdk/entities";

describe("cert renew snippets", async () => {

    it("should renew device certificate", async () => {
        const myConfig = await (await new CertificateIssuerConfig().list().all()).find(c => c.reference === "LWM2M");

        const connectedDevices = (await new Device().list().all()).filter(device => device.state === "registered");

        for (const device of connectedDevices) {
            await device.renewCertificate(myConfig.reference);
        }

        return connectedDevices;
    }, 100000);

});
