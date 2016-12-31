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
//import { DefaultApi as DeploymentAPI, DefaultApiApiKeys } from "../_api/deployment_service";
import { DefaultApi as FirmwareAPI, DefaultApiApiKeys } from "../_api/firmware_catalog";

/**
* Root Update object
*/
export class Update {

    private _api: FirmwareAPI;

    /**
    * @param options Options object
    */
    constructor(options: Update.UpdateOptions) {
        this._api = new FirmwareAPI();
//        if (options.host) this.client.basePath = options.host;
        if (options.accessKey) this._api.setApiKey(DefaultApiApiKeys.Bearer, "Bearer " + options.accessKey);
    }

    /**
    * Gets a list of currently registered endpoints
    * @param type Filters endpoints by endpoint-type
    * @param callback A function that is passed the arguments (error, endpoints)
    * @returns Optional Promise of currently registered endpoints
    */
    public getFirmwareImages(options?: Update.ListOptions, callback?: (err: any, data?: any) => void): Promise<any> {
        options = options || {};
        let { limit, order, after, include } = options;
        return pg(done => {
            this._api.firmwareImageList(limit, order, after, include, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }

    public getManifests(options?: Update.ListOptions, callback?: (err: any, data?: any) => void): Promise<any> {
        options = options || {};
        let { limit, order, after, include } = options;
        return pg(done => {
            this._api.firmwareManifestList(limit, order, after, include, (error, data) => {
                if (error) return done(error);
                done(null, data);
            });
        }, callback);
    }
}

export namespace Update {

    export interface UpdateOptions {
        /**
        * Access Key for your mbed Device Connector account
        */
        accessKey: string;
        /**
        * URL for mbed Device Connector API
        */
        host?: string;
    }

    export interface ListOptions {
        limit?: number;
        order?: string;
        after?: string;
        include?: string;
    }
}
