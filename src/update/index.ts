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

import { asyncStyle, mapListResponse, encodeInclude, encodeAttributes } from "../common/functions";
import { ConnectionOptions, ListOptions, ListResponse } from "../common/interfaces";
import { CampaignStateEnum } from "./types";
import { Endpoints } from "./endpoints";
import { FirmwareImage } from "./firmwareImage";
import { FirmwareManifest } from "./firmwareManifest";
import { Campaign } from "./campaign";
import { CampaignState } from "./campaignState";

/**
* Root Update API
*/
export class UpdateApi {

    private _endpoints: Endpoints;

    /**
    * @param options connection options
    */
    constructor(options: ConnectionOptions) {
        this._endpoints = new Endpoints(options);
    }

    /**
     * List firmware images
     * @param options list options
     * @returns Promise of listResponse
     */
    public listFirmwareImages(options?: ListOptions): Promise<ListResponse<FirmwareImage>>;
    /**
     * List firmware images
     * @param options list options
     * @param callback A function that is passed the return arguments (error, listResponse)
     */
    public listFirmwareImages(options?: ListOptions, callback?: (err: any, data?: ListResponse<FirmwareImage>) => any);
    public listFirmwareImages(options?: any, callback?: (err: any, data?: ListResponse<FirmwareImage>) => any): Promise<ListResponse<FirmwareImage>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { limit, order, after, include } = options as ListOptions;
        return asyncStyle(done => {
            this._endpoints.firmware.firmwareImageList(limit, order, after, encodeInclude(include), (error, data) => {
                if (error) return done(error);

                let list = data.data.map(log => {
                    return FirmwareImage.map(log, this);
                });

                done(null, mapListResponse<FirmwareImage>(data, list));
            });
        }, callback);
    }

    /**
     * Get details of a firmware image
     * @param options.id The firmware image ID
     * @returns Promise containing the firmware image
     */
    public getFirmwareImage(options: { id: number }): Promise<FirmwareImage>;
    /**
     * Get details of a firmware image
     * @param options.id The firmware image ID
     * @param callback A function that is passed the return arguments (error, firmware image)
     */
    public getFirmwareImage(options: { id: number }, callback: (err: any, data?: FirmwareImage) => any);
    public getFirmwareImage(options: { id: number }, callback?: (err: any, data?: FirmwareImage) => any): Promise<FirmwareImage> {
        return asyncStyle(done => {
            this._endpoints.firmware.firmwareImageRetrieve(options.id, null, null, null, null, null, null, null, null, null, (error, data) => {
                if (error) return done(error);
                done(null, FirmwareImage.map(data.data[0], this));
            });
        }, callback);
    }

    /**
     * Adds a firmware image
     * @param options.data The binary data
     * @param options.name The display name for the firmware image
     * @param options.description The description of the firmware image
     * @returns Promise containing firmware image
     */
    public addFirmwareImage(options: { data: string, name: string, description?: string }): Promise<FirmwareImage>;
    /**
     * Adds a firmware image
     * @param options.data The binary data
     * @param options.name The display name for the firmware image
     * @param options.description The description of the firmware image
     * @param callback A function that is passed the return arguments (error, firmware image)
     */
    public addFirmwareImage(options: { data: string, name: string, description?: string }, callback: (err: any, data?: FirmwareImage) => any);
    public addFirmwareImage(options: { data: string, name: string, description?: string }, callback?: (err: any, data?: FirmwareImage) => any): Promise<FirmwareImage> {
        return asyncStyle(done => {
            this._endpoints.firmware.firmwareImageCreate(options.data, options.name, options.description, null, null, null, null, null, null, null, null, null, null, (error, data) => {
                if (error) return done(error);
                done(null, FirmwareImage.map(data, this));
            });
        }, callback);
    }

    /**
     * Deletes a firmware image
     * @param options.id The ID of the firmware image to delete
     * @returns Promise containing any error
     */
    public deleteFirmwareImage(options: { id: number }): Promise<void>;
    /**
     * Deletes a firmware image
     * @param options.id The ID of the firmware image to delete
     * @param callback A function that is passed the return arguments (error, void)
     */
    public deleteFirmwareImage(options: { id: number }, callback: (err: any, data?: void) => any);
    public deleteFirmwareImage(options: { id: number }, callback?: (err: any, data?: void) => any): Promise<void> {
        return asyncStyle(done => {
            this._endpoints.firmware.firmwareImageDestroy(options.id, null, null, null, null, null, null, null, null, null, (error, data) => {
                if (error) return done(error);
                done(null, null);
            });
        }, callback);
    }

    /**
     * List firmware manifests
     * @param options list options
     * @returns Promise of listResponse
     */
    public listFirmwareManifests(options?: ListOptions): Promise<ListResponse<FirmwareManifest>>;
    /**
     * List manifests
     * @param options list options
     * @param callback A function that is passed the return arguments (error, listResponse)
     */
    public listFirmwareManifests(options?: ListOptions, callback?: (err: any, data?: ListResponse<FirmwareManifest>) => any);
    public listFirmwareManifests(options?: any, callback?: (err: any, data?: ListResponse<FirmwareManifest>) => any): Promise<ListResponse<FirmwareManifest>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { limit, order, after, include } = options as ListOptions;
        return asyncStyle(done => {
            this._endpoints.firmware.firmwareManifestList(limit, order, after, encodeInclude(include), (error, data) => {
                if (error) return done(error);

                let list = data.data.map(log => {
                    return FirmwareManifest.map(log, this);
                });

                done(null, mapListResponse<FirmwareManifest>(data, list));
            });
        }, callback);
    }

    /**
     * Get details of a firmware manifest
     * @param options.id The firmware manifest ID
     * @returns Promise containing the firmware manifest
     */
    public getFirmwareManifest(options: { id: number }): Promise<FirmwareManifest>;
    /**
     * Get details of a firmware manifest
     * @param options.id The firmware manifest ID
     * @param callback A function that is passed the return arguments (error, firmware manifest)
     */
    public getFirmwareManifest(options: { id: number }, callback: (err: any, data?: FirmwareManifest) => any);
    public getFirmwareManifest(options: { id: number }, callback?: (err: any, data?: FirmwareManifest) => any): Promise<FirmwareManifest> {
        return asyncStyle(done => {
            this._endpoints.firmware.firmwareManifestRetrieve(options.id, null, null, null, null, null, null, null, null, null, null, null, (error, data) => {
                if (error) return done(error);
                done(null, FirmwareManifest.map(data, this));
            });
        }, callback);
    }

    /**
     * Adds a firmware manifest
     * @param options.data The manifest file to create
     * @param options.name The display name for the firmware manifest
     * @param options.description The description of the firmware manifest
     * @returns Promise containing firmware manifest
     */
    public addFirmwareManifest(options: { data: string, name: string, description?: string }): Promise<FirmwareManifest>;
    /**
     * Adds a firmware manifest
     * @param options.data The manifest file to create
     * @param options.name The display name for the firmware manifest
     * @param options.description The description of the firmware manifest
     * @param callback A function that is passed the return arguments (error, firmware manifest)
     */
    public addFirmwareManifest(options: { data: string, name: string, description?: string }, callback: (err: any, data?: FirmwareManifest) => any);
    public addFirmwareManifest(options: { data: string, name: string, description?: string }, callback?: (err: any, data?: FirmwareManifest) => any): Promise<FirmwareManifest> {
        return asyncStyle(done => {
            this._endpoints.firmware.firmwareManifestCreate(options.data, options.name, options.description, (error, data) => {
                if (error) return done(error);
                done(null, FirmwareManifest.map(data, this));
            });
        }, callback);
    }

    /**
     * Deletes a firmware manifest
     * @param options.id The ID of the firmware manifest to delete
     * @returns Promise containing any error
     */
    public deleteFirmwareManifest(options: { id: number }): Promise<void>;
    /**
     * Deletes a firmware manifest
     * @param options.id The ID of the firmware manifest to delete
     * @param callback A function that is passed the return arguments (error, void)
     */
    public deleteFirmwareManifest(options: { id: number }, callback: (err: any, data?: void) => any);
    public deleteFirmwareManifest(options: { id: number }, callback?: (err: any, data?: void) => any): Promise<void> {
        return asyncStyle(done => {
            this._endpoints.firmware.firmwareManifestDestroy(options.id, (error, data) => {
                if (error) return done(error);
                done(null, null);
            });
        }, callback);
    }

    /**
     * List update campaigns
     * @param options list options
     * @returns Promise of listResponse
     */
    public listCampaigns(options?: ListOptions): Promise<ListResponse<Campaign>>;
    /**
     * List update campaigns
     * @param options list options
     * @param callback A function that is passed the return arguments (error, listResponse)
     */
    public listCampaigns(options?: ListOptions, callback?: (err: any, data?: ListResponse<Campaign>) => any);
    public listCampaigns(options?: any, callback?: (err: any, data?: ListResponse<Campaign>) => any): Promise<ListResponse<Campaign>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { limit, order, after, include } = options as ListOptions;
        let filter = encodeAttributes(options);
        return asyncStyle(done => {
            this._endpoints.deployment.updateCampaignList(limit, order, after, filter, encodeInclude(include), (error, data) => {
                if (error) return done(error);

                let list = data.data.map(log => {
                    return Campaign.map(log, this);
                });

                done(null, mapListResponse<Campaign>(data, list));
            });
        }, callback);
    }

    /**
     * Get details of an update campaign
     * @param options.id The update campaign ID
     * @returns Promise containing the update campaign
     */
    public getCampaign(options: { id: string }): Promise<Campaign>;
    /**
     * Get details of an update campaign
     * @param options.id The update campaign ID
     * @param callback A function that is passed the return arguments (error, update campaign)
     */
    public getCampaign(options: { id: string }, callback: (err: any, data?: Campaign) => any);
    public getCampaign(options: { id: string }, callback?: (err: any, data?: Campaign) => any): Promise<Campaign> {
        return asyncStyle(done => {
            this._endpoints.deployment.updateCampaignRetrieve(options.id, (error, data) => {
                if (error) return done(error);
                done(null, Campaign.map(data, this));
            });
        }, callback);
    }

    /**
     * Adds an update campaign
     * @param options.name A name for the campaign
     * @param options.description A description of the campaign
     * @param options.manifestId
     * @param options.attributes The attributes of the device filter
     * @param options.customAttributes The custom attributes of the device filter
     * @param options.start The timestamp at which update campaign scheduled to start
     * @returns Promise containing update campaign
     */
    public addCampaign(options: { name: string, description?: string, manifestId?: string, attributes?: { [key: string]: string }, customAttributes?: { [key: string]: string }, start?: Date }): Promise<Campaign>;
    /**
     * Adds an update campaign
     * @param options.name A name for the campaign
     * @param options.description A description of the campaign
     * @param options.manifestId
     * @param options.attributes The attributes of the device filter
     * @param options.customAttributes The custom attributes of the device filter
     * @param options.start The timestamp at which update campaign scheduled to start
     * @param callback A function that is passed the return arguments (error, update campaign)
     */
    public addCampaign(options: { name: string, description?: string, manifestId?: string, attributes?: { [key: string]: string }, customAttributes?: { [key: string]: string }, start?: Date }, callback?: (err: any, data?: Campaign) => any);
    public addCampaign(options: { name: string, description?: string, manifestId?: string, attributes?: { [key: string]: string }, customAttributes?: { [key: string]: string }, start?: Date }, callback?: (err: any, data?: Campaign) => any): Promise<Campaign> {
        return asyncStyle(done => {
            this._endpoints.deployment.updateCampaignCreate(Campaign.reverseMap(options), (error, data) => {
                if (error) return done(error);
                done(null, Campaign.map(data, this));
            });
        }, callback);
    }

    /**
     * Update an update campaign
     * @param options.id The campaign ID
     * @param options.name A name for the campaign
     * @param options.state State of the campaign
     * @param options.description A description of the campaign
     * @param options.manifestId
     * @param options.attributes The attributes of the device filter
     * @param options.customAttributes The custom attributes of the device filter
     * @param options.start The timestamp at which update campaign scheduled to start
     * @returns Promise of campaign
     */
    public updateCampaign(options: { id: string, name: string, state?: CampaignStateEnum, description?: string, manifestId?: string, attributes?: { [key: string]: string }, customAttributes?: { [key: string]: string }, start?: Date }): Promise<Campaign>;
    /**
     * Update an update campaign
     * @param options.id The campaign ID
     * @param options.name A name for the campaign
     * @param options.state State of the campaign
     * @param options.description A description of the campaign
     * @param options.manifestId
     * @param options.attributes The attributes of the device filter
     * @param options.customAttributes The custom attributes of the device filter
     * @param options.start The timestamp at which update campaign scheduled to start
     * @param callback A function that is passed the arguments (error, campaign)
     */
    public updateCampaign(options: { id: string, name: string, state?: CampaignStateEnum, description?: string, manifestId?: string, attributes?: { [key: string]: string }, customAttributes?: { [key: string]: string }, start?: Date }, callback?: (err: any, data?: Campaign) => any);
    public updateCampaign(options: { id: string, name: string, state?: CampaignStateEnum, description?: string, manifestId?: string, attributes?: { [key: string]: string }, customAttributes?: { [key: string]: string }, start?: Date }, callback?: (err: any, data?: Campaign) => any): Promise<Campaign> {
        return asyncStyle(done => {
            this._endpoints.deployment.updateCampaignUpdate(options.id, Campaign.reverseMap(options), (error, data) => {
                if (error) return done(error);

                let query = Campaign.map(data, this);
                done(null, query);
            });
        }, callback);
    }

    /**
     * Deletes an update campaign
     * @param options.id The ID of the update campaign to delete
     * @returns Promise containing any error
     */
    public deleteCampaign(options: { id: string }): Promise<void>;
    /**
     * Deletes an update campaign
     * @param options.id The ID of the update campaign to delete
     * @param callback A function that is passed the return arguments (error, void)
     */
    public deleteCampaign(options: { id: string }, callback: (err: any, data?: void) => any);
    public deleteCampaign(options: { id: string }, callback?: (err: any, data?: void) => any): Promise<void> {
        return asyncStyle(done => {
            this._endpoints.deployment.updateCampaignDestroy(options.id, (error, data) => {
                if (error) return done(error);
                done(null, null);
            });
        }, callback);
    }

    /**
     * Gets update campaign status
     * @param options.id The ID of the update campaign
     * @returns Promise containing campaign status
     */
    public getCampaignStatus(options: { id: string }): Promise<CampaignState>;
    /**
     * Gets update campaign status
     * @param options.id The ID of the update campaign
     * @param callback A function that is passed the return arguments (error, campaign status)
     */
    public getCampaignStatus(options: { id: string }, callback: (err: any, data?: CampaignState) => any);
    public getCampaignStatus(options: { id: string }, callback?: (err: any, data?: CampaignState) => any): Promise<CampaignState> {
        return asyncStyle(done => {
            this._endpoints.deployment.updateCampaignStatus(options.id, (error, data) => {
                if (error) return done(error);
                done(null, CampaignState.map(data));
            });
        }, callback);
    }

    /**
     * Start an update campaign
     * @param options.id The ID of the update campaign
     * @param options.name The name of the update campaign
     * @returns Promise containing campaign
     */
    public startCampaign(options: { id: string, name: string }): Promise<Campaign>;
    /**
     * Start an update campaign
     * @param options.id The ID of the update campaign
     * @param options.name The name of the update campaign
     * @param callback A function that is passed the return arguments (error, campaign)
     */
    public startCampaign(options: { id: string, name: string }, callback?: (err: any, data?: Campaign) => any);
    public startCampaign(options: { id: string, name: string }, callback?: (err: any, data?: Campaign) => any): Promise<Campaign> {
        (options as any).state = "scheduled";
        return asyncStyle(done => {
            this.updateCampaign(options, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }

    /**
     * Stop an update campaign
     * @param options.id The ID of the update campaign
     * @param options.name The name of the update campaign
     * @returns Promise containing campaign
     */
    public stopCampaign(options: { id: string, name: string }): Promise<Campaign>;
    /**
     * Stop an update campaign
     * @param options.id The ID of the update campaign
     * @param options.name The name of the update campaign
     * @param callback A function that is passed the return arguments (error, campaign)
     */
    public stopCampaign(options: { id: string, name: string }, callback?: (err: any, data?: Campaign) => any);
    public stopCampaign(options: { id: string, name: string }, callback?: (err: any, data?: Campaign) => any): Promise<Campaign> {
        (options as any).state = "draft";
        return asyncStyle(done => {
            this.updateCampaign(options, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }
}
