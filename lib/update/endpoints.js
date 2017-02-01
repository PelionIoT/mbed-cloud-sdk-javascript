"use strict";
var firmware_catalog_1 = require("../_api/firmware_catalog");
var deployment_service_1 = require("../_api/deployment_service");
var Endpoints = (function () {
    function Endpoints(options) {
        this.firmware = new firmware_catalog_1.DefaultApi(options.apiKey, options.host);
        this.deployment = new deployment_service_1.DefaultApi(options.apiKey, options.host);
    }
    return Endpoints;
}());
exports.Endpoints = Endpoints;
