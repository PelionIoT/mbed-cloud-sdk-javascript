import { ConnectionOptions, ListOptions, ListResponse } from "../common/interfaces";
import { CampaignStateEnum } from "./types";
import { FirmwareImage } from "./firmwareImage";
import { FirmwareManifest } from "./firmwareManifest";
import { Campaign } from "./campaign";
import { CampaignState } from "./campaignState";
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
export declare class UpdateApi {
    private _endpoints;
    /**
    * @param options connection options
    */
    constructor(options: ConnectionOptions);
    /**
     * List firmware images
     * @param options list options
     * @returns Promise of listResponse
     */
    listFirmwareImages(options?: ListOptions): Promise<ListResponse<FirmwareImage>>;
    /**
     * List firmware images
     * @param options list options
     * @param callback A function that is passed the return arguments (error, listResponse)
     */
    listFirmwareImages(options?: ListOptions, callback?: (err: any, data?: ListResponse<FirmwareImage>) => any): any;
    /**
     * Get details of a firmware image
     * @param options.id The firmware image ID
     * @returns Promise containing the firmware image
     */
    getFirmwareImage(options: {
        id: number;
    }): Promise<FirmwareImage>;
    /**
     * Get details of a firmware image
     * @param options.id The firmware image ID
     * @param callback A function that is passed the return arguments (error, firmware image)
     */
    getFirmwareImage(options: {
        id: number;
    }, callback: (err: any, data?: FirmwareImage) => any): any;
    /**
     * Adds a firmware image
     * @param options.data The binary data
     * @param options.name The display name for the firmware image
     * @param options.description The description of the firmware image
     * @returns Promise containing firmware image
     */
    addFirmwareImage(options: {
        data: string;
        name: string;
        description?: string;
    }): Promise<FirmwareImage>;
    /**
     * Adds a firmware image
     * @param options.data The binary data
     * @param options.name The display name for the firmware image
     * @param options.description The description of the firmware image
     * @param callback A function that is passed the return arguments (error, firmware image)
     */
    addFirmwareImage(options: {
        data: string;
        name: string;
        description?: string;
    }, callback: (err: any, data?: FirmwareImage) => any): any;
    /**
     * Deletes a firmware image
     * @param options.id The ID of the firmware image to delete
     * @returns Promise containing any error
     */
    deleteFirmwareImage(options: {
        id: number;
    }): Promise<void>;
    /**
     * Deletes a firmware image
     * @param options.id The ID of the firmware image to delete
     * @param callback A function that is passed the return arguments (error, void)
     */
    deleteFirmwareImage(options: {
        id: number;
    }, callback: (err: any, data?: void) => any): any;
    /**
     * List firmware manifests
     * @param options list options
     * @returns Promise of listResponse
     */
    listFirmwareManifests(options?: ListOptions): Promise<ListResponse<FirmwareManifest>>;
    /**
     * List manifests
     * @param options list options
     * @param callback A function that is passed the return arguments (error, listResponse)
     */
    listFirmwareManifests(options?: ListOptions, callback?: (err: any, data?: ListResponse<FirmwareManifest>) => any): any;
    /**
     * Get details of a firmware manifest
     * @param options.id The firmware manifest ID
     * @returns Promise containing the firmware manifest
     */
    getFirmwareManifest(options: {
        id: number;
    }): Promise<FirmwareManifest>;
    /**
     * Get details of a firmware manifest
     * @param options.id The firmware manifest ID
     * @param callback A function that is passed the return arguments (error, firmware manifest)
     */
    getFirmwareManifest(options: {
        id: number;
    }, callback: (err: any, data?: FirmwareManifest) => any): any;
    /**
     * Adds a firmware manifest
     * @param options.data The manifest file to create
     * @param options.name The display name for the firmware manifest
     * @param options.description The description of the firmware manifest
     * @returns Promise containing firmware manifest
     */
    addFirmwareManifest(options: {
        data: string;
        name: string;
        description?: string;
    }): Promise<FirmwareManifest>;
    /**
     * Adds a firmware manifest
     * @param options.data The manifest file to create
     * @param options.name The display name for the firmware manifest
     * @param options.description The description of the firmware manifest
     * @param callback A function that is passed the return arguments (error, firmware manifest)
     */
    addFirmwareManifest(options: {
        data: string;
        name: string;
        description?: string;
    }, callback: (err: any, data?: FirmwareManifest) => any): any;
    /**
     * Deletes a firmware manifest
     * @param options.id The ID of the firmware manifest to delete
     * @returns Promise containing any error
     */
    deleteFirmwareManifest(options: {
        id: number;
    }): Promise<void>;
    /**
     * Deletes a firmware manifest
     * @param options.id The ID of the firmware manifest to delete
     * @param callback A function that is passed the return arguments (error, void)
     */
    deleteFirmwareManifest(options: {
        id: number;
    }, callback: (err: any, data?: void) => any): any;
    /**
     * List update campaigns
     * @param options list options
     * @returns Promise of listResponse
     */
    listCampaigns(options?: ListOptions): Promise<ListResponse<Campaign>>;
    /**
     * List update campaigns
     * @param options list options
     * @param callback A function that is passed the return arguments (error, listResponse)
     */
    listCampaigns(options?: ListOptions, callback?: (err: any, data?: ListResponse<Campaign>) => any): any;
    /**
     * Get details of an update campaign
     * @param options.id The update campaign ID
     * @returns Promise containing the update campaign
     */
    getCampaign(options: {
        id: string;
    }): Promise<Campaign>;
    /**
     * Get details of an update campaign
     * @param options.id The update campaign ID
     * @param callback A function that is passed the return arguments (error, update campaign)
     */
    getCampaign(options: {
        id: string;
    }, callback: (err: any, data?: Campaign) => any): any;
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
    addCampaign(options: {
        name: string;
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
     * Adds an update campaign
     * @param options.name A name for the campaign
     * @param options.description A description of the campaign
     * @param options.manifestId
     * @param options.attributes The attributes of the device filter
     * @param options.customAttributes The custom attributes of the device filter
     * @param options.start The timestamp at which update campaign scheduled to start
     * @param callback A function that is passed the return arguments (error, update campaign)
     */
    addCampaign(options: {
        name: string;
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
    updateCampaign(options: {
        id: string;
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
    updateCampaign(options: {
        id: string;
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
     * Deletes an update campaign
     * @param options.id The ID of the update campaign to delete
     * @returns Promise containing any error
     */
    deleteCampaign(options: {
        id: string;
    }): Promise<void>;
    /**
     * Deletes an update campaign
     * @param options.id The ID of the update campaign to delete
     * @param callback A function that is passed the return arguments (error, void)
     */
    deleteCampaign(options: {
        id: string;
    }, callback: (err: any, data?: void) => any): any;
    /**
     * Gets update campaign status
     * @param options.id The ID of the update campaign
     * @returns Promise containing campaign status
     */
    getCampaignStatus(options: {
        id: string;
    }): Promise<CampaignState>;
    /**
     * Gets update campaign status
     * @param options.id The ID of the update campaign
     * @param callback A function that is passed the return arguments (error, campaign status)
     */
    getCampaignStatus(options: {
        id: string;
    }, callback: (err: any, data?: CampaignState) => any): any;
    /**
     * Start an update campaign
     * @param options.id The ID of the update campaign
     * @param options.name The name of the update campaign
     * @returns Promise containing campaign
     */
    startCampaign(options: {
        id: string;
        name: string;
    }): Promise<Campaign>;
    /**
     * Start an update campaign
     * @param options.id The ID of the update campaign
     * @param options.name The name of the update campaign
     * @param callback A function that is passed the return arguments (error, campaign)
     */
    startCampaign(options: {
        id: string;
        name: string;
    }, callback?: (err: any, data?: Campaign) => any): any;
    /**
     * Stop an update campaign
     * @param options.id The ID of the update campaign
     * @param options.name The name of the update campaign
     * @returns Promise containing campaign
     */
    stopCampaign(options: {
        id: string;
        name: string;
    }): Promise<Campaign>;
    /**
     * Stop an update campaign
     * @param options.id The ID of the update campaign
     * @param options.name The name of the update campaign
     * @param callback A function that is passed the return arguments (error, campaign)
     */
    stopCampaign(options: {
        id: string;
        name: string;
    }, callback?: (err: any, data?: Campaign) => any): any;
}
