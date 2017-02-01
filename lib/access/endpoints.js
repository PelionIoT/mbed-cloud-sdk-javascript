"use strict";
var iam_1 = require("../_api/iam");
var Endpoints = (function () {
    function Endpoints(options) {
        this.access = new iam_1.DefaultApi(options.apiKey, options.host);
        this.developer = new iam_1.DeveloperApi(options.apiKey, options.host);
        this.admin = new iam_1.AccountAdminApi(options.apiKey, options.host);
    }
    return Endpoints;
}());
exports.Endpoints = Endpoints;
