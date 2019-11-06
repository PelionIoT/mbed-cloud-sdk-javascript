import { Adapter } from "../../../common/adapter";
import { deviceFilterHelperSetter } from "../../../common/privateFunctions";
import { UpdateCampaign } from "./updateCampaign";
/**
 *UpdateCampaign adapter
 */
export class UpdateCampaignAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    public static fromApi(data: any, instance?: any): UpdateCampaign {
        if (!data) {
            return null;
        }
        const mappedEntity = UpdateCampaignAdapter.assignDefined(instance || {}, {
            _discriminator: "UPDATE_CAMPAIGN",
            activeAt: data.active_at,
            approvalRequired: data.approval_required,
            archivedAt: data.archived_at,
            autostop: data.autostop,
            autostopReason: data.autostop_reason,
            autostopSuccessPercent: data.autostop_success_percent,
            campaignStrategy: data.campaign_strategy || "one-shot",
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
            startingAt: data.starting_at,
            stoppedAt: data.stopped_at,
            stoppingAt: data.stopping_at,
            updatedAt: data.updated_at,
            when: data.when,
        });
        deviceFilterHelperSetter(mappedEntity);
        return mappedEntity;
    }
}
