"use strict";
var device_catalog_1 = require("../_api/device_catalog");
var Endpoints = (function () {
    function Endpoints(options) {
        this.catalog = new device_catalog_1.DefaultApi(options.apiKey, options.host);
    }
    return Endpoints;
}());
exports.Endpoints = Endpoints;
