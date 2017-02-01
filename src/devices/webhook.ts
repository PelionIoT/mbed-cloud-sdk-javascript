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

import { asyncStyle } from "../common/functions";
import { WebhookType } from "./types";
import { Webhook as apiWebhook } from "../_api/mds";
import { DevicesApi } from "./index";

/*
 * Webhook
 */
export class Webhook {

    constructor(options: WebhookType, private _api?: DevicesApi) {
        for(var key in options) {
            this[key] = options[key];
        }
    }

    static map(from: apiWebhook, api: DevicesApi): Webhook {
        let type:WebhookType = {
            headers:    from.headers,
            url:        from.url
        };

        return new Webhook(type, api);
    }

    static reverseMap(from: WebhookType): WebhookType {
        return {
            headers: from.headers,
            url:     from.url
        };
    }

    /**
     * Updates the webhook
     * @param options webhook details
     * @returns Promise containing any error
     */
    public update(options: WebhookType): Promise<void>;
    /**
     * Updates the webhook
     * @param options webhook details
     * @param callback A function that is passed any error
     */
    public update(options: WebhookType, callback?: (err: any, data?: void) => any);
    public update(options: WebhookType, callback?: (err: any, data?: void) => any): Promise<void> {
        return asyncStyle(done => {
            this._api.updateWebhook(options, done);
        }, callback);
    }

    /**
     * Deletes the callback data (effectively stopping mbed Cloud Connect from putting notifications)
     * @returns Promise containing any error
     */
    public delete(): Promise<void>;
    /**
     * Deletes the callback data (effectively stopping mbed Cloud Connect from putting notifications)
     * @param callback A function that is passed any error
     */
    public delete(callback?: (err: any, data?: void) => any);
    public delete(callback?: (err: any, data?: void) => any): Promise<void> {
        return asyncStyle(done => {
            this._api.deleteWebhook(done);
        }, callback);
    }
}
export interface Webhook extends WebhookType {}
