"use strict";
var developer_certificate_1 = require("../_api/developer_certificate");
var Endpoints = (function () {
    function Endpoints(options) {
        this.development = new developer_certificate_1.DefaultApi(options.host);
        this.development.setApiKey(developer_certificate_1.DefaultApiApiKeys.Bearer, "Bearer " + options.apiKey);
    }
    return Endpoints;
}());
exports.Endpoints = Endpoints;
