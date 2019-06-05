/* tslint:disable: no-console */
import { FirmwareManifestRepository, UpdateCampaignRepository, SDK } from "../../../src";
import { encodeFilter } from "../../../src/legacy/common/functions";

describe("Update campaign examples", () => {

    test("create and manage a campaign", async () => {
        const sdk = new SDK();

        const firmwareManifestRepo = sdk.foundation().firmwareManifestRepository();
        const firmwareManifest = await firmwareManifestRepo.list({
            maxResults: 2,
        }).first();

        const updateCampaignRepo = sdk.foundation().updateCampaignRepository();
        const filter = {
            createdAt: {
                lte: new Date(2019, 0, 1)
            }
        };
        const campaign = await updateCampaignRepo.create({
            name: `campaign - ${new Date()}`,
            description: "Update campaign for prior 2019 devices",
            rootManifestId: firmwareManifest.id,
            deviceFilter: encodeFilter(filter),
        });

        console.log((await updateCampaignRepo.read(campaign.id)).phase);

        await updateCampaignRepo.start(campaign.id);

        console.log((await updateCampaignRepo.read(campaign.id)).phase);

        for await (const metadata of updateCampaignRepo.deviceMetadata(campaign.id)) {
            console.log(metadata);
        }
    });

});