/*
 * Pelion Device Management JavaScript SDK
 * Copyright Arm Limited 2018
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

import { ConfigOptions } from "../../common/config";
import { ApiMetadata } from "../common/apiMetadata";
import { apiWrapper, asyncStyle } from "../common/functions";
import { CallbackFn } from "../common/interfaces";
import { ListResponse } from "../common/listResponse";
import { Endpoints } from "./endpoints";
import { PreSharedKey } from "./models/preSharedKey";
import { mapFrom, mapToSDK, mapToSpec } from "./models/preSharedKeyAdapter";
import { AddPreSharedKey, PskListOptions } from "./types";

export class BootstrapApi {
    private readonly _endpoints: Endpoints;

    /**
     * The API can be initalized with a .env file in the wroking directory with the following values
     *
     * MBED_CLOUD_SDK_API_KEY=<Pelion DM API Key>
     *
     * and optionally
     *
     * MBED_CLOUD_SDK_HOST=<your host> (defaults to https://api.us-east-1.mbedcloud.com)
     *
     * OR
     * This API is initialized with [ConnectionOptions](../interfaces/connectionoptions.html).
     *
     * To create an instance of this API in [Node.js](https://nodejs.org):
     *
     * ```JavaScript
     * var PelionDMSDK = require("mbed-cloud-sdk");
     *
     * var bootstrap = new PelionDMSDK.BootstrapApi({
     *     apiKey: "<Pelion DM API Key>"
     * });
     * ```
     *
     * To create an instance of this API in the browser:
     *
     * ```html
     * <script src="<pelion-dm-sdk>/bundles/update.min.js"></script>
     *
     * <script>
     *     var bootstrap = new MbedCloudSDK.BootstrapApi({
     *         apiKey: "<Pelion DM API Key>"
     *     });
     * </script>
     * ```
     * @param options Connection objects
     */
    constructor(options?: ConfigOptions) {
        this._endpoints = new Endpoints(options);
    }

    /**
     * List Psks
     *
     * Example:
     * ```JavaScript
     * bootstrap.listPsks()
     * .then(psks => {
     *     // Utilize psks here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param options options
     * @returns Promise of listResponse
     */
    public listPsks(options?: PskListOptions): Promise<ListResponse<PreSharedKey>>;
    /**
     * List Psks
     *
     * Example:
     * ```JavaScript
     * bootstrap.listPsks(function(error, psks) {
     *     if (error) throw error;
     *     // Utilize psks here
     * });
     * ```
     *
     * @param options options
     * @param callback A function that is passed the arguments (error, listResponse)
     */
    public listPsks(options?: PskListOptions, callback?: CallbackFn<ListResponse<PreSharedKey>>): void;
    public listPsks(
        options?: any,
        callback?: CallbackFn<ListResponse<PreSharedKey>>
    ): Promise<ListResponse<PreSharedKey>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        return apiWrapper(
            resultsFn => {
                const { limit, after } = options as PskListOptions;
                this._endpoints.bootstrap.listPreSharedKeys(limit, after, resultsFn);
            },
            (data, done) => {
                let keys: Array<PreSharedKey>;
                if (data && data.data && data.data.length) {
                    keys = data.data.map(key => {
                        return mapToSDK(key, this);
                    });
                }

                done(null, new ListResponse(data, keys));
            },
            callback
        );
    }

    /**
     * Set a device's pre-shared key.
     *
     * Example:
     * ```JavaScript
     * bootstrap.addPsk({endpointName: 'abc', secretHex: 'secret'})
     * .then(preSharedKey => {
     *     // success
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param preSharedKey Claim details
     * @returns Promise of bootstrap claim
     */
    public addPsk(preSharedKey: AddPreSharedKey): Promise<PreSharedKey>;
    /**
     * Set a device's pre-shared key.
     *
     * Example:
     * ```JavaScript
     * bootstrap.addPsk({endpointName: 'abc', secretHex: 'secret'},
     * function(error, preSharedKey) {
     *     if (error) throw error;
     *     // success
     * });
     * ```
     *
     * @param presharedkey Claim details
     * @param callback A function that is passed the arguments (error, presharedkey)
     */
    public addPsk(preSharedKey: AddPreSharedKey, callback: CallbackFn<PreSharedKey>): void;
    public addPsk(preSharedKey: AddPreSharedKey, callback?: CallbackFn<PreSharedKey>): Promise<PreSharedKey> {
        return apiWrapper(
            resultsFn => {
                this._endpoints.bootstrap.uploadPreSharedKey(mapToSpec(preSharedKey), resultsFn);
            },
            (_data, done) => {
                done(null, mapFrom(preSharedKey, this));
            },
            callback
        );
    }

    /**
     * Get a device's pre-shared key
     *
     * note: the secretHex will not be included in the response
     *
     * Example:
     * ```JavaScript
     * bootstrap.getPsk('abc')
     * .then(preSharedKey => {
     *     // success
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param preSharedKey Claim details
     * @returns Promise of bootstrap claim
     */
    public getPsk(preSharedKey: string): Promise<PreSharedKey>;
    /**
     * Get a device's pre-shared key
     *
     * note: the secretHex will not be included in the response
     *
     * Example:
     * ```JavaScript
     * bootstrap.getPsk('abc',
     * function(error, preSharedKey) {
     *     if (error) throw error;
     *     // success
     * });
     * ```
     *
     * @param presharedkey Claim details
     * @param callback A function that is passed the arguments (error, presharedkey)
     */
    public getPsk(preSharedKey: string, callback: CallbackFn<PreSharedKey>): void;
    public getPsk(preSharedKey: string, callback?: CallbackFn<PreSharedKey>): Promise<PreSharedKey> {
        return apiWrapper(
            resultsFn => {
                this._endpoints.bootstrap.getPreSharedKey(preSharedKey, resultsFn);
            },
            (data, done) => {
                done(null, mapToSDK(data, this));
            },
            callback
        );
    }

    /**
     * Delete a device's pre-shared key.
     *
     * Example:
     * ```JavaScript
     * bootstrap.deletePsk('abc')
     * .then(preSharedKey => {
     *     // success
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param preSharedKey Claim details
     * @returns Promise of bootstrap claim
     */
    public deletePsk(preSharedKey: string): Promise<void>;
    /**
     * Delete a device's pre-shared key.
     *
     * Example:
     * ```JavaScript
     * bootstrap.deletePsk('abc',
     * function(error, preSharedKey) {
     *     if (error) throw error;
     *     // success
     * });
     * ```
     *
     * @param presharedkey Claim details
     * @param callback A function that is passed the arguments (error, presharedkey)
     */
    public deletePsk(preSharedKey: string, callback: CallbackFn<void>): void;
    public deletePsk(preSharedKey: string, callback?: CallbackFn<void>): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this._endpoints.bootstrap.deletePreSharedKey(preSharedKey, resultsFn);
            },
            (_data, done) => {
                done(null, null);
            },
            callback
        );
    }

    /**
     * Get meta data for the last Pelion Device Management API call
     * @returns Promise of meta data
     */
    public getLastApiMetadata(): Promise<ApiMetadata>;
    /**
     * Get meta data for the last Pelion Device Management API call
     * @param callback A function that is passed the arguments (error, meta data)
     */
    public getLastApiMetadata(callback: CallbackFn<ApiMetadata>): void;
    public getLastApiMetadata(callback?: CallbackFn<ApiMetadata>): Promise<ApiMetadata> {
        return asyncStyle(done => {
            done(null, this._endpoints.getLastMeta());
        }, callback);
    }
}
