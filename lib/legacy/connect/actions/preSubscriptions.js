"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("../../common/functions");
var presubscriptionAdapter_1 = require("../models/presubscriptionAdapter");
exports.listPresubscriptions = function (endpoints, callback) {
    return functions_1.apiWrapper(function (resultsFn) {
        endpoints.subscriptions.getPreSubscriptions(resultsFn);
    }, function (data, done) {
        var presubs = data.map(presubscriptionAdapter_1.PresubscriptionAdapter.map);
        done(null, presubs);
    }, callback);
};
exports.updatePresubscriptions = function (endpoints, subscriptions, callback) {
    return functions_1.apiWrapper(function (resultsFn) {
        var presubs = subscriptions.map(presubscriptionAdapter_1.PresubscriptionAdapter.reverseMap);
        endpoints.subscriptions.updatePreSubscriptions(presubs, resultsFn);
    }, function (data, done) {
        done(null, data);
    }, callback);
};
exports.deletePresubscriptions = function (endpoints, callback) {
    return functions_1.apiWrapper(function (resultsFn) {
        endpoints.subscriptions.deletePreSubscriptions(resultsFn);
    }, function (data, done) {
        done(null, data);
    }, callback);
};
//# sourceMappingURL=preSubscriptions.js.map