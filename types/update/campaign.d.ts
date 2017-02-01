import { CampaignType, CampaignStateEnum } from "./types";
import { WriteUpdateCampaignSerializer as apiCampaignRequest, UpdateCampaignSerializer as apiCampaign } from "../_api/deployment_service";
import { UpdateApi } from "./index";
import { CampaignState } from "./campaignState";
export declare class Campaign {
    private _api;
    static readonly CUSTOM_PREFIX: string;
    constructor(options: CampaignType, _api?: UpdateApi);
    static map(from: apiCampaign, api: UpdateApi): Campaign;
    static reverseMap(from: any): apiCampaignRequest;
    /**
     * Gets campaign status
     * @returns Promise containing campaign status
     */
    getStatus(): Promise<CampaignState>;
    /**
     * Gets campaign status
     * @param callback A function that is passed the return arguments (error, campaign status)
     */
    getStatus(callback: (err: any, data?: CampaignState) => any): any;
    /**
     * Update the campaign
     * @param options.name A name for the campaign
     * @param options.state State of the campaign
     * @param options.description A description of the campaign
     * @param options.manifestId
     * @param options.attributes The attributes of the device filter
     * @param options.customAttributes The custom attributes of the device filter
     * @param options.start The timestamp at which update campaign scheduled to start
     * @returns Promise of campaign
     */
    update(options: {
        name: string;
        state?: CampaignStateEnum;
        description?: string;
        manifestId?: string;
        attributes?: {
            [key: string]: string;
        };
        customAttributes?: {
            [key: string]: string;
        };
        start?: Date;
    }): Promise<Campaign>;
    /**
     * Update the campaign
     * @param options.name A name for the campaign
     * @param options.state State of the campaign
     * @param options.description A description of the campaign
     * @param options.manifestId
     * @param options.attributes The attributes of the device filter
     * @param options.customAttributes The custom attributes of the device filter
     * @param options.start The timestamp at which update campaign scheduled to start
     * @param callback A function that is passed the arguments (error, campaign)
     */
    update(options: {
        name: string;
        state?: CampaignStateEnum;
        description?: string;
        manifestId?: string;
        attributes?: {
            [key: string]: string;
        };
        customAttributes?: {
            [key: string]: string;
        };
        start?: Date;
    }, callback?: (err: any, data?: Campaign) => any): any;
    /**
     * Start the campaign
     * @returns Promise containing campaign
     */
    start(): Promise<Campaign>;
    /**
     * Start the campaign
     * @param callback A function that is passed the return arguments (error, campaign)
     */
    start(callback?: (err: any, data?: Campaign) => any): any;
    /**
     * Stop the campaign
     * @returns Promise containing campaign
     */
    stop(): Promise<Campaign>;
    /**
     * Stop the campaign
     * @param callback A function that is passed the return arguments (error, campaign)
     */
    stop(callback?: (err: any, data?: Campaign) => any): any;
    /**
     * Delete the campaign
     * @returns Promise containing any error
     */
    delete(): Promise<void>;
    /**
     * Delete the campaign
     * @param callback A function that is passed any error
     */
    delete(callback?: (err: any, data?: void) => any): any;
}
export interface Campaign extends CampaignType {
}
