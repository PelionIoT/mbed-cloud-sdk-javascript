import { CertificateIssuerConfig, Device } from "../../../src/sdk/entities";

describe("cert renew snippets", () => {

    it("should renew device certificate", async () => {
        const certConfigs = await new CertificateIssuerConfig().list().all();

        const myConfig = certConfigs.find(c => c.reference === "LWM2M");

        const devices = await new Device().list().all();

        devices.filter(d => d.state === "registered")
            .forEach(async d => {
                try {
                    await d.renewCertificate(myConfig.reference);
                } catch (e) {
                    // tslint:disable-next-line:no-console
                    console.log(e);
                    throw e;
                }
            });
    });

});
