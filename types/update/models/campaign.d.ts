import { CallbackFn } from "../../common/interfaces";
import { AddCampaignObject, CampaignStateEnum } from "../types";
import { UpdateApi } from "../updateApi";
/**
 * Campaign
 */
export declare class Campaign {
    private _api;
    /**
     * The ID of the campaign
     */
    readonly id: string;
    /**
     * The state of the campaign
     */
    readonly state: CampaignStateEnum;
    /**
     * URl of the manifest used
     */
    readonly manifestUrl: string;
    /**
     * The time the object was created
     */
    readonly createdAt: Date;
    /**
     * The timestamp at which update campaign scheduled to start
     */
    readonly startedAt?: Date;
    /**
     * The timestamp when the update campaign finished
     */
    readonly finishedAt?: Date;
    constructor(init?: Partial<Campaign>, _api?: UpdateApi);
    /**
     * Update the campaign
     * @returns Promise of campaign
     */
    update(): Promise<Campaign>;
    /**
     * Update the campaign
     * @param callback A function that is passed the arguments (error, campaign)
     */
    update(callback: CallbackFn<Campaign>): void;
    /**
     * Start the campaign
     * @returns Promise containing campaign
     */
    start(): Promise<Campaign>;
    /**
     * Start the campaign
     * @param callback A function that is passed the return arguments (error, campaign)
     */
    start(callback: CallbackFn<Campaign>): void;
    /**
     * Stop the campaign
     * @returns Promise containing campaign
     */
    stop(): Promise<Campaign>;
    /**
     * Stop the campaign
     * @param callback A function that is passed the return arguments (error, campaign)
     */
    stop(callback: CallbackFn<Campaign>): void;
    /**
     * Delete the campaign
     * @returns Promise containing any error
     */
    delete(): Promise<void>;
    /**
     * Delete the campaign
     * @param callback A function that is passed any error
     */
    delete(callback: CallbackFn<void>): void;
}
export interface Campaign extends AddCampaignObject {
}
