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

import { asyncStyle, mapListResponse, encodeInclude, encodeFilter } from "../common/functions";
import { ConnectionOptions, ListResponse, CallbackFn } from "../common/interfaces";
import { AddFirmwareImageObject, AddFirmwareManifestObject, AddCampaignObject, UpdateCampaignObject, FirmwareImageListOptions, FirmwareManifestListOptions, CampaignListOptions } from "./types";
import { FirmwareImage } from "./models/firmwareImage";
import { FirmwareImageAdapter } from "./models/firmwareImageAdapter";
import { FirmwareManifest } from "./models/firmwareManifest";
import { FirmwareManifestAdapter } from "./models/firmwareManifestAdapter";
import { Campaign } from "./models/campaign";
import { CampaignAdapter } from "./models/campaignAdapter";
import { Endpoints } from "./endpoints";
import { Filters } from "./filters";

/**
 * ## Update API
 *
 * This API is initialized with [ConnectionOptions](../interfaces/connectionoptions.html).
 *
 * To create an instance of this API in [Node.js](https://nodejs.org):
 *
 * ```JavaScript
 * var mbed = require("mbed-cloud-sdk");
 *
 * var update = new mbed.UpdateApi({
 *     apiKey: "<mbed Cloud API Key>"
 * });
 * ```
 *
 * To create an instance of this API in the browser:
 *
 * ```html
 * <script src="<mbed-cloud-sdk>/bundles/update.min.js"></script>
 *
 * <script>
 *     var update = new mbed.UpdateApi({
 *         apiKey: "<mbed Cloud API Key>"
 *     });
 * </script>
 * ```
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
    public listFirmwareImages(options?: FirmwareImageListOptions): Promise<ListResponse<FirmwareImage>>;
    /**
     * List firmware images
     * @param options list options
     * @param callback A function that is passed the return arguments (error, listResponse)
     */
    public listFirmwareImages(options?: FirmwareImageListOptions, callback?: CallbackFn<ListResponse<FirmwareImage>>): void;
    public listFirmwareImages(options?: any, callback?: CallbackFn<ListResponse<FirmwareImage>>): Promise<ListResponse<FirmwareImage>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        return asyncStyle(done => {
            let { limit, order, after, include, filter } = options as FirmwareImageListOptions;

            this._endpoints.firmware.firmwareImageList(limit, order, after, encodeFilter(filter, Filters.EMPTY_FILTER_MAP), encodeInclude(include), (error, data) => {
                if (error) return done(error);

                let list = data.data.map(image => {
                    return FirmwareImageAdapter.map(image, this);
                });

                done(null, mapListResponse<FirmwareImage>(data, list));
            });
        }, callback);
    }

    /**
     * Get details of a firmware image
     * @param firmwareImageId The firmware image ID
     * @returns Promise containing the firmware image
     */
    public getFirmwareImage(firmwareImageId: number): Promise<FirmwareImage>;
    /**
     * Get details of a firmware image
     * @param firmwareImageId The firmware image ID
     * @param callback A function that is passed the return arguments (error, firmware image)
     */
    public getFirmwareImage(firmwareImageId: number, callback: CallbackFn<FirmwareImage>): void;
    public getFirmwareImage(firmwareImageId: number, callback?: CallbackFn<FirmwareImage>): Promise<FirmwareImage> {
        return asyncStyle(done => {
            this._endpoints.firmware.firmwareImageRetrieve(firmwareImageId, (error, data) => {
                if (error) return done(error);
                done(null, FirmwareImageAdapter.map(data, this));
            });
        }, callback);
    }

    /**
     * Adds a firmware image
     * @param image The image to add
     * @returns Promise containing firmware image
     */
    public addFirmwareImage(image: AddFirmwareImageObject): Promise<FirmwareImage>;
    /**
     * Adds a firmware image
     * @param image The image to add
     * @param callback A function that is passed the return arguments (error, firmware image)
     */
    public addFirmwareImage(image: AddFirmwareImageObject, callback: CallbackFn<FirmwareImage>): void;
    public addFirmwareImage(image: AddFirmwareImageObject, callback?: CallbackFn<FirmwareImage>): Promise<FirmwareImage> {
        return asyncStyle(done => {
            this._endpoints.firmware.firmwareImageCreate(image.dataFile, image.name, image.description, (error, data) => {
                if (error) return done(error);
                done(null, FirmwareImageAdapter.map(data, this));
            });
        }, callback);
    }

    /**
     * Deletes a firmware image
     * @param firmwareImageId The ID of the firmware image to delete
     * @returns Promise containing any error
     */
    public deleteFirmwareImage(firmwareImageId: number): Promise<void>;
    /**
     * Deletes a firmware image
     * @param firmwareImageId The ID of the firmware image to delete
     * @param callback A function that is passed the return arguments (error, void)
     */
    public deleteFirmwareImage(firmwareImageId: number, callback: CallbackFn<void>): void;
    public deleteFirmwareImage(firmwareImageId: number, callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._endpoints.firmware.firmwareImageDestroy(firmwareImageId, (error) => {
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
    public listFirmwareManifests(options?: FirmwareManifestListOptions): Promise<ListResponse<FirmwareManifest>>;
    /**
     * List manifests
     * @param options list options
     * @param callback A function that is passed the return arguments (error, listResponse)
     */
    public listFirmwareManifests(options?: FirmwareManifestListOptions, callback?: CallbackFn<ListResponse<FirmwareManifest>>): void;
    public listFirmwareManifests(options?: any, callback?: CallbackFn<ListResponse<FirmwareManifest>>): Promise<ListResponse<FirmwareManifest>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        return asyncStyle(done => {
            let { limit, order, after, include, filter } = options as FirmwareManifestListOptions;

            this._endpoints.firmware.firmwareManifestList(limit, order, after, encodeFilter(filter, Filters.EMPTY_FILTER_MAP), encodeInclude(include), (error, data) => {
                if (error) return done(error);

                let list = data.data.map(log => {
                    return FirmwareManifestAdapter.map(log, this);
                });

                done(null, mapListResponse<FirmwareManifest>(data, list));
            });
        }, callback);
    }

    /**
     * Get details of a firmware manifest
     * @param firmwareManifestId The firmware manifest ID
     * @returns Promise containing the firmware manifest
     */
    public getFirmwareManifest(firmwareManifestId: number): Promise<FirmwareManifest>;
    /**
     * Get details of a firmware manifest
     * @param firmwareManifestId The firmware manifest ID
     * @param callback A function that is passed the return arguments (error, firmware manifest)
     */
    public getFirmwareManifest(firmwareManifestId: number, callback: CallbackFn<FirmwareManifest>): void;
    public getFirmwareManifest(firmwareManifestId: number, callback?: CallbackFn<FirmwareManifest>): Promise<FirmwareManifest> {
        return asyncStyle(done => {
            this._endpoints.firmware.firmwareManifestRetrieve(firmwareManifestId, (error, data) => {
                if (error) return done(error);
                done(null, FirmwareManifestAdapter.map(data, this));
            });
        }, callback);
    }

    /**
     * Adds a firmware manifest
     * @param manifest The manifest to add
     * @returns Promise containing firmware manifest
     */
    public addFirmwareManifest(manifest: AddFirmwareManifestObject): Promise<FirmwareManifest>;
    /**
     * Adds a firmware manifest
     * @param manifest The manifest to add
     * @param callback A function that is passed the return arguments (error, firmware manifest)
     */
    public addFirmwareManifest(manifest: AddFirmwareManifestObject, callback: CallbackFn<FirmwareManifest>): void;
    public addFirmwareManifest(manifest: AddFirmwareManifestObject, callback?: CallbackFn<FirmwareManifest>): Promise<FirmwareManifest> {
        return asyncStyle(done => {
            this._endpoints.firmware.firmwareManifestCreate(manifest.dataFile, manifest.name, manifest.description, (error, data) => {
                if (error) return done(error);
                done(null, FirmwareManifestAdapter.map(data, this));
            });
        }, callback);
    }

    /**
     * Deletes a firmware manifest
     * @param firmwareManifestId The ID of the firmware manifest to delete
     * @returns Promise containing any error
     */
    public deleteFirmwareManifest(firmwareManifestId: number): Promise<void>;
    /**
     * Deletes a firmware manifest
     * @param firmwareManifestId The ID of the firmware manifest to delete
     * @param callback A function that is passed the return arguments (error, void)
     */
    public deleteFirmwareManifest(firmwareManifestId: number, callback: CallbackFn<void>): void;
    public deleteFirmwareManifest(firmwareManifestId: number, callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._endpoints.firmware.firmwareManifestDestroy(firmwareManifestId, (error) => {
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
    public listCampaigns(options?: CampaignListOptions): Promise<ListResponse<Campaign>>;
    /**
     * List update campaigns
     * @param options list options
     * @param callback A function that is passed the return arguments (error, listResponse)
     */
    public listCampaigns(options?: CampaignListOptions, callback?: CallbackFn<ListResponse<Campaign>>): void;
    public listCampaigns(options?: any, callback?: CallbackFn<ListResponse<Campaign>>): Promise<ListResponse<Campaign>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        return asyncStyle(done => {
            let { limit, order, after, include, filter } = options as CampaignListOptions;

            this._endpoints.deployment.updateCampaignList(limit, order, after, encodeFilter(filter, Filters.CAMPAIGN_FILTER_MAP), encodeInclude(include), (error, data) => {
                if (error) return done(error);

                let list = data.data.map(log => {
                    return CampaignAdapter.map(log, this);
                });

                done(null, mapListResponse<Campaign>(data, list));
            });
        }, callback);
    }

    /**
     * Get details of an update campaign
     * @param campaignId The update campaign ID
     * @returns Promise containing the update campaign
     */
    public getCampaign(campaignId: string): Promise<Campaign>;
    /**
     * Get details of an update campaign
     * @param campaignId The update campaign ID
     * @param callback A function that is passed the return arguments (error, update campaign)
     */
    public getCampaign(campaignId: string, callback: CallbackFn<Campaign>): void;
    public getCampaign(campaignId: string, callback?: CallbackFn<Campaign>): Promise<Campaign> {
        return asyncStyle(done => {
            this._endpoints.deployment.updateCampaignRetrieve(campaignId, (error, data) => {
                if (error) return done(error);
                done(null, CampaignAdapter.map(data, this));
            });
        }, callback);
    }

    /**
     * Adds an update campaign
     * @param campaign The campaign to add
     * @returns Promise containing update campaign
     */
    public addCampaign(campaign: AddCampaignObject): Promise<Campaign>;
    /**
     * Adds an update campaign
     * @param campaign The campaign to add
     * @param callback A function that is passed the return arguments (error, update campaign)
     */
    public addCampaign(campaign: AddCampaignObject, callback: CallbackFn<Campaign>): void;
    public addCampaign(campaign: AddCampaignObject, callback?: CallbackFn<Campaign>): Promise<Campaign> {
        return asyncStyle(done => {
            this._endpoints.deployment.updateCampaignCreate(CampaignAdapter.addMap(campaign), (error, data) => {
                if (error) return done(error);
                done(null, CampaignAdapter.map(data, this));
            });
        }, callback);
    }

    /**
     * Update an update campaign
     * @param campaign The campaign to update
     * @returns Promise of campaign
     */
    public updateCampaign(campaign: UpdateCampaignObject): Promise<Campaign>;
    /**
     * Update an update campaign
     * @param campaign The campaign to update
     * @param callback A function that is passed the arguments (error, campaign)
     */
    public updateCampaign(campaign: UpdateCampaignObject, callback: CallbackFn<Campaign>): void;
    public updateCampaign(campaign: UpdateCampaignObject, callback?: CallbackFn<Campaign>): Promise<Campaign> {
        return asyncStyle(done => {
            this._endpoints.deployment.updateCampaignPartialUpdate(campaign.id, CampaignAdapter.updateMap(campaign), (error, data) => {
                if (error) return done(error);

                let response = CampaignAdapter.map(data, this);
                done(null, response);
            });
        }, callback);
    }

    /**
     * Deletes an update campaign
     * @param campaignId The ID of the update campaign to delete
     * @returns Promise containing any error
     */
    public deleteCampaign(campaignId: string): Promise<void>;
    /**
     * Deletes an update campaign
     * @param campaignId The ID of the update campaign to delete
     * @param callback A function that is passed the return arguments (error, void)
     */
    public deleteCampaign(campaignId: string, callback: CallbackFn<void>): void;
    public deleteCampaign(campaignId: string, callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._endpoints.deployment.updateCampaignDestroy(campaignId, (error) => {
                if (error) return done(error);
                done(null, null);
            });
        }, callback);
    }

    /**
     * Start an update campaign
     * @param campaignId The ID of the update campaign
     * @returns Promise containing campaign
     */
    public startCampaign(campaignId: string): Promise<Campaign>;
    /**
     * Start an update campaign
     * @param campaignId The ID of the update campaign
     * @param callback A function that is passed the return arguments (error, campaign)
     */
    public startCampaign(campaignId: string, callback: CallbackFn<Campaign>): void;
    public startCampaign(campaignId: string, callback?: CallbackFn<Campaign>): Promise<Campaign> {
        return asyncStyle(done => {
            this.updateCampaign({
                id: campaignId,
                state: "scheduled"
            }, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }

    /**
     * Stop an update campaign
     * @param campaignId The ID of the update campaign
     * @returns Promise containing campaign
     */
    public stopCampaign(campaignId: string): Promise<Campaign>;
    /**
     * Stop an update campaign
     * @param campaignId The ID of the update campaign
     * @param callback A function that is passed the return arguments (error, campaign)
     */
    public stopCampaign(campaignId: string, callback: CallbackFn<Campaign>): void;
    public stopCampaign(campaignId: string, callback?: CallbackFn<Campaign>): Promise<Campaign> {
        return asyncStyle(done => {
            this.updateCampaign({
                id: campaignId,
                state: "draft"
            }, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }
}
