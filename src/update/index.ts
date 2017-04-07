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
import { ConnectionOptions, ListOptions, ListResponse, CallbackFn } from "../common/interfaces";
import { AddFirmwareImageObject, AddFirmwareManifestObject, AddCampaignObject, UpdateCampaignObject } from "./types";
import { Endpoints } from "./endpoints";
import { FirmwareImage } from "./models/firmwareImage";
import { FirmwareImageAdapter } from "./models/firmwareImageAdapter";
import { FirmwareManifest } from "./models/firmwareManifest";
import { FirmwareManifestAdapter } from "./models/firmwareManifestAdapter";
import { Campaign } from "./models/campaign";
import { CampaignAdapter } from "./models/campaignAdapter";

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
    public listFirmwareImages(options?: ListOptions): Promise<ListResponse<FirmwareImage>>;
    /**
     * List firmware images
     * @param options list options
     * @param callback A function that is passed the return arguments (error, listResponse)
     */
    public listFirmwareImages(options?: ListOptions, callback?: CallbackFn<ListResponse<FirmwareImage>>);
    public listFirmwareImages(options?: any, callback?: CallbackFn<ListResponse<FirmwareImage>>): Promise<ListResponse<FirmwareImage>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { limit, order, after, include } = options as ListOptions;
        let filter = encodeAttributes(options);
        return asyncStyle(done => {
            this._endpoints.firmware.firmwareImageList(limit, order, after, filter, encodeInclude(include),
                null, null, null, null, null, null, null, null, null, null,
                null, null, null, (error, data) => {
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
     * @param id The firmware image ID
     * @returns Promise containing the firmware image
     */
    public getFirmwareImage(id: number): Promise<FirmwareImage>;
    /**
     * Get details of a firmware image
     * @param id The firmware image ID
     * @param callback A function that is passed the return arguments (error, firmware image)
     */
    public getFirmwareImage(id: number, callback: CallbackFn<FirmwareImage>);
    public getFirmwareImage(id: number, callback?: CallbackFn<FirmwareImage>): Promise<FirmwareImage> {
        return asyncStyle(done => {
            this._endpoints.firmware.firmwareImageRetrieve(id, (error, data) => {
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
    public addFirmwareImage(image: AddFirmwareImageObject, callback: CallbackFn<FirmwareImage>);
    public addFirmwareImage(image: AddFirmwareImageObject, callback?: CallbackFn<FirmwareImage>): Promise<FirmwareImage> {
        return asyncStyle(done => {
            this._endpoints.firmware.firmwareImageCreate(image.datafile, image.name, image.description, (error, data) => {
                if (error) return done(error);
                done(null, FirmwareImageAdapter.map(data, this));
            });
        }, callback);
    }

    /**
     * Deletes a firmware image
     * @param id The ID of the firmware image to delete
     * @returns Promise containing any error
     */
    public deleteFirmwareImage(id: number): Promise<void>;
    /**
     * Deletes a firmware image
     * @param id The ID of the firmware image to delete
     * @param callback A function that is passed the return arguments (error, void)
     */
    public deleteFirmwareImage(id: number, callback: CallbackFn<void>);
    public deleteFirmwareImage(id: number, callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._endpoints.firmware.firmwareImageDestroy(id, (error) => {
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
    public listFirmwareManifests(options?: ListOptions, callback?: CallbackFn<ListResponse<FirmwareManifest>>);
    public listFirmwareManifests(options?: any, callback?: CallbackFn<ListResponse<FirmwareManifest>>): Promise<ListResponse<FirmwareManifest>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { limit, order, after, include } = options as ListOptions;
        let filter = encodeAttributes(options);
        return asyncStyle(done => {
            this._endpoints.firmware.firmwareManifestList(limit, order, after, filter, encodeInclude(include),
                null, null, null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null, null, (error, data) => {
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
     * @param id The firmware manifest ID
     * @returns Promise containing the firmware manifest
     */
    public getFirmwareManifest(id: number): Promise<FirmwareManifest>;
    /**
     * Get details of a firmware manifest
     * @param id The firmware manifest ID
     * @param callback A function that is passed the return arguments (error, firmware manifest)
     */
    public getFirmwareManifest(id: number, callback: CallbackFn<FirmwareManifest>);
    public getFirmwareManifest(id: number, callback?: CallbackFn<FirmwareManifest>): Promise<FirmwareManifest> {
        return asyncStyle(done => {
            this._endpoints.firmware.firmwareManifestRetrieve(id, (error, data) => {
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
    public addFirmwareManifest(manifest: AddFirmwareManifestObject, callback: CallbackFn<FirmwareManifest>);
    public addFirmwareManifest(manifest: AddFirmwareManifestObject, callback?: CallbackFn<FirmwareManifest>): Promise<FirmwareManifest> {
        return asyncStyle(done => {
            this._endpoints.firmware.firmwareManifestCreate(manifest.datafile, manifest.name, manifest.description, (error, data) => {
                if (error) return done(error);
                done(null, FirmwareManifestAdapter.map(data, this));
            });
        }, callback);
    }

    /**
     * Deletes a firmware manifest
     * @param id The ID of the firmware manifest to delete
     * @returns Promise containing any error
     */
    public deleteFirmwareManifest(id: number): Promise<void>;
    /**
     * Deletes a firmware manifest
     * @param id The ID of the firmware manifest to delete
     * @param callback A function that is passed the return arguments (error, void)
     */
    public deleteFirmwareManifest(id: number, callback: CallbackFn<void>);
    public deleteFirmwareManifest(id: number, callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._endpoints.firmware.firmwareManifestDestroy(id, (error) => {
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
    public listCampaigns(options?: ListOptions, callback?: CallbackFn<ListResponse<Campaign>>);
    public listCampaigns(options?: any, callback?: CallbackFn<ListResponse<Campaign>>): Promise<ListResponse<Campaign>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        let { limit, order, after, include } = options as ListOptions;
        let filter = encodeAttributes(options);
        return asyncStyle(done => {
            this._endpoints.deployment.updateCampaignList(limit, order, after, filter, encodeInclude(include),
                null, null, null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null, null, null,
                null, null, null, (error, data) => {
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
     * @param id The update campaign ID
     * @returns Promise containing the update campaign
     */
    public getCampaign(id: string): Promise<Campaign>;
    /**
     * Get details of an update campaign
     * @param id The update campaign ID
     * @param callback A function that is passed the return arguments (error, update campaign)
     */
    public getCampaign(id: string, callback: CallbackFn<Campaign>);
    public getCampaign(id: string, callback?: CallbackFn<Campaign>): Promise<Campaign> {
        return asyncStyle(done => {
            this._endpoints.deployment.updateCampaignRetrieve(id, (error, data) => {
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
    public addCampaign(campaign: AddCampaignObject, callback: CallbackFn<Campaign>);
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
    public updateCampaign(campaign: UpdateCampaignObject, callback: CallbackFn<Campaign>);
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
     * @param id The ID of the update campaign to delete
     * @returns Promise containing any error
     */
    public deleteCampaign(id: string): Promise<void>;
    /**
     * Deletes an update campaign
     * @param id The ID of the update campaign to delete
     * @param callback A function that is passed the return arguments (error, void)
     */
    public deleteCampaign(id: string, callback: CallbackFn<void>);
    public deleteCampaign(id: string, callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._endpoints.deployment.updateCampaignDestroy(id, (error) => {
                if (error) return done(error);
                done(null, null);
            });
        }, callback);
    }

    /**
     * Start an update campaign
     * @param id The ID of the update campaign
     * @returns Promise containing campaign
     */
    public startCampaign(id: string): Promise<Campaign>;
    /**
     * Start an update campaign
     * @param id The ID of the update campaign
     * @param callback A function that is passed the return arguments (error, campaign)
     */
    public startCampaign(id: string, callback: CallbackFn<Campaign>);
    public startCampaign(id: string, callback?: CallbackFn<Campaign>): Promise<Campaign> {
        return asyncStyle(done => {
            this.updateCampaign({
                id: id,
                state: "scheduled"
            }, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }

    /**
     * Stop an update campaign
     * @param id The ID of the update campaign
     * @returns Promise containing campaign
     */
    public stopCampaign(id: string): Promise<Campaign>;
    /**
     * Stop an update campaign
     * @param id The ID of the update campaign
     * @param callback A function that is passed the return arguments (error, campaign)
     */
    public stopCampaign(id: string, callback: CallbackFn<Campaign>);
    public stopCampaign(id: string, callback?: CallbackFn<Campaign>): Promise<Campaign> {
        return asyncStyle(done => {
            this.updateCampaign({
                id: id,
                state: "draft"
            }, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }
}
