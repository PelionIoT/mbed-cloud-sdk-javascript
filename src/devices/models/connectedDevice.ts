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

import { CallbackFn } from "../../common/interfaces";
import { asyncStyle } from "../../common/functions";
import { ConnectedDeviceStateEnum } from "../types";
import { DevicesApi } from "../index";
import { Resource } from "./resource";

/**
 * Connected Device
 */
export class ConnectedDevice {

    /**
     * The ID of the device
     */
    readonly id: string;
    /**
     * Possible values ACTIVE, STALE.
     */
    readonly state?: ConnectedDeviceStateEnum;
    /**
     * Determines whether the device is in queue mode.
     */
    readonly queueMode?: boolean;
    /**
     * Type of endpoint. (Free text)
     */
    readonly type?: string;

    constructor(init?: Partial<ConnectedDevice>, private _api?: DevicesApi) {
        for(var key in init) {
            this[key] = init[key];
        }
    }

    /**
     * List device's resources
     * @returns Promise of device resources
     */
    public listResources(): Promise<Array<Resource>>;
    /**
     * List device's resources
     * @param callback A function that is passed the arguments (error, resources)
     */
    public listResources(callback: CallbackFn<Array<Resource>>);
    public listResources(callback?: CallbackFn<Array<Resource>>): Promise<Resource[]> {
        return asyncStyle(done => {
            this._api.listResources(this.id, done);
        }, callback);
    }

    /**
     * List a device's subscriptions
     * @returns Promise containing the subscriptions
     */
    public listSubscriptions(): Promise<any>;
    /**
     * List a device's subscriptions
     * @param callback A function that is passed (error, subscriptions)
     */
    public listSubscriptions(callback: CallbackFn<any>);
    public listSubscriptions(callback?: CallbackFn<any>): Promise<any> {
        return asyncStyle(done => {
            this._api.listDeviceSubscriptions(this.id, done);
        }, callback);
    }

    /**
     * Removes a device's subscriptions
     * @returns Promise containing any error
     */
    public deleteSubscriptions(): Promise<void>;
    /**
     * Removes a device's subscriptions
     * @param callback A function that is passed any error
     */
    public deleteSubscriptions(callback: CallbackFn<void>);
    public deleteSubscriptions(callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(done => {
            this._api.deleteDeviceSubscriptions(this.id, done);
        }, callback);
    }
}
