"use strict";
var device_catalog_1 = require("../_api/device_catalog");
var Api = (function () {
    function Api(options) {
        this.catalog = new device_catalog_1.DefaultApi(options.host);
        this.catalog.setApiKey(device_catalog_1.DefaultApiApiKeys.Bearer, "Bearer " + options.accessKey);
    }
    return Api;
}());
exports.Api = Api;
