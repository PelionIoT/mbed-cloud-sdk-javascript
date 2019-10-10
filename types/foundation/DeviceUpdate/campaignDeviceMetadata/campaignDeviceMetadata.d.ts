import { Entity } from "../../../common/entity";
import { CampaignDeviceMetadataDeploymentState } from "./types";
/**
 *CampaignDeviceMetadata
 */
export interface CampaignDeviceMetadata extends Entity {
    /**
     *The device's campaign ID
     *@example 015bf72fccda00000000000100100280
     */
    campaignId: string;
    /**
     *The time the campaign was created
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly createdAt?: Date;
    /**
     *The state of the update campaign on the device
     */
    readonly deploymentState?: CampaignDeviceMetadataDeploymentState;
    /**
     *Description
     */
    readonly description?: string;
    /**
     *The device ID
     *@example 015c2fec9bba0000000000010010036f
     */
    readonly deviceId?: string;
    /**
     *How the firmware is delivered (connector or direct)
     *@example connector
     */
    readonly mechanism?: string;
    /**
     *The Device Management Connect URL
     */
    readonly mechanismUrl?: string;
    /**
     *The record name
     *@example default_object_name
     */
    readonly name?: string;
    /**
     *The record was modified in the database format: date-time
     *@example 2017-05-22T12:37:58.776736Z
     */
    readonly updatedAt?: Date;
}
