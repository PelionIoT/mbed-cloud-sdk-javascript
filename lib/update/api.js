"use strict";
var firmware_catalog_1 = require("../_api/firmware_catalog");
var deployment_service_1 = require("../_api/deployment_service");
var Api = (function () {
    function Api(options) {
        this.firmware = new firmware_catalog_1.DefaultApi(options.host);
        this.deployment = new deployment_service_1.DefaultApi(options.host);
        this.firmware.setApiKey(firmware_catalog_1.DefaultApiApiKeys.Bearer, "Bearer " + options.accessKey);
        this.deployment.setApiKey(deployment_service_1.DefaultApiApiKeys.Bearer, "Bearer " + options.accessKey);
    }
    return Api;
}());
exports.Api = Api;
