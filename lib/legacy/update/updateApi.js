"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("../common/functions");
var listResponse_1 = require("../common/listResponse");
var firmwareImageAdapter_1 = require("./models/firmwareImageAdapter");
var firmwareManifestAdapter_1 = require("./models/firmwareManifestAdapter");
var campaignAdapter_1 = require("./models/campaignAdapter");
var campaignDeviceStateAdapter_1 = require("./models/campaignDeviceStateAdapter");
var endpoints_1 = require("./endpoints");
var filters_1 = require("./filters");
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
var UpdateApi = /** @class */ (function () {
    /**
     * @param options connection options
     */
    function UpdateApi(options) {
        this._endpoints = new endpoints_1.Endpoints(options);
    }
    UpdateApi.prototype.listFirmwareImages = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return functions_1.apiWrapper(function (resultsFn) {
            var _a = options, limit = _a.limit, order = _a.order, after = _a.after, include = _a.include, filter = _a.filter;
            _this._endpoints.update.firmwareImageList(limit, order, after, functions_1.encodeFilter(filter, filters_1.Filters.EMPTY_FILTER_MAP), functions_1.encodeInclude(include), resultsFn);
        }, function (data, done) {
            var list;
            if (data.data && data.data.length) {
                list = data.data.map(function (image) {
                    return firmwareImageAdapter_1.FirmwareImageAdapter.map(image, _this);
                });
            }
            done(null, new listResponse_1.ListResponse(data, list));
        }, callback);
    };
    UpdateApi.prototype.getFirmwareImage = function (firmwareImageId, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.update.firmwareImageRetrieve(firmwareImageId, resultsFn);
        }, function (data, done) {
            done(null, firmwareImageAdapter_1.FirmwareImageAdapter.map(data, _this));
        }, callback);
    };
    UpdateApi.prototype.addFirmwareImage = function (image, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.update.firmwareImageCreate(image.dataFile, image.name, image.description, resultsFn);
        }, function (data, done) {
            done(null, firmwareImageAdapter_1.FirmwareImageAdapter.map(data, _this));
        }, callback);
    };
    UpdateApi.prototype.deleteFirmwareImage = function (firmwareImageId, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.update.firmwareImageDestroy(firmwareImageId, resultsFn);
        }, function (data, done) {
            done(null, data);
        }, callback);
    };
    UpdateApi.prototype.listFirmwareManifests = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return functions_1.apiWrapper(function (resultsFn) {
            var _a = options, limit = _a.limit, order = _a.order, after = _a.after, include = _a.include, filter = _a.filter;
            _this._endpoints.update.firmwareManifestList(limit, order, after, functions_1.encodeFilter(filter, filters_1.Filters.EMPTY_FILTER_MAP), functions_1.encodeInclude(include), resultsFn);
        }, function (data, done) {
            var list;
            if (data.data && data.data.length) {
                list = data.data.map(function (log) {
                    return firmwareManifestAdapter_1.FirmwareManifestAdapter.map(log, _this);
                });
            }
            done(null, new listResponse_1.ListResponse(data, list));
        }, callback);
    };
    UpdateApi.prototype.getFirmwareManifest = function (firmwareManifestId, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.update.firmwareManifestRetrieve(firmwareManifestId, resultsFn);
        }, function (data, done) {
            done(null, firmwareManifestAdapter_1.FirmwareManifestAdapter.map(data, _this));
        }, callback);
    };
    UpdateApi.prototype.addFirmwareManifest = function (manifest, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.update.firmwareManifestCreate(manifest.dataFile, manifest.name, manifest.description, manifest.keyTableFile, resultsFn);
        }, function (data, done) {
            done(null, firmwareManifestAdapter_1.FirmwareManifestAdapter.map(data, _this));
        }, callback);
    };
    UpdateApi.prototype.deleteFirmwareManifest = function (firmwareManifestId, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.update.firmwareManifestDestroy(firmwareManifestId, resultsFn);
        }, function (data, done) {
            done(null, data);
        }, callback);
    };
    UpdateApi.prototype.listCampaigns = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return functions_1.apiWrapper(function (resultsFn) {
            var _a = options, limit = _a.limit, order = _a.order, after = _a.after, include = _a.include, filter = _a.filter;
            _this._endpoints.update.updateCampaignList(limit, order, after, functions_1.encodeFilter(filter, filters_1.Filters.CAMPAIGN_FILTER_MAP), functions_1.encodeInclude(include), resultsFn);
        }, function (data, done) {
            var list;
            if (data.data && data.data.length) {
                list = data.data.map(function (log) {
                    return campaignAdapter_1.CampaignAdapter.map(log, _this);
                });
            }
            done(null, new listResponse_1.ListResponse(data, list));
        }, callback);
    };
    UpdateApi.prototype.getCampaign = function (campaignId, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.update.updateCampaignRetrieve(campaignId, resultsFn);
        }, function (data, done) {
            done(null, campaignAdapter_1.CampaignAdapter.map(data, _this));
        }, callback);
    };
    UpdateApi.prototype.addCampaign = function (campaign, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.update.updateCampaignCreate(campaignAdapter_1.CampaignAdapter.addMap(campaign), resultsFn);
        }, function (data, done) {
            done(null, campaignAdapter_1.CampaignAdapter.map(data, _this));
        }, callback);
    };
    UpdateApi.prototype.updateCampaign = function (campaign, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.update.updateCampaignUpdate(campaign.id, campaignAdapter_1.CampaignAdapter.updateMap(campaign), resultsFn);
        }, function (data, done) {
            var response = campaignAdapter_1.CampaignAdapter.map(data, _this);
            done(null, response);
        }, callback);
    };
    UpdateApi.prototype.deleteCampaign = function (campaignId, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this._endpoints.update.updateCampaignDestroy(campaignId, resultsFn);
        }, function (data, done) {
            done(null, data);
        }, callback);
    };
    UpdateApi.prototype.startCampaign = function (campaignId, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.updateCampaign({
                id: campaignId,
                state: "scheduled",
            }, resultsFn);
        }, function (data, done) {
            done(null, data);
        }, callback);
    };
    UpdateApi.prototype.stopCampaign = function (campaignId, callback) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.updateCampaign({
                id: campaignId,
                state: "draft",
            }, resultsFn);
        }, function (data, done) {
            done(null, data);
        }, callback);
    };
    UpdateApi.prototype.listCampaignDeviceStates = function (campaignId, options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return functions_1.apiWrapper(function (resultsFn) {
            var limit = options.limit, order = options.order, after = options.after, include = options.include;
            _this._endpoints.update.updateCampaignMetadataList(campaignId, limit, order, after, functions_1.encodeInclude(include), resultsFn);
        }, function (data, done) {
            var list;
            if (data.data && data.data.length) {
                list = data.data.map(function (state) {
                    return campaignDeviceStateAdapter_1.CampaignDeviceStateAdapter.map(state);
                });
            }
            done(null, new listResponse_1.ListResponse(data, list));
        }, callback);
    };
    UpdateApi.prototype.getLastApiMetadata = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            done(null, _this._endpoints.getLastMeta());
        }, callback);
    };
    return UpdateApi;
}());
exports.UpdateApi = UpdateApi;
//# sourceMappingURL=updateApi.js.map