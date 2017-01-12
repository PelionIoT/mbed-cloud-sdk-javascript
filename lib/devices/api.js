"use strict";
var mds_1 = require("../_api/mds");
var device_catalog_1 = require("../_api/device_catalog");
var device_query_service_1 = require("../_api/device_query_service");
var Api = (function () {
    function Api(options) {
        this.endpoints = new mds_1.EndpointsApi(options.host);
        this.notifications = new mds_1.NotificationsApi(options.host);
        this.resources = new mds_1.ResourcesApi(options.host);
        this.subscriptions = new mds_1.SubscriptionsApi(options.host);
        this.catalog = new device_catalog_1.DefaultApi(options.host);
        this.query = new device_query_service_1.DefaultApi(options.host);
        this.endpoints.setApiKey(mds_1.EndpointsApiApiKeys.Bearer, "Bearer " + options.accessKey);
        this.notifications.setApiKey(mds_1.NotificationsApiApiKeys.Bearer, "Bearer " + options.accessKey);
        this.resources.setApiKey(mds_1.ResourcesApiApiKeys.Bearer, "Bearer " + options.accessKey);
        this.subscriptions.setApiKey(mds_1.SubscriptionsApiApiKeys.Bearer, "Bearer " + options.accessKey);
        this.catalog.setApiKey(device_catalog_1.DefaultApiApiKeys.Bearer, "Bearer " + options.accessKey);
        this.query.setApiKey(device_query_service_1.DefaultApiApiKeys.Bearer, "Bearer " + options.accessKey);
    }
    return Api;
}());
exports.Api = Api;
