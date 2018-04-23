/*
 * Mbed Cloud JavaScript SDK
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

import { apiWrapper, asyncStyle } from "../common/functions";
import { Endpoints } from "./endpoints";
import { CallbackFn, ConnectionOptions } from "../common/interfaces";
import { AddPreSharedKey } from "./types";
import { PreSharedKey } from "./models/preSharedKey";
import { mapToSDK, mapToSpec, stripToken } from "./models/preSharedKeyAdapter";
import { ApiMetadata } from "../common/apiMetadata";

export class BootstrapApi {
    private readonly _endpoints: Endpoints;

    /**
     * @param options Connection objects
     */
    constructor(options: ConnectionOptions) {
        this._endpoints = new Endpoints(options);
    }

    /**
     * Set a device's pre-shared key.
     *
     * Example:
     * ```JavaScript
     * bootstrap.addPsk({
     *     preSharedKey: new preSharedKey({endpointName: 'abc', secretHex: 'secret'})
     * })
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
     * bootstrap.addPsk({
     *     preSharedKey: new preSharedKey({endpointName: 'abc', secretHex: 'secret'})
     * }, function(error, preSharedKey) {
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
        return apiWrapper(resultsFn => {
            this._endpoints.bootstrap.uploadPreSharedKey(mapToSpec(preSharedKey), resultsFn);
        }, (_data, done) => {
            done(null, stripToken(preSharedKey, this));
        }, callback);
    }

    /**
     * Get a device's pre-shared key
     *
     * note: the secretHex will not be included in the response
     *
     * Example:
     * ```JavaScript
     * bootstrap.getPsk({
     *     preSharedKey: 'abc'
     * })
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
     * bootstrap.getPsk({
     *     preSharedKey: 'abc'
     * }, function(error, preSharedKey) {
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
        return apiWrapper(resultsFn => {
            this._endpoints.bootstrap.getPreSharedKey(preSharedKey, resultsFn);
        }, (data, done) => {
            done(null, mapToSDK(data, this));
        }, callback);
    }

    /**
     * Delete a device's pre-shared key.
     *
     * Example:
     * ```JavaScript
     * bootstrap.deletePsk({
     *     preSharedKey: 'abc'
     * })
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
     * bootstrap.getPsk({
     *     preSharedKey: 'abc'
     * }, function(error, preSharedKey) {
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
        return apiWrapper(resultsFn => {
            this._endpoints.bootstrap.deletePreSharedKey(preSharedKey, resultsFn);
        }, (_data, done) => {
            done(null, null);
        }, callback);
    }

    /**
     * Get meta data for the last Mbed Cloud API call
     * @returns Promise of meta data
     */
    public getLastApiMetadata(): Promise<ApiMetadata>;
    /**
     * Get meta data for the last Mbed Cloud API call
     * @param callback A function that is passed the arguments (error, meta data)
     */
    public getLastApiMetadata(callback: CallbackFn<ApiMetadata>): void;
    public getLastApiMetadata(callback?: CallbackFn<ApiMetadata>): Promise<ApiMetadata> {
        return asyncStyle(done => {
            done(null, this._endpoints.getLastMeta());
        }, callback);
    }
}
