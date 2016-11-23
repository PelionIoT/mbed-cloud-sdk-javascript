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
    };

    function Endpoint(client, options) {
        this._client = client;

        this.name = options.name;
        this.status = options.status;
        this.type = options.type;
    }
    Endpoint.prototype.listResources = function(callback) {
        var api = new mds.EndpointsApi(this._client);
        api.v2EndpointsEndpointNameGet(this.name, function(err, resources) {
            resources = resources.map(function(resource) {
                return new Resource(this._client, resource);
            }.bind(this));
            callback(err, resources);
        }.bind(this));
    };
    Endpoint.prototype.isActive = function(callback) {
        var api = new mds.EndpointsApi(this._client);
        api.v2EndpointsEndpointNameGet(this.name, function(err, resources) {
            resources = resources.map(function(resource) {
                return new Resource(this._client, resource);
            }.bind(this));
            callback(err, resources);
        }.bind(this));
    };

    function Devices(key, host) {
        var client = new mds.ApiClient();
        client.basePath = host;
        client.authentications.Bearer.apiKey = key;
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
    Devices.prototype.listEndpoints = function(callback) {
        var api = new mds.EndpointsApi(this._client);
        api.v2EndpointsGet(null, function(err, endpoints) {
            endpoints = endpoints.map(function(endpoint) {
                return new Endpoint(this._client, endpoint);
            }.bind(this));
            callback(err, endpoints);
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