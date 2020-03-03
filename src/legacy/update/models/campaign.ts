/*
 * Pelion Device Management JavaScript SDK
 * Copyright Arm Limited 2017
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
import { CallbackFn, ListOptions } from "../../common/interfaces";
import { ListResponse } from "../../common/listResponse";
import { UpdateCampaignObject } from "../types";
import { UpdateApi } from "../updateApi";
import { CampaignDeviceState } from "./campaignDeviceState";

/**
 * Campaign
 */
export class Campaign {
    /**
     * The ID of the campaign
     */
    public readonly id: string;
    /**
     * URL of the manifest used
     */
    public readonly manifestUrl?: string;
    /**
     * The time the object was created
     */
    public readonly createdAt?: Date;
    /**
     * The timestamp at which update campaign scheduled to start
     */
    public readonly startedAt?: Date;
    /**
     * The timestamp when the update campaign was updated
     */
    public readonly updatedAt?: Date;
    /**
     * The timestamp when the update campaign finished
     */
    public readonly finishedAt?: Date;
    /**
     * The phase of the campaign
     */
    public readonly phase?: string;

    constructor(init?: Partial<Campaign>, private _api?: UpdateApi) {
        for (const key in init) {
            if (init.hasOwnProperty(key)) {
                this[key] = init[key];
            }
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
    public update(callback: CallbackFn<Campaign>): void;
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
    public start(callback: CallbackFn<Campaign>): void;
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
    public stop(callback: CallbackFn<Campaign>): void;
    public stop(callback?: CallbackFn<Campaign>): Promise<Campaign> {
        return asyncStyle(done => {
            this._api.stopCampaign(this.id, done);
        }, callback);
    }

    /**
     * List campaign device states
     * @param options list options
     * @returns Promise of listResponse
     */
    public listDeviceStates(options?: ListOptions): Promise<ListResponse<CampaignDeviceState>>;
    /**
     * List campaign device states
     * @param options list options
     * @param callback A function that is passed the return arguments (error, listResponse)
     */
    public listDeviceStates(options?: ListOptions, callback?: CallbackFn<ListResponse<CampaignDeviceState>>): void;
    public listDeviceStates(
        options?: ListOptions,
        callback?: CallbackFn<ListResponse<CampaignDeviceState>>
    ): Promise<ListResponse<CampaignDeviceState>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        return asyncStyle(done => {
            this._api.listCampaignDeviceStates(this.id, options, done);
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
    public delete(callback: CallbackFn<void>): void;
    public delete(callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._api.deleteCampaign(this.id, done);
        }, callback);
    }
}
export interface Campaign extends UpdateCampaignObject {}
