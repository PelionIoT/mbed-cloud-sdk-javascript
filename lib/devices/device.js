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
/**
 * Object representing a device
 */
var Device = (function () {
    function Device(_api, options) {
        this._api = _api;
        for (var key in options) {
            this[key] = options[key];
        }
    }
    Device.prototype.mapResource = function (from) {
        var type = {
            contentType: from.type,
            observable: from.obs,
            type: from.rt,
            path: from.uri
        };
        return new resource_1.Resource(this._api, this.id, type);
    };
    /**
    * Gets details of a device
    * @param callback A function that is passed the arguments (error, details)
    * @returns Optional Promise of details
    */
    Device.prototype.getDetails = function (callback) {
        var _this = this;
        return pg(function (done) {
            _this._api.catalog.deviceRetrieve(_this.id, function (error, data) {
                if (error)
                    return done(error);
                done(null, data);
            });
        }, callback);
    };
    /**
    * Gets a list of a device's resources
    * @param callback A function that is passed the arguments (error, resources)
    * @returns Optional Promise of device resources
    */
    Device.prototype.listResources = function (callback) {
        var _this = this;
        return pg(function (done) {
            _this._api.endpoints.v2EndpointsEndpointNameGet(_this.id, function (error, data) {
                if (error)
                    return done(error);
                var resources = data.map(_this.mapResource);
                done(null, resources);
            });
        }, callback);
    };
    /**
    * Deletes a resource
    * @param path Path of the resource to delete
    * @param noResp Whether to make a non-confirmable request to the device
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    Device.prototype.deleteResource = function (options, callback) {
        //mds.ResourcesApi.v2EndpointsEndpointNameResourcePathDelete
        return pg(function (done) {
            done(null, null);
        }, callback);
    };
    /**
    * Gets a list of a device's subscriptions
    * @param callback A function that is passed (error, subscriptions)
    * @returns Optional Promise containing the subscriptions
    */
    Device.prototype.listSubscriptions = function (callback) {
        //mds.SubscriptionsApi.v2SubscriptionsEndpointNameGet
        return pg(function (done) {
            done(null, null);
        }, callback);
    };
    /**
    * Removes a device's subscriptions
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    Device.prototype.deleteSubscriptions = function (callback) {
        //mds.SubscriptionsApi.v2SubscriptionsEndpointNameDelete
        return pg(function (done) {
            done(null, null);
        }, callback);
    };
    return Device;
}());
exports.Device = Device;
