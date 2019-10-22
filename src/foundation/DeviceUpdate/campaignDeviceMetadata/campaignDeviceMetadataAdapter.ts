import { Adapter } from "../../../common/adapter";
import { CampaignDeviceMetadata } from "./campaignDeviceMetadata";
/**
 *CampaignDeviceMetadata adapter
 */
export class CampaignDeviceMetadataAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    public static fromApi(data: any, instance?: any): CampaignDeviceMetadata {
        if (!data) {
            return null;
        }
        const mappedEntity = CampaignDeviceMetadataAdapter.assignDefined(instance || {}, {
            _discriminator: "CAMPAIGN_DEVICE_METADATA",
            campaignId: data.campaign,
            createdAt: data.created_at,
            deploymentState: data.deployment_state,
            description: data.description,
            deviceId: data.device_id,
            id: data.id,
            mechanism: data.mechanism,
            mechanismUrl: data.mechanism_url,
            name: data.name || "default_object_name",
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    }
}
