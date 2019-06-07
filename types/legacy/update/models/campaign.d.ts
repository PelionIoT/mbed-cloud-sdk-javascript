import { CallbackFn, ListOptions } from "../../common/interfaces";
import { UpdateCampaignObject } from "../types";
import { UpdateApi } from "../updateApi";
import { ListResponse } from "../../common/listResponse";
import { CampaignDeviceState } from "./campaignDeviceState";
/**
 * Campaign
 */
export declare class Campaign {
    private _api?;
    /**
     * The ID of the campaign
     */
    readonly id: string;
    /**
     * URL of the manifest used
     */
    readonly manifestUrl?: string;
    /**
     * The time the object was created
     */
    readonly createdAt?: Date;
    /**
     * The timestamp at which update campaign scheduled to start
     */
    readonly startedAt?: Date;
    /**
     * The timestamp when the update campaign was updated
     */
    readonly updatedAt?: Date;
    /**
     * The timestamp when the update campaign finished
     */
    readonly finishedAt?: Date;
    /**
     * The phase of the campaign
     */
    readonly phase?: string;
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
     * List campaign device states
     * @param options list options
     * @returns Promise of listResponse
     */
    listDeviceStates(options?: ListOptions): Promise<ListResponse<CampaignDeviceState>>;
    /**
     * List campaign device states
     * @param options list options
     * @param callback A function that is passed the return arguments (error, listResponse)
     */
    listDeviceStates(options?: ListOptions, callback?: CallbackFn<ListResponse<CampaignDeviceState>>): void;
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
export interface Campaign extends UpdateCampaignObject {
}
