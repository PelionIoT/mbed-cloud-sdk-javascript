import { Entity } from "../../../common/entity";
import { CampaignDeviceMetadataDeploymentState } from "./types";
/**
 *CampaignDeviceMetadata
 */
export interface CampaignDeviceMetadata extends Entity {
    /**
     *The device's campaign ID.
     *@example 015bf72fccda00000000000100100280
     */
    campaignId: string;

    /**
     *The time the entity was created.
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly createdAt?: Date;

    /**
     *The state of the update campaign on the device.
     */
    readonly deploymentState?: CampaignDeviceMetadataDeploymentState;

    /**
     *Description.
     *@example a description
     */
    readonly description?: string;

    /**
     *The device ID.
     *@example 015c2fec9bba0000000000010010036f
     */
    readonly deviceId?: string;

    /**
     *How the firmware is delivered (connector or direct).
     *@example connector
     */
    readonly mechanism?: string;

    /**
     *The Device Management Connect URL.
     */
    readonly mechanismUrl?: string;

    /**
     *The record name.
     */
    readonly name?: string;

    /**
     *The time the entity was updated.
     *@example 2017-05-22T12:37:55.576563Z
     */
    readonly updatedAt?: Date;
}
