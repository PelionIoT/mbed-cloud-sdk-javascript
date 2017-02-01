/* 
* mbed Cloud JavaScript SDK
* Copyright ARM Limited 2017
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import { asyncStyle, encodeFilter, decodeAttributes } from "../common/functions";
import { CampaignType, CampaignStateEnum } from "./types";
import {
    WriteUpdateCampaignSerializer as apiCampaignRequest,
    UpdateCampaignSerializer as apiCampaign
} from "../_api/deployment_service";
import { UpdateApi } from "./index";
import { CampaignState } from "./campaignState";

/*
 * Campaign
 */
export class Campaign {

    static readonly CUSTOM_PREFIX = "custom_attributes__";

    constructor(options: CampaignType, private _api?: UpdateApi) {
        for(var key in options) {
            this[key] = options[key];
        }
    }

    static map(from: apiCampaign, api: UpdateApi): Campaign {
        let attributes = decodeAttributes(from.device_filter, Campaign.CUSTOM_PREFIX);
        let type:CampaignType = {
            accountId:           from.updating_account_id,
            apiKey:              from.updating_api_key,
            attributes:          attributes.noMatch,
            customAttributes:    attributes.match,
            createdAt:           from.created_at,
            description:         from.description,
            finishDate:          from.finished,
            id:                  from.id,
            manifestId:          from.root_manifest_id,
            manifestUrl:         from.root_manifest_url,
            name:                from.name,
            startDate:           from.when,
            state:               from.state,
            updatedAt:           from.updated_at,
            userId:              from.updating_user_id
        };

        return new Campaign(type, api);
    }

    static reverseMap(from: any): apiCampaignRequest {
        return {
            description:         from.description,
            device_filter:       encodeFilter(from, Campaign.CUSTOM_PREFIX),
            name:                from.name,
            root_manifest_id:    from.manifestId,
            state:               from.state,
            when:                from.startDate
        };
    }

    /**
     * Gets campaign status
     * @returns Promise containing campaign status
     */
    public getStatus(): Promise<CampaignState>;
    /**
     * Gets campaign status
     * @param callback A function that is passed the return arguments (error, campaign status)
     */
    public getStatus(callback: (err: any, data?: CampaignState) => any);
    public getStatus(callback?: (err: any, data?: CampaignState) => any): Promise<CampaignState> {
        return asyncStyle(done => {
            this._api.getCampaignStatus({
                id:    this.id
            }, done);
        }, callback);
    }

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
    public update(options: { name: string, state?: CampaignStateEnum, description?: string, manifestId?: string, attributes?: { [key: string]: string }, customAttributes?: { [key: string]: string }, start?: Date }): Promise<Campaign>;
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
    public update(options: { name: string, state?: CampaignStateEnum, description?: string, manifestId?: string, attributes?: { [key: string]: string }, customAttributes?: { [key: string]: string }, start?: Date }, callback?: (err: any, data?: Campaign) => any);
    public update(options: { name: string, state?: CampaignStateEnum, description?: string, manifestId?: string, attributes?: { [key: string]: string }, customAttributes?: { [key: string]: string }, start?: Date }, callback?: (err: any, data?: Campaign) => any): Promise<Campaign> {
        return asyncStyle(done => {
            this._api.updateCampaign({
                id:this.id,
                attributes:          options.attributes,
                customAttributes:    options.customAttributes,
                description:         options.description,
                manifestId:          options.manifestId,
                name:                options.name,
                start:               options.start,
                state:               options.state
            }, done);
        }, callback);
    }

    /**
     * Start the campaign
     * @returns Promise containing campaign
     */
    public start(): Promise<Campaign>;
    /**
     * Start the campaign
     * @param callback A function that is passed the return arguments (error, campaign)
     */
    public start(callback?: (err: any, data?: Campaign) => any);
    public start(callback?: (err: any, data?: Campaign) => any): Promise<Campaign> {
        return asyncStyle(done => {
            this._api.startCampaign(this, done);
        }, callback);
    }

    /**
     * Stop the campaign
     * @returns Promise containing campaign
     */
    public stop(): Promise<Campaign>;
    /**
     * Stop the campaign
     * @param callback A function that is passed the return arguments (error, campaign)
     */
    public stop(callback?: (err: any, data?: Campaign) => any);
    public stop(callback?: (err: any, data?: Campaign) => any): Promise<Campaign> {
        return asyncStyle(done => {
            this._api.stopCampaign(this, done);
        }, callback);
    }

    /**
     * Delete the campaign
     * @returns Promise containing any error
     */
    public delete(): Promise<void>;
    /**
     * Delete the campaign
     * @param callback A function that is passed any error
     */
    public delete(callback?: (err: any, data?: void) => any);
    public delete(callback?: (err: any, data?: void) => any): Promise<void> {
        return asyncStyle(done => {
            this._api.deleteCampaign(this, done);
        }, callback);
    }
}
export interface Campaign extends CampaignType {}
