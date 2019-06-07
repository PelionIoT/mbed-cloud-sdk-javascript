import { Adapter } from "../../../common/adapter";
import { deviceFilterHelperSetter } from "../../../common/privateFunctions";
/**
 *UpdateCampaign adapter
 */
export class UpdateCampaignAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data, instance) {
        if (!data) {
            return null;
        }
        const mappedEntity = UpdateCampaignAdapter.assignDefined(instance || {}, {
            _discriminator: "UPDATE_CAMPAIGN",
            autostopReason: data.autostop_reason,
            createdAt: data.created_at,
            description: data.description,
            deviceFilter: data.device_filter,
            deviceFilterHelper: data.device_filter_helper,
            finished: data.finished,
            id: data.id,
            name: data.name,
            phase: data.phase,
            rootManifestId: data.root_manifest_id,
            rootManifestUrl: data.root_manifest_url,
            startedAt: data.started_at,
            updatedAt: data.updated_at,
            when: data.when,
        });
        deviceFilterHelperSetter(mappedEntity);
        return mappedEntity;
    }
}
//# sourceMappingURL=updateCampaignAdapter.js.map