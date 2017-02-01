"use strict";
/*
* mbed Cloud JavaScript SDK
* Copyright ARM Limited 2017
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var functions_1 = require("../common/functions");
/*
 * Firmware Manifest
 */
var FirmwareManifest = (function () {
    function FirmwareManifest(options, _api) {
        this._api = _api;
        for (var key in options) {
            this[key] = options[key];
        }
    }
    FirmwareManifest.map = function (from, api) {
        var type = {
            createdAt: from.created_at,
            datafile: from.datafile,
            description: from.description,
            deviceClass: from.device_class,
            id: from.id,
            manifestContents: from.manifest_contents,
            name: from.name,
            timestamp: from.timestamp,
            updatedAt: from.updated_at
        };
        return new FirmwareManifest(type, api);
    };
    FirmwareManifest.prototype.delete = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._api.deleteFirmwareManifest({
                id: parseInt(_this.id)
            }, done);
        }, callback);
    };
    return FirmwareManifest;
}());
exports.FirmwareManifest = FirmwareManifest;
