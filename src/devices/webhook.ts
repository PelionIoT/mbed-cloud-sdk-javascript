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

import { WebhookType } from "./types";
import { Webhook as apiWebhook } from "../_api/mds";

/*
 * Webhook
 */
export class Webhook {

    constructor(options: WebhookType) {
        for(var key in options) {
            this[key] = options[key];
        }
    }

    static map(from: apiWebhook): Webhook {
        let type:WebhookType = {
            headers:    from.headers,
            url:        from.url
        };

        return new Webhook(type);
    }
}
export interface Webhook extends WebhookType {}
