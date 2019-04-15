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
     * @param campaign - The device's campaign ID
     * @param id - The metadata record ID
     */
    public read(campaign: string, id: string): Promise<CampaignDeviceMetadata> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url:
                            "/v3/update-campaigns/{campaign_id}/campaign-device-metadata/{campaign_device_metadata_id}/",
                        method: "GET",
                        pathParams: {
                            campaign_id: campaign,
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
