/* tslint:disable: no-console */
import { BillingApi } from "../../../src";

describe("examples for reading legacy resources", () => {

    test("reading a resource", async () => {
        const billingApi = new BillingApi();
        console.log(`Quota remaining: ${await billingApi.getQuotaRemaining()}`);
    });

    test("listing a resource", () => {
        const billingApi = new BillingApi();
        billingApi.getQuotaHistory()
            .then(data => {
                data.data.forEach(quotaHistory => {
                    console.log(`Quota change reason: ${quotaHistory.reason}, delta: ${quotaHistory.delta}`);
                });
            });
    });

});
