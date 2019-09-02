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
/**
 * Presubscription Adapter
 */
var PresubscriptionAdapter = /** @class */ (function () {
    function PresubscriptionAdapter() {
    }
    PresubscriptionAdapter.map = function (from) {
        return {
            deviceId: from["endpoint-name"],
            deviceType: from["endpoint-type"],
            resourcePaths: from["resource-path"],
        };
    };
    PresubscriptionAdapter.reverseMap = function (from) {
        return {
            "endpoint-name": from.deviceId,
            "endpoint-type": from.deviceType,
            "resource-path": from.resourcePaths,
        };
    };
    return PresubscriptionAdapter;
}());
exports.PresubscriptionAdapter = PresubscriptionAdapter;
//# sourceMappingURL=presubscriptionAdapter.js.map