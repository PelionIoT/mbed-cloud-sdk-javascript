"use strict";
var iam_1 = require("../_api/iam");
var Endpoints = (function () {
    function Endpoints(options) {
        this.access = new iam_1.DefaultApi(options.host);
        this.developer = new iam_1.DeveloperApi(options.host);
        this.admin = new iam_1.AccountAdminApi(options.host);
        this.access.setApiKey(iam_1.DefaultApiApiKeys.Bearer, "Bearer " + options.apiKey);
        this.developer.setApiKey(iam_1.DeveloperApiApiKeys.Bearer, "Bearer " + options.apiKey);
        this.admin.setApiKey(iam_1.AccountAdminApiApiKeys.Bearer, "Bearer " + options.apiKey);
    }
    return Endpoints;
}());
exports.Endpoints = Endpoints;
