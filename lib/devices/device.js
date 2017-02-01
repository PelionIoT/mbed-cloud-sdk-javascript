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
var pg = require("polygoat");
/**
 * Device
 */
var Device = (function () {
    function Device(options, _api) {
        this._api = _api;
        for (var key in options) {
            this[key] = options[key];
        }
    }
    Device.map = function (from, api) {
        var type = {
            accountId: from.account_id,
            autoUpdate: from.auto_update,
            bootstrappedTimestamp: from.bootstrapped_timestamp,
            createdAt: from.created_at,
            customAttributes: from.custom_attributes,
            deployedState: from.deployed_state,
            deployment: from.deployment,
            description: from.description,
            deviceClass: from.device_class,
            id: from.id,
            manifest: from.manifest,
            mechanism: from.mechanism,
            mechanismUrl: from.mechanism_url,
            name: from.name,
            provisionKey: from.provision_key,
            serialNumber: from.serial_number,
            state: from.state,
            trustClass: from.trust_class,
            trustLevel: from.trust_level,
            updatedAt: from.updated_at,
            vendorId: from.vendor_id
        };
        return new Device(type, api);
    };
    Device.reverseMap = function (from) {
        return {
            account_id: from.accountId,
            name: from.name,
            auto_update: from.autoUpdate,
            vendor_id: from.vendorId,
            custom_attributes: from.customAttributes,
            manifest: from.manifest,
            trust_class: from.trustClass,
            provision_key: from.provisionKey,
            mechanism: from.mechanism,
            device_class: from.deviceClass,
            mechanism_url: from.mechanismUrl,
            serial_number: from.serialNumber,
            trust_level: from.trustLevel,
            description: from.description,
        };
    };
    Device.prototype.listResources = function (callback) {
        var _this = this;
        return pg(function (done) {
            _this._api.listDeviceResources({
                id: _this.id
            }, done);
        }, callback);
    };
    Device.prototype.listSubscriptions = function (callback) {
        var _this = this;
        return pg(function (done) {
            _this._api.listDeviceSubscriptions({
                id: _this.id
            }, done);
        }, callback);
    };
    Device.prototype.deleteSubscriptions = function (callback) {
        var _this = this;
        return pg(function (done) {
            _this._api.deleteDeviceSubscriptions({
                id: _this.id
            }, done);
        }, callback);
    };
    Device.prototype.update = function (options, callback) {
        var _this = this;
        return pg(function (done) {
            _this._api.updateDevice({
                id: _this.id,
                accountId: options.accountId,
                autoUpdate: options.autoUpdate,
                customAttributes: options.customAttributes,
                description: options.description,
                deviceClass: options.deviceClass,
                manifest: options.manifest,
                mechanism: options.mechanism,
                mechanismUrl: options.mechanismUrl,
                name: options.name,
                provisionKey: options.provisionKey,
                serialNumber: options.serialNumber,
                trustClass: options.trustClass,
                trustLevel: options.trustLevel,
                vendorId: options.vendorId
            }, done);
        }, callback);
    };
    Device.prototype.delete = function (callback) {
        var _this = this;
        return pg(function (done) {
            _this._api.deleteDevice({
                id: _this.id
            }, done);
        }, callback);
    };
    return Device;
}());
exports.Device = Device;
