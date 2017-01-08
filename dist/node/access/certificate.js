"use strict";
var Certificate = (function () {
    function Certificate(_api, options) {
        this._api = _api;
        for (var key in options) {
            this[key] = options[key];
        }
        this._api = null; //deleteme
    }
    return Certificate;
}());
exports.Certificate = Certificate;
