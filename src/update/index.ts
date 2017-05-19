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

import { apiWrapper, mapListResponse, encodeInclude, encodeFilter } from "../common/functions";
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
 * var mbedCloudSDK = require("mbed-cloud-sdk");
 *
 * var update = new mbedCloudSDK.UpdateApi({
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
 *     var update = new mbedCloudSDK.UpdateApi({
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

        return apiWrapper(resultsFn => {
            let { limit, order, after, include, filter } = options as FirmwareImageListOptions;
            this._endpoints.firmware.firmwareImageList(limit, order, after, encodeFilter(filter, Filters.EMPTY_FILTER_MAP), encodeInclude(include), resultsFn);
        }, (data, done) => {
            let list: FirmwareImage[];
            if (data.data && data.data.length) {
                list = data.data.map(image => {
                    return FirmwareImageAdapter.map(image, this);
                });
            }

            done(null, mapListResponse(data, list));
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
        return apiWrapper(resultsFn => {
            this._endpoints.firmware.firmwareImageRetrieve(firmwareImageId, resultsFn);
        }, (data, done) => {
            done(null, FirmwareImageAdapter.map(data, this));
        }, callback);
    }

    /**
     * Adds a firmware image, returning a Promise
     *
     * Example (Node.js):
     * ```JavaScript
     * var fs = require("fs");
     * ...
     * update.addFirmwareImage({
     *     name: "<FirmwareImage name>",
     *     dataFile: fs.createReadStream("<FirmwareImage file path>")
     * })
     * .then(image => {
     *     console.log(image.url);
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * Example (browser):
     * ```JavaScript
     * <input type="file" id="file">
     * ...
     * document.getElementById("file").addEventListener("change", event => {
     *     let file = event.target.files[0];
     *
     *     updateApi.addFirmwareImage({
     *         name: file.name,
     *         dataFile: file
     *     })
     *     .then(image => {
     *         alert(image.url);
     *     })
     *     .catch(error => {
     *         console.log(error);
     *     });
     * });
     * ```
     *
     * @param image The image to add
     * @returns Promise containing firmware image
     */
    public addFirmwareImage(image: AddFirmwareImageObject): Promise<FirmwareImage>;
    /**
     * Adds a firmware image, using a callback function
     *
     * Example (Node.js):
     * ```JavaScript
     * var fs = require("fs");
     * ...
     * update.addFirmwareImage({
     *     name: "<FirmwareImage name>",
     *     dataFile: fs.createReadStream("<FirmwareImage file path>")
     * }, function(error, image) {
     *     if (error) return console.log(error);
     *     console.log(image.url);
     * });
     * ```
     *
     * Example (browser):
     * ```JavaScript
     * <input type="file" id="file">
     * ...
     * document.getElementById("file").addEventListener("change", function(event) {
     *     var file = event.target.files[0];
     *
     *     updateApi.addFirmwareImage({
     *         name: file.name,
     *         dataFile: file
     *     }, function(error, image) {
     *         if (error) return console.log(error);
     *         console.log(image.url);
     *     });
     * });
     * ```
     *
     * @param image The image to add
     * @param callback A function that is passed the return arguments (error, firmware image)
     */
    public addFirmwareImage(image: AddFirmwareImageObject, callback: CallbackFn<FirmwareImage>): void;
    public addFirmwareImage(image: AddFirmwareImageObject, callback?: CallbackFn<FirmwareImage>): Promise<FirmwareImage> {
        return apiWrapper(resultsFn => {
            this._endpoints.firmware.firmwareImageCreate(image.dataFile, image.name, image.description, resultsFn);
        }, (data, done) => {
            done(null, FirmwareImageAdapter.map(data, this));
        }, callback);
    }

    /**
     * Deletes a firmware image
     * @param firmwareImageId The ID of the firmware image to delete
     * @returns Promise containing any error
     */
    public deleteFirmwareImage(firmwareImageId: string): Promise<void>;
    /**
     * Deletes a firmware image
     * @param firmwareImageId The ID of the firmware image to delete
     * @param callback A function that is passed the return arguments (error, void)
     */
    public deleteFirmwareImage(firmwareImageId: string, callback: CallbackFn<void>): void;
    public deleteFirmwareImage(firmwareImageId: string, callback?: CallbackFn<void>): Promise<void> {
        return apiWrapper(resultsFn => {
            this._endpoints.firmware.firmwareImageDestroy(firmwareImageId, resultsFn);
        }, (data, done) => {
            done(null, data);
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

        return apiWrapper(resultsFn => {
            let { limit, order, after, include, filter } = options as FirmwareManifestListOptions;
            this._endpoints.firmware.firmwareManifestList(limit, order, after, encodeFilter(filter, Filters.EMPTY_FILTER_MAP), encodeInclude(include), resultsFn);
        }, (data, done) => {
            let list: FirmwareManifest[];
            if (data.data && data.data.length) {
                list = data.data.map(log => {
                    return FirmwareManifestAdapter.map(log, this);
                });
            }

            done(null, mapListResponse(data, list));
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
        return apiWrapper(resultsFn => {
            this._endpoints.firmware.firmwareManifestRetrieve(firmwareManifestId, resultsFn);
        }, (data, done) => {
            done(null, FirmwareManifestAdapter.map(data, this));
        }, callback);
    }

    /**
     * Adds a firmware manifest, returning a Promise
     *
     * Example (Node.js):
     * ```JavaScript
     * var fs = require("fs");
     * ...
     * update.addFirmwareManifest({
     *     name: "<FirmwareManifest name>",
     *     dataFile: fs.createReadStream("<FirmwareManifest file path>")
     * })
     * .then(manifest => {
     *     console.log(manifest.url);
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * Example (browser):
     * ```JavaScript
     * <input type="file" id="file">
     * ...
     * document.getElementById("file").addEventListener("change", event => {
     *     let file = event.target.files[0];
     *
     *     updateApi.addFirmwareManifest({
     *         name: file.name,
     *         dataFile: file
     *     })
     *     .then(manifest => {
     *         alert(manifest.url);
     *     })
     *     .catch(error => {
     *         console.log(error);
     *     });
     * });
     * ```
     *
     * @param manifest The manifest to add
     * @returns Promise containing firmware manifest
     */
    public addFirmwareManifest(manifest: AddFirmwareManifestObject): Promise<FirmwareManifest>;
    /**
     * Adds a firmware manifest, using a callback function
     *
     * Example (Node.js):
     * ```JavaScript
     * var fs = require("fs");
     * ...
     * update.addFirmwareManifest({
     *     name: "<FirmwareManifest name>",
     *     dataFile: fs.createReadStream("<FirmwareManifest file path>")
     * }, function(error, manifest) {
     *     if (error) return console.log(error);
     *     console.log(manifest.url);
     * });
     * ```
     *
     * Example (browser):
     * ```JavaScript
     * <input type="file" id="file">
     * ...
     * document.getElementById("file").addEventListener("change", function(event) {
     *     var file = event.target.files[0];
     *
     *     updateApi.addFirmwareManifest({
     *         name: file.name,
     *         dataFile: file
     *     }, function(error, manifest) {
     *         if (error) return console.log(error);
     *         console.log(manifest.url);
     *     });
     * });
     * ```
     *
     * @param manifest The manifest to add
     * @param callback A function that is passed the return arguments (error, firmware manifest)
     */
    public addFirmwareManifest(manifest: AddFirmwareManifestObject, callback: CallbackFn<FirmwareManifest>): void;
    public addFirmwareManifest(manifest: AddFirmwareManifestObject, callback?: CallbackFn<FirmwareManifest>): Promise<FirmwareManifest> {
        return apiWrapper(resultsFn => {
            this._endpoints.firmware.firmwareManifestCreate(manifest.dataFile, manifest.name, manifest.description, resultsFn);
        }, (data, done) => {
            done(null, FirmwareManifestAdapter.map(data, this));
        }, callback);
    }

    /**
     * Deletes a firmware manifest
     * @param firmwareManifestId The ID of the firmware manifest to delete
     * @returns Promise containing any error
     */
    public deleteFirmwareManifest(firmwareManifestId: string): Promise<void>;
    /**
     * Deletes a firmware manifest
     * @param firmwareManifestId The ID of the firmware manifest to delete
     * @param callback A function that is passed the return arguments (error, void)
     */
    public deleteFirmwareManifest(firmwareManifestId: string, callback: CallbackFn<void>): void;
    public deleteFirmwareManifest(firmwareManifestId: string, callback?: CallbackFn<void>): Promise<void> {
        return apiWrapper(resultsFn => {
            this._endpoints.firmware.firmwareManifestDestroy(firmwareManifestId, resultsFn);
        }, (data, done) => {
            done(null, data);
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

        return apiWrapper(resultsFn => {
            let { limit, order, after, include, filter } = options as CampaignListOptions;
            this._endpoints.deployment.updateCampaignList(limit, order, after, encodeFilter(filter, Filters.CAMPAIGN_FILTER_MAP), encodeInclude(include), resultsFn);
        }, (data, done) => {
            let list: Campaign[];
            if (data.data && data.data.length) {
                list = data.data.map(log => {
                    return CampaignAdapter.map(log, this);
                });
            }

            done(null, mapListResponse(data, list));
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
        return apiWrapper(resultsFn => {
            this._endpoints.deployment.updateCampaignRetrieve(campaignId, resultsFn);
        }, (data, done) => {
            done(null, CampaignAdapter.map(data, this));
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
        return apiWrapper(resultsFn => {
            this._endpoints.deployment.updateCampaignCreate(CampaignAdapter.addMap(campaign), resultsFn);
        }, (data, done) => {
            done(null, CampaignAdapter.map(data, this));
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
        return apiWrapper(resultsFn => {
            this._endpoints.deployment.updateCampaignPartialUpdate(campaign.id, CampaignAdapter.updateMap(campaign), resultsFn);
        }, (data, done) => {
            let response = CampaignAdapter.map(data, this);
            done(null, response);
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
        return apiWrapper(resultsFn => {
            this._endpoints.deployment.updateCampaignDestroy(campaignId, resultsFn);
        }, (data, done) => {
            done(null, data);
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
        return apiWrapper(resultsFn => {
            this.updateCampaign({
                id: campaignId,
                state: "scheduled"
            }, resultsFn);
        }, (data, done) => {
            done(null, data);
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
        return apiWrapper(resultsFn => {
            this.updateCampaign({
                id: campaignId,
                state: "draft"
            }, resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
    }
}
