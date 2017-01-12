"use strict";
var developer_certificate_1 = require("../_api/developer_certificate");
var Api = (function () {
    function Api(options) {
        this.development = new developer_certificate_1.DefaultApi(options.host);
        this.development.setApiKey(developer_certificate_1.DefaultApiApiKeys.Bearer, "Bearer " + options.accessKey);
    }
    return Api;
}());
exports.Api = Api;
