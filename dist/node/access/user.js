"use strict";
var User = (function () {
    function User(_api, options) {
        this._api = _api;
        for (var key in options) {
            this[key] = options[key];
        }
        this._api = null; //deleteme
    }
    return User;
}());
exports.User = User;
