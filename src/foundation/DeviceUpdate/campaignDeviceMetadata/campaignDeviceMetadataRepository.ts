import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { CampaignDeviceMetadata } from "./campaignDeviceMetadata";
import { CampaignDeviceMetadataAdapter } from "../../index";
/**
 *CampaignDeviceMetadata repository
 */
export class CampaignDeviceMetadataRepository extends Repository {
    /**
     * read
     * @param campaignId - The device's campaign ID.
     * @param id - The metadata record ID.
     */
    public read(campaignId: string, id: string): Promise<CampaignDeviceMetadata> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url:
                            "/v3/update-campaigns/{campaign_id}/campaign-device-metadata/{campaign_device_metadata_id}",
                        method: "GET",
                        pathParams: {
                            campaign_id: campaignId,
                            campaign_device_metadata_id: id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, CampaignDeviceMetadataAdapter.fromApi(data));
            }
        );
    }
}
