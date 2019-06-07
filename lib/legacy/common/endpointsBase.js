"use strict";
/*
* Pelion Device Management JavaScript SDK
* Copyright Arm Limited 2017
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
Object.defineProperty(exports, "__esModule", { value: true });
var apiMetadata_1 = require("./apiMetadata");
/**
 * Internal class
 * @ignore
 */
var EndpointsBase = /** @class */ (function () {
    function EndpointsBase() {
    }
    EndpointsBase.prototype.responseHandler = function (error, response) {
        var statusCode = null;
        var errorMessage = null;
        var headers = null;
        var body = null;
        var request = null;
        if (error) {
            statusCode = error.code;
            errorMessage = error.message;
            request = error.innerError;
        }
        if (response) {
            statusCode = response.statusCode;
            headers = response.headers;
            body = response.body || response.text;
            request = response.request || response.req;
        }
        this.lastMeta = new apiMetadata_1.ApiMetadata(statusCode, errorMessage, headers, body, request);
    };
    EndpointsBase.prototype.getLastMeta = function () {
        return this.lastMeta;
    };
    return EndpointsBase;
}());
exports.EndpointsBase = EndpointsBase;
//# sourceMappingURL=endpointsBase.js.map