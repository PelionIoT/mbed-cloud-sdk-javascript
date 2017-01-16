"use strict";
var Query = (function () {
    function Query(_api, options) {
        this._api = _api;
        for (var key in options) {
            this[key] = options[key];
        }
        this._api = null; //deleteme
    }
    return Query;
}());
exports.Query = Query;
