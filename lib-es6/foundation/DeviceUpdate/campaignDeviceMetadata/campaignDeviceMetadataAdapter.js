import { Adapter } from "../../../common/adapter";
/**
 *CampaignDeviceMetadata adapter
 */
export class CampaignDeviceMetadataAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data, instance) {
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
            name: data.name,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    }
}
//# sourceMappingURL=campaignDeviceMetadataAdapter.js.map