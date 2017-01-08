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
import { ConnectionOptions, ListOptions } from "../helpers/interfaces";
import { Api } from "./api";

/**
* Root Update object
*/
export class Update {

    private _api: Api;

    /**
    * @param options Options object
    */
    constructor(options: ConnectionOptions) {
        this._api = new Api(options);
    }

    /**
    * Gets a list of currently registered endpoints
    * @param type Filters endpoints by endpoint-type
    * @param callback A function that is passed the arguments (error, endpoints)
    * @returns Optional Promise of currently registered endpoints
    */
    public getFirmwareImages(options?: ListOptions, callback?: (err: any, data?: any) => void): Promise<any> {
        options = options || {};
        let { limit, order, after, include } = options;
        return pg(done => {
            this._api.firmware.firmwareImageList(limit, order, after, include, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }

    public getManifests(options?: ListOptions, callback?: (err: any, data?: any) => void): Promise<any> {
        options = options || {};
        let { limit, order, after, include } = options;
        return pg(done => {
            this._api.firmware.firmwareManifestList(limit, order, after, include, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }
}
