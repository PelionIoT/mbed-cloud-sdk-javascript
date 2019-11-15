import { Entity } from "../../../common/entity";
import { UpdateCampaignStrategy, UpdateCampaignPhase } from "./types";
/**
 *UpdateCampaign
 */
export interface UpdateCampaign extends Entity {
    /**
     *The time the campaign entered the active state.
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly activeAt?: Date;

    /**
     *Flag indicating whether approval is needed to start the campaign.
     *@example false
     */
    approvalRequired?: boolean;

    /**
     *The time the campaign was archived.
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly archivedAt?: Date;

    /**
     *Flag indicating whether the campaign should be auto-stopped on reaching a threshold.
     *@example false
     */
    autostop?: boolean;

    /**
     *Text description of why a campaign failed to start or why a campaign stopped.
     *@example Insufficient billing credit.
     */
    readonly autostopReason?: string;

    /**
     *Percent of successful device updates to auto stop the campaign.
     *@example 85.00
     */
    autostopSuccessPercent?: number;

    /**
     *How the campaign adds devices. A `one-shot` campaign does not add new devices after it has started. A `continuous` campaign means that devices may be added to the campaign after it has started. The default is `one-shot`.
     */
    campaignStrategy?: UpdateCampaignStrategy;

    /**
     *The time the entity was created.
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly createdAt?: Date;

    /**
     *An optional description of the campaign.
     *@example This campaign updates Class XX devices to version 1.34
     */
    description?: string;

    /**
     *The filter for the devices the campaign is targeting at.
     *@example id__eq=00000000000000000000000000000000
     */
    deviceFilter: string;

    /**
     *Helper for creating the device filter string.
     */
    deviceFilterHelper?: { [key: string]: string };

    /**
     *The time the campaign finished.
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly finished?: Date;

    /**
     *The campaign name.
     *@example campaign
     */
    name?: string;

    /**
     *The phase of the campaign.
     */
    readonly phase?: UpdateCampaignPhase;

    /**
     *The ID of the manifest that will be sent to the device as part of the campaign.
     *@example 00000000000000000000000000000000
     */
    rootManifestId?: string;

    /**
     *The URL for the manifest that will be sent to the device as part of the campaign.
     *@example http://example.com/00000000000000000000000000000000
     */
    readonly rootManifestUrl?: string;

    /**
     *The time the campaign was started.
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly startedAt?: Date;

    /**
     *The time the campaign will be started.
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly startingAt?: Date;

    /**
     *The time the campaign was stopped.
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly stoppedAt?: Date;

    /**
     *The time the campaign will be stopped.
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly stoppingAt?: Date;

    /**
     *The time the entity was updated.
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly updatedAt?: Date;

    /**
     *The scheduled start time for the campaign. The campaign will start within 1 minute when then start time has elapsed.
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly when?: Date;
}
