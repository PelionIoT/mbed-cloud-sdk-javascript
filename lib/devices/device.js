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
var resource_1 = require("./resource");
var index_1 = require("./index");
/**
 * Device
 */
var Device = (function () {
    function Device(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }
    Device.map = function (from) {
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
        return new Device(type);
    };
    Device.prototype.getDetails = function (callback) {
        var _this = this;
        return pg(function (done) {
            index_1.DevicesApi._endpoints.catalog.deviceRetrieve(_this.id, function (error, data) {
                if (error)
                    return done(error);
                var device = Device.map(data);
                done(null, device);
            });
        }, callback);
    };
    Device.prototype.listResources = function (callback) {
        var _this = this;
        return pg(function (done) {
            index_1.DevicesApi._endpoints.endpoints.v2EndpointsEndpointNameGet(_this.id, function (error, data) {
                if (error)
                    return done(error);
                var resources = data.map(function (resource) {
                    return resource_1.Resource.map(resource, _this.id);
                });
                done(null, resources);
            });
        }, callback);
    };
    Device.prototype.deleteResource = function (options, callback) {
        //mds.ResourcesApi.v2EndpointsEndpointNameResourcePathDelete
        return pg(function (done) {
            done(null, null);
        }, callback);
    };
    Device.prototype.listSubscriptions = function (callback) {
        //mds.SubscriptionsApi.v2SubscriptionsEndpointNameGet
        return pg(function (done) {
            done(null, null);
        }, callback);
    };
    Device.prototype.deleteSubscriptions = function (callback) {
        //mds.SubscriptionsApi.v2SubscriptionsEndpointNameDelete
        return pg(function (done) {
            done(null, null);
        }, callback);
    };
    return Device;
}());
exports.Device = Device;
