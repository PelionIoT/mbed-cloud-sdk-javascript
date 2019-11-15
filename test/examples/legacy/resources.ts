/* tslint:disable: no-console */
import { BillingApi } from "../../../src";

describe("examples for reading legacy resources", () => {
    test("reading a resource", () => {
        // an example: legacy_get_resource
        // cloak
        /*
        // uncloak
        import { BillingApi } from "mbed-cloud-sdk";
        // cloak
        */
        // uncloak
        (async () => {
            const billingApi = new BillingApi();
            console.log(`Quota remaining: ${await billingApi.getQuotaRemaining()}`);
        })();
        // end of example
    });

    test("listing a resource", () => {
        // an example: legacy_listing_resources
        // cloak
        /*
        // uncloak
        import { BillingApi } from "mbed-cloud-sdk";
        // cloak
        */
        // uncloak
        const billingApi = new BillingApi();
        billingApi.getQuotaHistory().then(data => {
            data.data.forEach(quotaHistory => {
                console.log(`Quota change reason: ${quotaHistory.reason}, delta: ${quotaHistory.delta}`);
            });
        });
        // end of example
    });
});
