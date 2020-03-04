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
var utils_1 = require("../../common/utils");
var ConnectEvents;
(function (ConnectEvents) {
    /**
     * Resource notification event
     * @event
     */
    ConnectEvents["EVENT_NOTIFICATION"] = "notification";
    /**
     * List of new devices that have registered (with resources)
     * @event
     */
    ConnectEvents["EVENT_REGISTRATION"] = "registration";
    /**
     * List of devices that have updated registration
     * @event
     */
    ConnectEvents["EVENT_REREGISTRATION"] = "reregistration";
    /**
     * List of devices that were removed in a controlled manner
     * @event
     */
    ConnectEvents["EVENT_DEREGISTRATION"] = "deregistration";
    /**
     * List of devices that were removed because the registration has expired
     * @event
     */
    ConnectEvents["EVENT_EXPIRED"] = "expired";
})(ConnectEvents = exports.ConnectEvents || (exports.ConnectEvents = {}));
exports.presubscriptionsEqual = function (a, b) {
    return a.deviceId === b.deviceId && utils_1.arraysEqual(a.resourcePaths, b.resourcePaths);
};
var AsyncResponseStatus;
(function (AsyncResponseStatus) {
    AsyncResponseStatus[AsyncResponseStatus["SUCCEEDED"] = 200] = "SUCCEEDED";
    AsyncResponseStatus[AsyncResponseStatus["Error: cannot read value"] = 400] = "Error: cannot read value";
    AsyncResponseStatus[AsyncResponseStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    AsyncResponseStatus[AsyncResponseStatus["PRECONDITION_FAILED"] = 412] = "PRECONDITION_FAILED";
    AsyncResponseStatus[AsyncResponseStatus["ENTITY_TOO_LARGE"] = 413] = "ENTITY_TOO_LARGE";
    AsyncResponseStatus[AsyncResponseStatus["UNSUPORTED_MEDIA"] = 415] = "UNSUPORTED_MEDIA";
    AsyncResponseStatus[AsyncResponseStatus["REQUEST_EXPIRED"] = 429] = "REQUEST_EXPIRED";
    AsyncResponseStatus[AsyncResponseStatus["REQUEST_FAILED"] = 502] = "REQUEST_FAILED";
    AsyncResponseStatus[AsyncResponseStatus["NOT_CONNECTED"] = 503] = "NOT_CONNECTED";
    AsyncResponseStatus[AsyncResponseStatus["TIMEOUT"] = 504] = "TIMEOUT";
})(AsyncResponseStatus = exports.AsyncResponseStatus || (exports.AsyncResponseStatus = {}));
//# sourceMappingURL=types.js.map