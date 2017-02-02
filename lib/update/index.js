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
"use strict";
var functions_1 = require("../common/functions");
var endpoints_1 = require("./endpoints");
var firmwareImage_1 = require("./firmwareImage");
var firmwareManifest_1 = require("./firmwareManifest");
var campaign_1 = require("./campaign");
var campaignState_1 = require("./campaignState");
/**
* Root Update API
*/
var UpdateApi = (function () {
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
        var _a = options, limit = _a.limit, order = _a.order, after = _a.after, include = _a.include;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.firmware.firmwareImageList(limit, order, after, functions_1.encodeInclude(include), function (error, data) {
                if (error)
                    return done(error);
                var list = data.data.map(function (log) {
                    return firmwareImage_1.FirmwareImage.map(log, _this);
                });
                done(null, functions_1.mapListResponse(data, list));
            });
        }, callback);
    };
    UpdateApi.prototype.getFirmwareImage = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.firmware.firmwareImageRetrieve(options.id, null, null, null, null, null, null, null, null, null, function (error, data) {
                if (error)
                    return done(error);
                done(null, firmwareImage_1.FirmwareImage.map(data.data[0], _this));
            });
        }, callback);
    };
    UpdateApi.prototype.addFirmwareImage = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.firmware.firmwareImageCreate(options.data, options.name, options.description, null, null, null, null, null, null, null, null, null, null, function (error, data) {
                if (error)
                    return done(error);
                done(null, firmwareImage_1.FirmwareImage.map(data, _this));
            });
        }, callback);
    };
    UpdateApi.prototype.deleteFirmwareImage = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.firmware.firmwareImageDestroy(options.id, null, null, null, null, null, null, null, null, null, function (error, data) {
                if (error)
                    return done(error);
                done(null, null);
            });
        }, callback);
    };
    UpdateApi.prototype.listFirmwareManifests = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var _a = options, limit = _a.limit, order = _a.order, after = _a.after, include = _a.include;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.firmware.firmwareManifestList(limit, order, after, functions_1.encodeInclude(include), function (error, data) {
                if (error)
                    return done(error);
                var list = data.data.map(function (log) {
                    return firmwareManifest_1.FirmwareManifest.map(log, _this);
                });
                done(null, functions_1.mapListResponse(data, list));
            });
        }, callback);
    };
    UpdateApi.prototype.getFirmwareManifest = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.firmware.firmwareManifestRetrieve(options.id, null, null, null, null, null, null, null, null, null, null, null, function (error, data) {
                if (error)
                    return done(error);
                done(null, firmwareManifest_1.FirmwareManifest.map(data, _this));
            });
        }, callback);
    };
    UpdateApi.prototype.addFirmwareManifest = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.firmware.firmwareManifestCreate(options.data, options.name, options.description, function (error, data) {
                if (error)
                    return done(error);
                done(null, firmwareManifest_1.FirmwareManifest.map(data, _this));
            });
        }, callback);
    };
    UpdateApi.prototype.deleteFirmwareManifest = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.firmware.firmwareManifestDestroy(options.id, function (error, data) {
                if (error)
                    return done(error);
                done(null, null);
            });
        }, callback);
    };
    UpdateApi.prototype.listCampaigns = function (options, callback) {
        var _this = this;
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        var _a = options, limit = _a.limit, order = _a.order, after = _a.after, include = _a.include;
        var filter = functions_1.encodeAttributes(options);
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.deployment.updateCampaignList(limit, order, after, filter, functions_1.encodeInclude(include), function (error, data) {
                if (error)
                    return done(error);
                var list = data.data.map(function (log) {
                    return campaign_1.Campaign.map(log, _this);
                });
                done(null, functions_1.mapListResponse(data, list));
            });
        }, callback);
    };
    UpdateApi.prototype.getCampaign = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.deployment.updateCampaignRetrieve(options.id, function (error, data) {
                if (error)
                    return done(error);
                done(null, campaign_1.Campaign.map(data, _this));
            });
        }, callback);
    };
    UpdateApi.prototype.addCampaign = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.deployment.updateCampaignCreate(campaign_1.Campaign.reverseMap(options), function (error, data) {
                if (error)
                    return done(error);
                done(null, campaign_1.Campaign.map(data, _this));
            });
        }, callback);
    };
    UpdateApi.prototype.updateCampaign = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.deployment.updateCampaignUpdate(options.id, campaign_1.Campaign.reverseMap(options), function (error, data) {
                if (error)
                    return done(error);
                var query = campaign_1.Campaign.map(data, _this);
                done(null, query);
            });
        }, callback);
    };
    UpdateApi.prototype.deleteCampaign = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.deployment.updateCampaignDestroy(options.id, function (error, data) {
                if (error)
                    return done(error);
                done(null, null);
            });
        }, callback);
    };
    UpdateApi.prototype.getCampaignStatus = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._endpoints.deployment.updateCampaignStatus(options.id, function (error, data) {
                if (error)
                    return done(error);
                done(null, campaignState_1.CampaignState.map(data));
            });
        }, callback);
    };
    UpdateApi.prototype.startCampaign = function (options, callback) {
        var _this = this;
        options.state = "scheduled";
        return functions_1.asyncStyle(function (done) {
            _this.updateCampaign(options, function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    UpdateApi.prototype.stopCampaign = function (options, callback) {
        var _this = this;
        options.state = "draft";
        return functions_1.asyncStyle(function (done) {
            _this.updateCampaign(options, function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    return UpdateApi;
}());
exports.UpdateApi = UpdateApi;
