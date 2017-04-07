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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("../common/functions");
/*
 * Firmware Image
 */
var FirmwareImage = (function () {
    function FirmwareImage(options, _api) {
        this._api = _api;
        for (var key in options) {
            this[key] = options[key];
        }
    }
    FirmwareImage.map = function (from, api) {
        var type = {
            createdAt: from.created_at,
            datafile: from.datafile,
            datafileChecksum: from.datafile_checksum,
            description: from.description,
            id: from.id,
            name: from.name,
            updatedAt: from.updated_at
        };
        return new FirmwareImage(type, api);
    };
    FirmwareImage.prototype.delete = function (callback) {
        var _this = this;
        return functions_1.asyncStyle(function (done) {
            _this._api.deleteFirmwareImage({
                id: parseInt(_this.id)
            }, done);
        }, callback);
    };
    return FirmwareImage;
}());
exports.FirmwareImage = FirmwareImage;
