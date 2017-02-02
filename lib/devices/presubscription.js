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
/*
 * Presubscription
 */
var Presubscription = (function () {
    function Presubscription(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }
    Presubscription.map = function (from) {
        var type = {
            id: from["endpoint-name"],
            type: from["endpoint-type"],
            resourcePaths: from["resource-path"]
        };
        return new Presubscription(type);
    };
    Presubscription.reverseMap = function (from) {
        return {
            "endpoint-name": from.id,
            "endpoint-type": from.type,
            "resource-path": from.resourcePaths
        };
    };
    return Presubscription;
}());
exports.Presubscription = Presubscription;
