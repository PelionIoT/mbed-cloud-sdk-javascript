import { ConnectionOptions, CallbackFn, ListOptions } from "../common/interfaces";
import { ListResponse } from "../common/listResponse";
import { AddFirmwareImageObject, AddFirmwareManifestObject, AddCampaignObject, UpdateCampaignObject, FirmwareImageListOptions, FirmwareManifestListOptions, CampaignListOptions } from "./types";
import { FirmwareImage } from "./models/firmwareImage";
import { FirmwareManifest } from "./models/firmwareManifest";
import { Campaign } from "./models/campaign";
import { CampaignDeviceState } from "./models/campaignDeviceState";
import { ApiMetadata } from "../common/apiMetadata";
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
export declare class UpdateApi {
    private _endpoints;
    /**
     * @param options connection options
     */
    constructor(options: ConnectionOptions);
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
    listFirmwareImages(options?: FirmwareImageListOptions): Promise<ListResponse<FirmwareImage>>;
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
    listFirmwareImages(options?: FirmwareImageListOptions, callback?: CallbackFn<ListResponse<FirmwareImage>>): void;
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
    getFirmwareImage(firmwareImageId: string): Promise<FirmwareImage>;
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
    getFirmwareImage(firmwareImageId: string, callback: CallbackFn<FirmwareImage>): void;
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
    addFirmwareImage(image: AddFirmwareImageObject): Promise<FirmwareImage>;
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
    addFirmwareImage(image: AddFirmwareImageObject, callback: CallbackFn<FirmwareImage>): void;
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
    deleteFirmwareImage(firmwareImageId: string): Promise<void>;
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
    deleteFirmwareImage(firmwareImageId: string, callback: CallbackFn<void>): void;
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
    listFirmwareManifests(options?: FirmwareManifestListOptions): Promise<ListResponse<FirmwareManifest>>;
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
    listFirmwareManifests(options?: FirmwareManifestListOptions, callback?: CallbackFn<ListResponse<FirmwareManifest>>): void;
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
    getFirmwareManifest(firmwareManifestId: string): Promise<FirmwareManifest>;
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
    getFirmwareManifest(firmwareManifestId: string, callback: CallbackFn<FirmwareManifest>): void;
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
    addFirmwareManifest(manifest: AddFirmwareManifestObject): Promise<FirmwareManifest>;
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
    addFirmwareManifest(manifest: AddFirmwareManifestObject, callback: CallbackFn<FirmwareManifest>): void;
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
    deleteFirmwareManifest(firmwareManifestId: string): Promise<void>;
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
    deleteFirmwareManifest(firmwareManifestId: string, callback: CallbackFn<void>): void;
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
    listCampaigns(options?: CampaignListOptions): Promise<ListResponse<Campaign>>;
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
    listCampaigns(options?: CampaignListOptions, callback?: CallbackFn<ListResponse<Campaign>>): void;
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
    getCampaign(campaignId: string): Promise<Campaign>;
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
    getCampaign(campaignId: string, callback: CallbackFn<Campaign>): void;
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
    addCampaign(campaign: AddCampaignObject): Promise<Campaign>;
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
    addCampaign(campaign: AddCampaignObject, callback: CallbackFn<Campaign>): void;
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
    updateCampaign(campaign: UpdateCampaignObject): Promise<Campaign>;
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
    updateCampaign(campaign: UpdateCampaignObject, callback: CallbackFn<Campaign>): void;
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
    deleteCampaign(campaignId: string): Promise<void>;
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
    deleteCampaign(campaignId: string, callback: CallbackFn<void>): void;
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
    startCampaign(campaignId: string): Promise<Campaign>;
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
    startCampaign(campaignId: string, callback: CallbackFn<Campaign>): void;
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
    stopCampaign(campaignId: string): Promise<Campaign>;
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
    stopCampaign(campaignId: string, callback: CallbackFn<Campaign>): void;
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
    listCampaignDeviceStates(campaignId: string, options?: ListOptions): Promise<ListResponse<CampaignDeviceState>>;
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
    listCampaignDeviceStates(campaignId: string, options?: ListOptions, callback?: CallbackFn<ListResponse<CampaignDeviceState>>): void;
    /**
     * Get meta data for the last Pelion Device Management API call
     * @returns Promise of meta data
     */
    getLastApiMetadata(): Promise<ApiMetadata>;
    /**
     * Get meta data for the last Pelion Device Management API call
     * @param callback A function that is passed the arguments (error, meta data)
     */
    getLastApiMetadata(callback: CallbackFn<ApiMetadata>): void;
}
