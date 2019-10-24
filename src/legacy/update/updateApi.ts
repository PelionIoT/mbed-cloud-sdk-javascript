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

import { asyncStyle, apiWrapper, encodeInclude, encodeFilter } from "../common/functions";
import { CallbackFn, ListOptions } from "../common/interfaces";
import { ListResponse } from "../common/listResponse";
import { AddFirmwareImageObject, AddFirmwareManifestObject, AddCampaignObject, UpdateCampaignObject, FirmwareImageListOptions, FirmwareManifestListOptions, CampaignListOptions } from "./types";
import { FirmwareImage } from "./models/firmwareImage";
import { FirmwareImageAdapter } from "./models/firmwareImageAdapter";
import { FirmwareManifest } from "./models/firmwareManifest";
import { FirmwareManifestAdapter } from "./models/firmwareManifestAdapter";
import { Campaign } from "./models/campaign";
import { CampaignAdapter } from "./models/campaignAdapter";
import { CampaignDeviceState } from "./models/campaignDeviceState";
import { CampaignDeviceStateAdapter } from "./models/campaignDeviceStateAdapter";
import { Endpoints } from "./endpoints";
import { Filters } from "./filters";
import { ApiMetadata } from "../common/apiMetadata";
import { ConfigOptions } from "../../common/config";

/**
 * ## Update API
 *
 * The API can be initalized with a .env file in the working directory with the following values
 *
 * MBED_CLOUD_SDK_API_KEY=<Pelion DM API Key>
 *
 * and optionally
 *
 * MBED_CLOUD_SDK_HOST=<your host> (defaults to https://api.us-east-1.mbedcloud.com)
 *
 * OR
 *
 * This API is initialized with [ConnectionOptions](../interfaces/connectionoptions.html).
 *
 * To create an instance of this API in [Node.js](https://nodejs.org):
 *
 * ```JavaScript
 * var PelionDMSDK = require("mbed-cloud-sdk");
 *
 * var update = new PelionDMSDK.UpdateApi({
 *     apiKey: "<Pelion DM API Key>"
 * });
 * ```
 *
 * To create an instance of this API in the browser:
 *
 * ```html
 * <script src="<pelion-dm-sdk>/bundles/update.min.js"></script>
 *
 * <script>
 *     var update = new MbedCloudSDK.UpdateApi({
 *         apiKey: "<Pelion DM API Key>"
 *     });
 * </script>
 * ```
 */
export class UpdateApi {

    private _endpoints: Endpoints;

    /**
     * @param options connection options
     */
    constructor(options: ConfigOptions) {
        this._endpoints = new Endpoints(options);
    }

    /**
     * List firmware images
     *
     * Example:
     * ```JavaScript
     * update.listFirmwareImages({
     *     limit: 5,
     *     filter: {
     *         name: { $eq: "blinky" },
     *         createdAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *         updatedAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") }
     *     }
     * })
     * .then(firmwareimages => {
     *     // Utilize firmwareimages here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param options list options
     * @returns Promise of listResponse
     */
    public listFirmwareImages(options?: FirmwareImageListOptions): Promise<ListResponse<FirmwareImage>>;
    /**
     * List firmware images
     *
     * Example:
     * ```JavaScript
     * update.listFirmwareImages({
     *     limit: 5,
     *     filter: {
     *         name: { $eq: "blinky" },
     *         createdAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *         updatedAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") }
     * }},
     * function(error, firmwareimages) {
     *     if (error) throw error;
     *     // Utilize firmwareimages here
     * });
     * ```
     *
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

        return apiWrapper( resultsFn => {
            const { limit, order, after, include, filter } = options as FirmwareImageListOptions;
            this._endpoints.update.firmwareImageList(limit, order, after, encodeFilter(filter, Filters.EMPTY_FILTER_MAP), encodeInclude(include), resultsFn);
        }, (data, done) => {
            let list: Array<FirmwareImage>;
            if (data.data && data.data.length) {
                list = data.data.map( image => {
                    return FirmwareImageAdapter.map(image, this);
                });
            }

            done(null, new ListResponse(data, list));
        }, callback);
    }

    /**
     * Get details of a firmware image
     *
     * Example:
     * ```JavaScript
     * update.getFirmwareImage('015baf5f4f04000000000001001003d5')
     * .then(firmwareimage => {
     *     // Utilize firmwareimage here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param firmwareImageId The firmware image ID
     * @returns Promise containing the firmware image
     */
    public getFirmwareImage(firmwareImageId: string): Promise<FirmwareImage>;
    /**
     * Get details of a firmware image
     *
     * Example:
     * ```JavaScript
     * update.getFirmwareImage('015baf5f4f04000000000001001003d5', function(error, firmwareimage) {
     *     if (error) throw error;
     *     // Utilize firmwareimage here
     * });
     * ```
     *
     * @param firmwareImageId The firmware image ID
     * @param callback A function that is passed the return arguments (error, firmware image)
     */
    public getFirmwareImage(firmwareImageId: string, callback: CallbackFn<FirmwareImage>): void;
    public getFirmwareImage(firmwareImageId: string, callback?: CallbackFn<FirmwareImage>): Promise<FirmwareImage> {
        return apiWrapper( resultsFn => {
            this._endpoints.update.firmwareImageRetrieve(firmwareImageId, resultsFn);
        }, (data, done) => {
            done(null, FirmwareImageAdapter.map(data, this));
        }, callback);
    }

    /**
     * Add a firmware image
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
     * Add a firmware image
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
        return apiWrapper( resultsFn => {
            this._endpoints.update.firmwareImageCreate(image.dataFile, image.name, image.description, resultsFn);
        }, (data, done) => {
            done(null, FirmwareImageAdapter.map(data, this));
        }, callback);
    }

    /**
     * Delete a firmware image
     *
     * Example:
     * ```JavaScript
     * update.deleteFirmwareImage('015baf5f4f04000000000001001003d5')
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param firmwareImageId The ID of the firmware image to delete
     * @returns Promise containing any error
     */
    public deleteFirmwareImage(firmwareImageId: string): Promise<void>;
    /**
     * Delete a firmware image
     *
     * Example:
     * ```JavaScript
     * update.deleteFirmwareImage('015baf5f4f04000000000001001003d5', function(error) {
     *     if (error) throw error;
     * });
     * ```
     *
     * @param firmwareImageId The ID of the firmware image to delete
     * @param callback A function that is passed the return arguments (error, void)
     */
    public deleteFirmwareImage(firmwareImageId: string, callback: CallbackFn<void>): void;
    public deleteFirmwareImage(firmwareImageId: string, callback?: CallbackFn<void>): Promise<void> {
        return apiWrapper( resultsFn => {
            this._endpoints.update.firmwareImageDestroy(firmwareImageId, resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
    }

    /**
     * List firmware manifests
     *
     * Example:
     * ```JavaScript
     * update.listFirmwareManifests({
     *     limit: 5,
     *     filter: {
     *         name: { $eq: "blinky" },
     *         createdAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *         updatedAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") }
     *     }
     * })
     * .then(firmwaremanifests => {
     *     // Utilize firmwaremanifests here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param options list options
     * @returns Promise of listResponse
     */
    public listFirmwareManifests(options?: FirmwareManifestListOptions): Promise<ListResponse<FirmwareManifest>>;
    /**
     * List firmware manifests
     *
     * Example:
     * ```JavaScript
     * update.listFirmwareManifests({
     *     limit: 5,
     *     filter: {
     *         name: { $eq: "blinky" },
     *         createdAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *         updatedAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") }
     *     }
     * }, function(error, firmwaremanifests) {
     *     if (error) throw error;
     *     // Utilize firmwaremanifests here
     * }
     * ```
     *
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

        return apiWrapper( resultsFn => {
            const { limit, order, after, include, filter } = options as FirmwareManifestListOptions;
            this._endpoints.update.firmwareManifestList(limit, order, after, encodeFilter(filter, Filters.EMPTY_FILTER_MAP), encodeInclude(include), resultsFn);
        }, (data, done) => {
            let list: Array<FirmwareManifest>;
            if (data.data && data.data.length) {
                list = data.data.map( log => {
                    return FirmwareManifestAdapter.map(log, this);
                });
            }

            done(null, new ListResponse(data, list));
        }, callback);
    }

    /**
     * Get details of a firmware manifest
     *
     * Example:
     * ```JavaScript
     * update.getFirmwareManifest('015baf60323d000000000001001003dd')
     * .then(firmwaremanifest => {
     *     // Utilize firmwaremanifest here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param firmwareManifestId The firmware manifest ID
     * @returns Promise containing the firmware manifest
     */
    public getFirmwareManifest(firmwareManifestId: string): Promise<FirmwareManifest>;
    /**
     * Get details of a firmware manifest
     *
     * Example:
     * ```JavaScript
     * update.getFirmwareManifest('015baf60323d000000000001001003dd', function(error, firmwaremanifest) {
     *     if (error) throw error;
     *     // Utilize firmwaremanifest here
     * });
     * ```
     *
     * @param firmwareManifestId The firmware manifest ID
     * @param callback A function that is passed the return arguments (error, firmware manifest)
     */
    public getFirmwareManifest(firmwareManifestId: string, callback: CallbackFn<FirmwareManifest>): void;
    public getFirmwareManifest(firmwareManifestId: string, callback?: CallbackFn<FirmwareManifest>): Promise<FirmwareManifest> {
        return apiWrapper( resultsFn => {
            this._endpoints.update.firmwareManifestRetrieve(firmwareManifestId, resultsFn);
        }, (data, done) => {
            done(null, FirmwareManifestAdapter.map(data, this));
        }, callback);
    }

    /**
     * Add a firmware manifest
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
     * Add a firmware manifest
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
        return apiWrapper( resultsFn => {
            this._endpoints.update.firmwareManifestCreate(manifest.dataFile, manifest.name, manifest.description,  manifest.keyTableFile, resultsFn);
        }, (data, done) => {
            done(null, FirmwareManifestAdapter.map(data, this));
        }, callback);
    }

    /**
     * Delete a firmware manifest
     *
     * Example:
     * ```JavaScript
     * update.deleteFirmwareManifest('015baf60323d000000000001001003dd')
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param firmwareManifestId The ID of the firmware manifest to delete
     * @returns Promise containing any error
     */
    public deleteFirmwareManifest(firmwareManifestId: string): Promise<void>;
    /**
     * Delete a firmware manifest
     *
     * Example:
     * ```JavaScript
     * update.deleteFirmwareManifest('015baf60323d000000000001001003dd', function(error) {
     *     if (error) throw error;
     * });
     * ```
     *
     * @param firmwareManifestId The ID of the firmware manifest to delete
     * @param callback A function that is passed the return arguments (error, void)
     */
    public deleteFirmwareManifest(firmwareManifestId: string, callback: CallbackFn<void>): void;
    public deleteFirmwareManifest(firmwareManifestId: string, callback?: CallbackFn<void>): Promise<void> {
        return apiWrapper( resultsFn => {
            this._endpoints.update.firmwareManifestDestroy(firmwareManifestId, resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
    }

    /**
     * List update campaigns
     *
     * Example:
     * ```JavaScript
     * update.listCampaigns({
     *     limit: 5,
     *     filter: {
     *         name: { $eq: "blinky" },
     *         createdAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *         updatedAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") }
     *     }
     * })
     * .then(campaigns => {
     *     // Utilize campaigns here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param options list options
     * @returns Promise of listResponse
     */
    public listCampaigns(options?: CampaignListOptions): Promise<ListResponse<Campaign>>;
    /**
     * List update campaigns
     *
     * Example:
     * ```JavaScript
     * update.listCampaigns({
     *     limit: 5,
     *     filter: {
     *         name: { $eq: "blinky" },
     *         createdAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *         updatedAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") }
     *     }
     * }, function(error, campaigns) {
     *     if (error) throw error;
     *     // Utilize campaigns here
     * });
     * ```
     *
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

        return apiWrapper( resultsFn => {
            const { limit, order, after, include, filter } = options as CampaignListOptions;
            this._endpoints.update.updateCampaignList(limit, order, after, encodeFilter(filter, Filters.CAMPAIGN_FILTER_MAP), encodeInclude(include), resultsFn);
        }, (data, done) => {
            let list: Array<Campaign>;
            if (data.data && data.data.length) {
                list = data.data.map( log => {
                    return CampaignAdapter.map(log, this);
                });
            }

            done(null, new ListResponse(data, list));
        }, callback);
    }

    /**
     * Get details of an update campaign
     *
     * Example:
     * ```JavaScript
     * update.getCampaign('015baf607c250000000000010010003d')
     * .then(campaign => {
     *     // Utilize campaign here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param campaignId The update campaign ID
     * @returns Promise containing the update campaign
     */
    public getCampaign(campaignId: string): Promise<Campaign>;
    /**
     * Get details of an update campaign
     *
     * Example:
     * ```JavaScript
     * update.getCampaign('015baf607c250000000000010010003d', function(error, campaign) {
     *     if (error) throw error;
     *     // Utilize campaign here
     * });
     * ```
     *
     * @param campaignId The update campaign ID
     * @param callback A function that is passed the return arguments (error, update campaign)
     */
    public getCampaign(campaignId: string, callback: CallbackFn<Campaign>): void;
    public getCampaign(campaignId: string, callback?: CallbackFn<Campaign>): Promise<Campaign> {
        return apiWrapper( resultsFn => {
            this._endpoints.update.updateCampaignRetrieve(campaignId, resultsFn);
        }, (data, done) => {
            done(null, CampaignAdapter.map(data, this));
        }, callback);
    }

    /**
     * Add an update campaign
     *
     * Example:
     * ```JavaScript
     * update.addCampaign({
     *     name: 'testCampaign',
     *     deviceFilter: {
     *         state: { $eq: "bootstrapped" },
     *         createdAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *         updatedAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *         customAttributes: {
     *             attr1: { $eq: "custom_value_1" },
     *             attr2: { $eq: "custom_value_1" },
     *         }
     *     }
     * })
     * .then(campaign => {
     *     // Utilize campaign here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param campaign The campaign to add
     * @returns Promise containing update campaign
     */
    public addCampaign(campaign: AddCampaignObject): Promise<Campaign>;
    /**
     * Add an update campaign
     *
     * Example:
     * ```JavaScript
     * update.addCampaign({
     *     name: 'testCampaign',
     *     deviceFilter: {
     *         state: { $eq: "bootstrapped" },
     *         createdAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *         updatedAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *         customAttributes: {
     *             attr1: { $eq: "custom_value_1" },
     *             attr2: { $eq: "custom_value_1" },
     *         }
     *     }
     * }, function(error, campaign) {
     *     if (error) throw error;
     *     // Utilize campaign here
     * });
     * ```
     *
     * @param campaign The campaign to add
     * @param callback A function that is passed the return arguments (error, update campaign)
     */
    public addCampaign(campaign: AddCampaignObject, callback: CallbackFn<Campaign>): void;
    public addCampaign(campaign: AddCampaignObject, callback?: CallbackFn<Campaign>): Promise<Campaign> {
        return apiWrapper( resultsFn => {
            this._endpoints.update.updateCampaignCreate(CampaignAdapter.addMap(campaign), resultsFn);
        }, (data, done) => {
            done(null, CampaignAdapter.map(data, this));
        }, callback);
    }

    /**
     * Update an update campaign
     *
     * Example:
     * ```JavaScript
     * update.updateCampaign({
     *     name: 'testCampaign',
     *     id: '015baf607c250000000000010010003d',
     *     deviceFilter: {
     *         state: { $eq: "bootstrapped" },
     *         createdAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *         updatedAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *         customAttributes: {
     *             attr1: { $eq: "custom_value_1" },
     *             attr2: { $eq: "custom_value_1" },
     *         }
     *     }
     * })
     * .then(campaign => {
     *     // Utilize campaign here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param campaign The campaign to update
     * @returns Promise of campaign
     */
    public updateCampaign(campaign: UpdateCampaignObject): Promise<Campaign>;
    /**
     * Update an update campaign
     *
     * Example:
     * ```JavaScript
     * update.updateCampaign({
     *     name: 'testCampaign',
     *     id: '015baf607c250000000000010010003d',
     *     deviceFilter: {
     *         state: { $eq: "bootstrapped" },
     *         createdAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *         updatedAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *         customAttributes: {
     *             attr1: { $eq: "custom_value_1" },
     *             attr2: { $eq: "custom_value_1" },
     *         }
     *     }
     * }, function(error, campaign) {
     *     if (error) throw error;
     *     // Utilize campaign here
     * });
     * ```
     *
     * @param campaign The campaign to update
     * @param callback A function that is passed the arguments (error, campaign)
     */
    public updateCampaign(campaign: UpdateCampaignObject, callback: CallbackFn<Campaign>): void;
    public updateCampaign(campaign: UpdateCampaignObject, callback?: CallbackFn<Campaign>): Promise<Campaign> {
        return apiWrapper( resultsFn => {
            this._endpoints.update.updateCampaignUpdate(campaign.id, CampaignAdapter.updateMap(campaign), resultsFn);
        }, (data, done) => {
            const response = CampaignAdapter.map(data, this);
            done(null, response);
        }, callback);
    }

    /**
     * Delete an update campaign
     *
     * Example:
     * ```JavaScript
     * update.deleteCampaign('015baf607c250000000000010010003d')
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param campaignId The ID of the update campaign to delete
     * @returns Promise containing any error
     */
    public deleteCampaign(campaignId: string): Promise<void>;
    /**
     * Delete an update campaign
     *
     * Example:
     * ```JavaScript
     * update.deleteCampaign('015baf607c250000000000010010003d', function(error) {
     *     if (error) throw error;
     * });
     * ```
     *
     * @param campaignId The ID of the update campaign to delete
     * @param callback A function that is passed the return arguments (error, void)
     */
    public deleteCampaign(campaignId: string, callback: CallbackFn<void>): void;
    public deleteCampaign(campaignId: string, callback?: CallbackFn<void>): Promise<void> {
        return apiWrapper( resultsFn => {
            this._endpoints.update.updateCampaignDestroy(campaignId, resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
    }

    /**
     * Start an update campaign
     *
     * Example:
     * ```JavaScript
     * update.startCampaign('015baf607c250000000000010010003d')
     * .then(data => {
     *     // Utilize data here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param campaignId The ID of the update campaign
     * @returns Promise containing campaign
     */
    public startCampaign(campaignId: string): Promise<Campaign>;
    /**
     * Start an update campaign
     *
     * Example:
     * ```JavaScript
     * update.startCampaign('015baf607c250000000000010010003d', function(error, data) {
     *     if (error) throw error;
     *     // Utilize data here
     * });
     * ```
     *
     * @param campaignId The ID of the update campaign
     * @param callback A function that is passed the return arguments (error, campaign)
     */
    public startCampaign(campaignId: string, callback: CallbackFn<Campaign>): void;
    public startCampaign(campaignId: string, callback?: CallbackFn<Campaign>): Promise<Campaign> {
        return apiWrapper( resultsFn => {
            this.updateCampaign({
                id: campaignId,
                state: "scheduled",
            }, resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
    }

    /**
     * Stop an update campaign
     *
     * Example:
     * ```JavaScript
     * update.stopCampaign('015baf607c250000000000010010003d')
     * .then(data => {
     *     // Utilize data here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param campaignId The ID of the update campaign
     * @returns Promise containing campaign
     */
    public stopCampaign(campaignId: string): Promise<Campaign>;
    /**
     * Stop an update campaign
     *
     * Example:
     * ```JavaScript
     * update.stopCampaign('015baf607c250000000000010010003d', function(error, data) {
     *     if (error) throw error;
     *     // Utilize data here
     * });
     * ```
     *
     * @param campaignId The ID of the update campaign
     * @param callback A function that is passed the return arguments (error, campaign)
     */
    public stopCampaign(campaignId: string, callback: CallbackFn<Campaign>): void;
    public stopCampaign(campaignId: string, callback?: CallbackFn<Campaign>): Promise<Campaign> {
        return apiWrapper( resultsFn => {
            this.updateCampaign({
                id: campaignId,
                state: "draft",
            }, resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
    }

    /**
     * List campaign device states
     *
     * Example:
     * ```JavaScript
     * update.listCampaignDeviceStates('015baf607c250000000000010010003d', {
     *     limit: 5,
     * })
     * .then(devicestates => {
     *     // Utilize devicestates here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param campaignId The ID of the update campaign
     * @param options list options
     * @returns Promise of listResponse
     */
    public listCampaignDeviceStates(campaignId: string, options?: ListOptions): Promise<ListResponse<CampaignDeviceState>>;
    /**
     * List campaign device states
     *
     * Example:
     * ```JavaScript
     * update.listCampaignDeviceStates('015baf607c250000000000010010003d', {
     *     limit: 5,
     * }, function(error, devicestates) {
     *     if (error) throw error;
     *     // Utilize devicestates here
     * });
     * ```
     *
     * @param campaignId The ID of the update campaign
     * @param options list options
     * @param callback A function that is passed the return arguments (error, listResponse)
     */
    public listCampaignDeviceStates(campaignId: string, options?: ListOptions, callback?: CallbackFn<ListResponse<CampaignDeviceState>>): void;
    public listCampaignDeviceStates(campaignId: string, options?: ListOptions, callback?: CallbackFn<ListResponse<CampaignDeviceState>>): Promise<ListResponse<CampaignDeviceState>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        return apiWrapper( resultsFn => {
            const { limit, order, after, include } = options;
            this._endpoints.update.updateCampaignMetadataList(campaignId, limit, order, after, encodeInclude(include), resultsFn);
        }, (data, done) => {
            let list: Array<CampaignDeviceState>;
            if (data.data && data.data.length) {
                list = data.data.map( state => {
                    return CampaignDeviceStateAdapter.map(state);
                });
            }

            done(null, new ListResponse(data, list));
        }, callback);
    }

    /**
     * Get meta data for the last Pelion Device Management API call
     * @returns Promise of meta data
     */
    public getLastApiMetadata(): Promise<ApiMetadata>;
    /**
     * Get meta data for the last Pelion Device Management API call
     * @param callback A function that is passed the arguments (error, meta data)
     */
    public getLastApiMetadata(callback: CallbackFn<ApiMetadata>): void;
    public getLastApiMetadata(callback?: CallbackFn<ApiMetadata>): Promise<ApiMetadata> {
        return asyncStyle( done => {
            done(null, this._endpoints.getLastMeta());
        }, callback);
    }
}
