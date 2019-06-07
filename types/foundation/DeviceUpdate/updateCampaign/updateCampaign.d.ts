import { Entity } from "../../../common/entity";
/**
 *UpdateCampaign
 */
export interface UpdateCampaign extends Entity {
    /**
     *Text description of why a campaign failed to start or why a campaign stopped.
     *@example Insufficient billing credit.
     */
    readonly autostopReason?: string;
    /**
     *The time the update campaign was created
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly createdAt?: Date;
    /**
     *An optional description of the campaign
     */
    description?: string;
    /**
     *The filter for the devices the campaign is targeting at
     *@example id__eq=00000000000000000000000000000000
     */
    deviceFilter: string;
    /**
     *Helper for creating the device filter string.
     */
    deviceFilterHelper?: {
        [key: string]: string;
    };
    /**
     *The campaign finish timestamp
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly finished?: Date;
    /**
     *The campaign name
     *@example campaign
     */
    name?: string;
    /**
     *The current phase of the campaign.
     */
    readonly phase?: string;
    /**
     *rootManifestId
     *@example 00000000000000000000000000000000
     */
    rootManifestId?: string;
    /**
     *rootManifestUrl
     *@example http://example.com/00000000000000000000000000000000
     */
    readonly rootManifestUrl?: string;
    /**
     *startedAt
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly startedAt?: Date;
    /**
     *The time the object was updated
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly updatedAt?: Date;
    /**
     *The scheduled start time for the campaign. The campaign will start within 1 minute when then start time has elapsed.
     *@example 2017-05-22T12:37:55.576563Z
     */
    when?: Date;
}
