import { CampaignDeviceStateEnum } from "../types";
/**
 * Campaign Device State
 */
export declare class CampaignDeviceState {
    /**
     * The id of the metadata record
     */
    readonly id?: string;
    /**
     * The id of the device
     */
    readonly deviceId?: string;
    /**
     * The id of the campaign the device is in
     */
    readonly campaignId?: string;
    /**
     * The state of the update campaign on the device
     */
    readonly state?: CampaignDeviceStateEnum;
    /**
     * The name of the device
     */
    readonly name?: string;
    /**
     * Description of the device
     */
    readonly description?: string;
    /**
     * The timestamp of when this record was created in the database
     */
    readonly createdAt?: Date;
    /**
     * The timestamp of when this record was modified in the database
     */
    readonly updatedAt?: Date;
    /**
     * The mechanism used to deliver the firmware (connector or direct)
     */
    readonly mechanism?: string;
    /**
     * The URL of cloud connect used
     */
    readonly mechanismUrl?: string;
    constructor(init?: Partial<CampaignDeviceState>);
}
