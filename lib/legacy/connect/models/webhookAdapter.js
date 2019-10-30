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
var webhook_1 = require("./webhook");
/**
 * Webhook Adapter
 */
var WebhookAdapter = /** @class */ (function () {
    function WebhookAdapter() {
    }
    WebhookAdapter.map = function (from) {
        return new webhook_1.Webhook({
            url: from.url,
            headers: from.headers,
        });
    };
    return WebhookAdapter;
}());
exports.WebhookAdapter = WebhookAdapter;
//# sourceMappingURL=webhookAdapter.js.map