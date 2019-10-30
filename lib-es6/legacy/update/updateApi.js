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
import { ListResponse } from "../common/listResponse";
import { FirmwareImageAdapter } from "./models/firmwareImageAdapter";
import { FirmwareManifestAdapter } from "./models/firmwareManifestAdapter";
import { CampaignAdapter } from "./models/campaignAdapter";
import { CampaignDeviceStateAdapter } from "./models/campaignDeviceStateAdapter";
import { Endpoints } from "./endpoints";
import { Filters } from "./filters";
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
    /**
     * @param options connection options
     */
    constructor(options) {
        this._endpoints = new Endpoints(options);
    }
    listFirmwareImages(options, callback) {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return apiWrapper(resultsFn => {
            const { limit, order, after, include, filter } = options;
            this._endpoints.update.firmwareImageList(limit, order, after, encodeFilter(filter, Filters.EMPTY_FILTER_MAP), encodeInclude(include), resultsFn);
        }, (data, done) => {
            let list;
            if (data.data && data.data.length) {
                list = data.data.map(image => {
                    return FirmwareImageAdapter.map(image, this);
                });
            }
            done(null, new ListResponse(data, list));
        }, callback);
    }
    getFirmwareImage(firmwareImageId, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.update.firmwareImageRetrieve(firmwareImageId, resultsFn);
        }, (data, done) => {
            done(null, FirmwareImageAdapter.map(data, this));
        }, callback);
    }
    addFirmwareImage(image, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.update.firmwareImageCreate(image.dataFile, image.name, image.description, resultsFn);
        }, (data, done) => {
            done(null, FirmwareImageAdapter.map(data, this));
        }, callback);
    }
    deleteFirmwareImage(firmwareImageId, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.update.firmwareImageDestroy(firmwareImageId, resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
    }
    listFirmwareManifests(options, callback) {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return apiWrapper(resultsFn => {
            const { limit, order, after, include, filter } = options;
            this._endpoints.update.firmwareManifestList(limit, order, after, encodeFilter(filter, Filters.EMPTY_FILTER_MAP), encodeInclude(include), resultsFn);
        }, (data, done) => {
            let list;
            if (data.data && data.data.length) {
                list = data.data.map(log => {
                    return FirmwareManifestAdapter.map(log, this);
                });
            }
            done(null, new ListResponse(data, list));
        }, callback);
    }
    getFirmwareManifest(firmwareManifestId, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.update.firmwareManifestRetrieve(firmwareManifestId, resultsFn);
        }, (data, done) => {
            done(null, FirmwareManifestAdapter.map(data, this));
        }, callback);
    }
    addFirmwareManifest(manifest, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.update.firmwareManifestCreate(manifest.dataFile, manifest.name, manifest.description, manifest.keyTableFile, resultsFn);
        }, (data, done) => {
            done(null, FirmwareManifestAdapter.map(data, this));
        }, callback);
    }
    deleteFirmwareManifest(firmwareManifestId, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.update.firmwareManifestDestroy(firmwareManifestId, resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
    }
    listCampaigns(options, callback) {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return apiWrapper(resultsFn => {
            const { limit, order, after, include, filter } = options;
            this._endpoints.update.updateCampaignList(limit, order, after, encodeFilter(filter, Filters.CAMPAIGN_FILTER_MAP), encodeInclude(include), resultsFn);
        }, (data, done) => {
            let list;
            if (data.data && data.data.length) {
                list = data.data.map(log => {
                    return CampaignAdapter.map(log, this);
                });
            }
            done(null, new ListResponse(data, list));
        }, callback);
    }
    getCampaign(campaignId, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.update.updateCampaignRetrieve(campaignId, resultsFn);
        }, (data, done) => {
            done(null, CampaignAdapter.map(data, this));
        }, callback);
    }
    addCampaign(campaign, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.update.updateCampaignCreate(CampaignAdapter.addMap(campaign), resultsFn);
        }, (data, done) => {
            done(null, CampaignAdapter.map(data, this));
        }, callback);
    }
    updateCampaign(campaign, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.update.updateCampaignUpdate(campaign.id, CampaignAdapter.updateMap(campaign), resultsFn);
        }, (data, done) => {
            const response = CampaignAdapter.map(data, this);
            done(null, response);
        }, callback);
    }
    deleteCampaign(campaignId, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.update.updateCampaignDestroy(campaignId, resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
    }
    startCampaign(campaignId, callback) {
        return apiWrapper(resultsFn => {
            this.updateCampaign({
                id: campaignId,
                state: "scheduled",
            }, resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
    }
    stopCampaign(campaignId, callback) {
        return apiWrapper(resultsFn => {
            this.updateCampaign({
                id: campaignId,
                state: "draft",
            }, resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
    }
    listCampaignDeviceStates(campaignId, options, callback) {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return apiWrapper(resultsFn => {
            const { limit, order, after, include } = options;
            this._endpoints.update.updateCampaignMetadataList(campaignId, limit, order, after, encodeInclude(include), resultsFn);
        }, (data, done) => {
            let list;
            if (data.data && data.data.length) {
                list = data.data.map(state => {
                    return CampaignDeviceStateAdapter.map(state);
                });
            }
            done(null, new ListResponse(data, list));
        }, callback);
    }
    getLastApiMetadata(callback) {
        return asyncStyle(done => {
            done(null, this._endpoints.getLastMeta());
        }, callback);
    }
}
//# sourceMappingURL=updateApi.js.map