"use strict";
var developer_certificate_1 = require("../_api/developer_certificate");
var Endpoints = (function () {
    function Endpoints(options) {
        this.development = new developer_certificate_1.DefaultApi(options.apiKey, options.host);
    }
    return Endpoints;
}());
exports.Endpoints = Endpoints;
