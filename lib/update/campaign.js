"use strict";
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
var functions_1 = require("../common/functions");
/*
 * Campaign
 */
var Campaign = (function () {
    function Campaign(options, _api) {
        this._api = _api;
        for (var key in options) {
            this[key] = options[key];
        }
    }
    Campaign.map = function (from, api) {
        var attributes = functions_1.decodeAttributes(from.device_filter, Campaign.CUSTOM_PREFIX);
        var type = {
            accountId: from.updating_account_id,
            apiKey: from.updating_api_key,
            attributes: attributes.noMatch,
            customAttributes: attributes.match,
            createdAt: from.created_at,
            description: from.description,
            finishDate: from.finished,
            id: from.id,
            manifestId: from.root_manifest_id,
            manifestUrl: from.root_manifest_url,
            name: from.name,
            startDate: from.when,
            state: from.state,
            updatedAt: from.updated_at,
            userId: from.updating_user_id
        };
        return new Campaign(type, api);
    };
    Campaign.reverseMap = function (from) {
        return {
            description: from.description,
            device_filter: functions_1.encodeFilter(from, Campaign.CUSTOM_PREFIX),
            name: from.name,
            root_manifest_id: from.manifestId,
            state: from.state,
            when: from.startDate
        };
    };
    Campaign.prototype.getStatus = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._api.getCampaignStatus({
                id: _this.id
            }, done);
        }, callback);
    };
    Campaign.prototype.update = function (options, callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._api.updateCampaign({
                id: _this.id,
                attributes: options.attributes,
                customAttributes: options.customAttributes,
                description: options.description,
                manifestId: options.manifestId,
                name: options.name,
                start: options.start,
                state: options.state
            }, done);
        }, callback);
    };
    Campaign.prototype.start = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._api.startCampaign(_this, done);
        }, callback);
    };
    Campaign.prototype.stop = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._api.stopCampaign(_this, done);
        }, callback);
    };
    Campaign.prototype.delete = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._api.deleteCampaign(_this, done);
        }, callback);
    };
    return Campaign;
}());
exports.Campaign = Campaign;
Campaign.CUSTOM_PREFIX = "custom_attributes__";
