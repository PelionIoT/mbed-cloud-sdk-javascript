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

import pg = require("polygoat");
import { DeviceType } from "./types";
import { Api } from "./api";
import { Resource } from"./resource";

/**
 * Object representing a device
 */
export class Device {

    constructor(private _api: Api, public id: string) {}

    public getDetails(): Promise<any>;
    public getDetails(callback: (err: any, data?: any) => void): void;
    /**
    * Gets details of a device
    * @param callback A function that is passed the arguments (error, details)
    * @returns Optional Promise of details
    */
    public getDetails(callback?: (err: any, data?: any) => void): Promise<any> {
        return pg(done => {
            this._api.catalog.deviceRetrieve(this.id, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }

    public listResources(): Promise<Resource[]>;
    public listResources(callback: (err: any, data?: Resource[]) => void): void;
    /**
    * Gets a list of a device's resources
    * @param callback A function that is passed the arguments (error, resources)
    * @returns Optional Promise of device resources
    */
    public listResources(callback?: (err: any, data?: Resource[]) => void): Promise<Resource[]> {
        return pg(done => {
            this._api.endpoints.v2EndpointsEndpointNameGet(this.id, (error, data) => {
                if (error) return done(error);
                var resources = data.map(resource => {
                    resource.device = this;
                    return new Resource(this._api, resource);
                });
                done(null, resources);
            });
        }, callback);
    }

    /**
    * Deletes a resource
    * @param path Path of the resource to delete
    * @param noResp Whether to make a non-confirmable request to the device
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    public deleteResource(options: { path: string, noResp?: boolean }, callback?: (err: any, data?: void) => void): Promise<void> {
        //mds.ResourcesApi.v2EndpointsEndpointNameResourcePathDelete
        return pg(done => {
            done(null, null);
        }, callback);
    }

    /**
    * Gets a list of a device's subscriptions
    * @param callback A function that is passed (error, subscriptions)
    * @returns Optional Promise containing the subscriptions
    */
    public listSubscriptions(callback?: (err: any, data?: any) => void): Promise<any> {
        //mds.SubscriptionsApi.v2SubscriptionsEndpointNameGet
        return pg(done => {
            done(null, null);
        }, callback);
    }

    /**
    * Removes a device's subscriptions
    * @param callback A function that is passed any error
    * @returns Optional Promise containing any error
    */
    public deleteSubscriptions(callback?: (err: any, data?: void) => void): Promise<void> {
        //mds.SubscriptionsApi.v2SubscriptionsEndpointNameDelete
        return pg(done => {
            done(null, null);
        }, callback);
    }
}
export interface Device extends DeviceType {}
