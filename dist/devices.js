/* @mbed Cloud SDK
* Copyright 2017 ARM Limited
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

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['_backends/mds'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // CommonJS-like environments that support module.exports, like Node.
        module.exports = factory(require('./_backends/mds'));
    }
}(this, function(mds) {
    'use strict';

    function Resource(client, options) {
        this._client = client;

        this.obs = options.obs;
        this.rt = options.rt;
        this.type = options.type;
        this.uri = options.uri;
    }
    Resource.prototype.getValue = function() {
        return new Promise(function(resolve, reject) {
            resolve("value - " + this.uri);
        }.bind(this));
    };

    function Endpoint(client, options) {
        this._client = client;

        this.name = options.name;
        this.status = options.status;
        this.type = options.type;
    }
    Endpoint.prototype.listResources = function() {
        return new Promise(function(resolve, reject) {
            var api = new mds.EndpointsApi(this._client);
            api.v2EndpointsEndpointNameGet(this.name, function(err, resources) {
                if (err) return reject(err);
                resources = resources.map(function(resource) {
                    return new Resource(this._client, resource);
                }.bind(this));
                resolve(resources);
            }.bind(this));
        }.bind(this));
    };
    Endpoint.prototype.isActive = function(callback) {
    };

    /**
 * Represents Devices.
 * @alias module:Devices
 * @constructor
 * @param {object} key - API key
 * @param {object} host the URL
 * @property {object} _client te client API
 */
    function Devices(options) {
        var client = new mds.ApiClient();
        if (options.host) client.basePath = options.host;
        if (options.key) client.authentications.Bearer.apiKey = options.key;
        client.authentications.Bearer.apiKeyPrefix = 'Bearer';

        this._client = client;

/*
        client.authentications = {
            'Bearer': {
                type: 'apiKey',
                'in': 'header',
                name: 'Authorization',
                apiKey: key,
                apiKeyPrefix : 'Bearer'
            }
        }

        client.authentications['Authorization'] = {
            type: 'apiKey',
            'in': 'header',
            name: 'Authorization',
            apiKey: key,
            apiKeyPrefix : 'Bearer'
        }
*/
    }
/**
 * Retrieves endpoints
 *
 * @return {Promise.<Array>}
 */
    Devices.prototype.listEndpoints = function() {
        return new Promise(function(resolve, reject) {
            var api = new mds.EndpointsApi(this._client);
            api.v2EndpointsGet(null, function(err, endpoints) {
                if (err) return reject(err);
                endpoints = endpoints.map(function(endpoint) {
                    return new Endpoint(this._client, endpoint);
                }.bind(this));
                resolve(endpoints);
            }.bind(this));
        }.bind(this));
    };

    return Devices;
}));

/*
mds.NotificationsApi.v2NotificationCallbackPut
mds.NotificationsApi.v2NotificationPullGet
mds.DefaultApi.v2NotificationCallbackDelete
mds.DefaultApi.v2NotificationCallbackGet
mds.ResourcesApi.v2EndpointsEndpointNameResourcePathDelete
mds.ResourcesApi.v2EndpointsEndpointNameResourcePathGet
mds.ResourcesApi.v2EndpointsEndpointNameResourcePathPost
mds.ResourcesApi.v2EndpointsEndpointNameResourcePathPut
mds.SubscriptionsApi.v2SubscriptionsGet
mds.SubscriptionsApi.v2SubscriptionsPut
mds.SubscriptionsApi.v2SubscriptionsDelete
mds.SubscriptionsApi.v2SubscriptionsEndpointNameDelete
mds.SubscriptionsApi.v2SubscriptionsEndpointNameGet
mds.SubscriptionsApi.v2SubscriptionsEndpointNameResourcePathDelete
mds.SubscriptionsApi.v2SubscriptionsEndpointNameResourcePathGet
mds.SubscriptionsApi.v2SubscriptionsEndpointNameResourcePathPut
*/