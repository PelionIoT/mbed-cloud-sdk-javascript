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
import { ConnectionOptions, ListOptions, ListResponse } from "../helpers/interfaces";
import { mapListResponse, encodeInclude } from "../helpers/data";
import { Endpoints } from "./endpoints";
import { FirmwareImage } from "./firmwareImage";
import { FirmwareManifest } from "./firmwareManifest";

/**
* Root Update API
*/
export class UpdateApi {

    private _endpoints: Endpoints;

    /**
    * @param options connection options
    */
    constructor(options: ConnectionOptions) {
        this._endpoints = new Endpoints(options);
    }

    /**
     * List firmware images
     * @param options list options
     * @returns Promise of listResponse
     */
    public listFirmwareImages(options?: ListOptions): Promise<ListResponse<FirmwareImage>>;
    /**
     * List firmware images
     * @param options list options
     * @param callback A function that is passed the return arguments (error, listResponse)
     */
    public listFirmwareImages(options?: ListOptions, callback?: (err: any, data?: ListResponse<FirmwareImage>) => any): void;
    public listFirmwareImages(options?: ListOptions, callback?: (err: any, data?: ListResponse<FirmwareImage>) => any): Promise<ListResponse<FirmwareImage>> {
        options = options || {};
        let { limit, order, after, include } = options;
        return pg(done => {
            this._endpoints.firmware.firmwareImageList(limit, order, after, encodeInclude(include), (error, data) => {
                if (error) return done(error);

                let list = data.data.map(log => {
                    return FirmwareImage.map(log);
                });

                done(null, mapListResponse<FirmwareImage>(data, list));
            });
        }, callback);
    }

    /**
     * List firmware manifests
     * @param options list options
     * @returns Promise of listResponse
     */
    public listFirmwareManifests(options?: ListOptions): Promise<ListResponse<FirmwareManifest>>;
    /**
     * List manifests
     * @param options list options
     * @param callback A function that is passed the return arguments (error, listResponse)
     */
    public listFirmwareManifests(options?: ListOptions, callback?: (err: any, data?: ListResponse<FirmwareManifest>) => any): void;
    public listFirmwareManifests(options?: ListOptions, callback?: (err: any, data?: ListResponse<FirmwareManifest>) => any): Promise<ListResponse<FirmwareManifest>> {
        options = options || {};
        let { limit, order, after, include } = options;
        return pg(done => {
            this._endpoints.firmware.firmwareManifestList(limit, order, after, encodeInclude(include), (error, data) => {
                if (error) return done(error);

                let list = data.data.map(log => {
                    return FirmwareManifest.map(log);
                });

                done(null, mapListResponse<FirmwareManifest>(data, list));
            });
        }, callback);
    }
}
