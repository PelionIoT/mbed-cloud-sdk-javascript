"use strict";
var mds_1 = require("../_api/mds");
var device_catalog_1 = require("../_api/device_catalog");
var device_query_service_1 = require("../_api/device_query_service");
var Endpoints = (function () {
    function Endpoints(options) {
        this.webhooks = new mds_1.DefaultApi(options.apiKey, options.host);
        this.endpoints = new mds_1.EndpointsApi(options.apiKey, options.host);
        this.notifications = new mds_1.NotificationsApi(options.apiKey, options.host);
        this.resources = new mds_1.ResourcesApi(options.apiKey, options.host);
        this.subscriptions = new mds_1.SubscriptionsApi(options.apiKey, options.host);
        this.catalog = new device_catalog_1.DefaultApi(options.apiKey, options.host);
        this.query = new device_query_service_1.DefaultApi(options.apiKey, options.host);
    }
    return Endpoints;
}());
exports.Endpoints = Endpoints;
