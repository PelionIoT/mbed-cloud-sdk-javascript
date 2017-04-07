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

import { asyncStyle } from "../../common/functions";
import { CallbackFn } from "../../common/interfaces";
import { AddCampaignObject, CampaignStateEnum } from "../types";
import { UpdateApi } from "../index";

/*
 * Campaign
 */
export class Campaign {

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
    readonly startDate?: Date;
    /**
     * The timestamp when the update campaign finished
     */
    readonly finishDate?: Date;

    constructor(init?: Partial<Campaign>, private _api?: UpdateApi) {
        for(var key in init) {
            this[key] = init[key];
        }
    }

    /**
     * Update the campaign
     * @returns Promise of campaign
     */
    public update(): Promise<Campaign>;
    /**
     * Update the campaign
     * @param callback A function that is passed the arguments (error, campaign)
     */
    public update(callback: CallbackFn<Campaign>);
    public update(callback?: CallbackFn<Campaign>): Promise<Campaign> {
        return asyncStyle(done => {
            this._api.updateCampaign(this, done);
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
    public start(callback: CallbackFn<Campaign>);
    public start(callback?: CallbackFn<Campaign>): Promise<Campaign> {
        return asyncStyle(done => {
            this._api.startCampaign(this.id, done);
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
    public stop(callback: CallbackFn<Campaign>);
    public stop(callback?: CallbackFn<Campaign>): Promise<Campaign> {
        return asyncStyle(done => {
            this._api.stopCampaign(this.id, done);
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
    public delete(callback: CallbackFn<void>);
    public delete(callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._api.deleteCampaign(this.id, done);
        }, callback);
    }
}
export interface Campaign extends AddCampaignObject {}
