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
import { apiWrapper, asyncStyle } from "../common/functions";
import { Endpoints } from "./endpoints";
import { mapToSDK, mapToSpec, mapFrom } from "./models/preSharedKeyAdapter";
import { ListResponse } from "../common/listResponse";
export class BootstrapApi {
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
    constructor(options) {
        this._endpoints = new Endpoints(options);
    }
    listPsks(options, callback) {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        return apiWrapper(resultsFn => {
            const { limit, after } = options;
            this._endpoints.bootstrap.listPreSharedKeys(limit, after, resultsFn);
        }, (data, done) => {
            let keys;
            if (data && data.data && data.data.length) {
                keys = data.data.map(key => {
                    return mapToSDK(key, this);
                });
            }
            done(null, new ListResponse(data, keys));
        }, callback);
    }
    addPsk(preSharedKey, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.bootstrap.uploadPreSharedKey(mapToSpec(preSharedKey), resultsFn);
        }, (_data, done) => {
            done(null, mapFrom(preSharedKey, this));
        }, callback);
    }
    getPsk(preSharedKey, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.bootstrap.getPreSharedKey(preSharedKey, resultsFn);
        }, (data, done) => {
            done(null, mapToSDK(data, this));
        }, callback);
    }
    deletePsk(preSharedKey, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.bootstrap.deletePreSharedKey(preSharedKey, resultsFn);
        }, (_data, done) => {
            done(null, null);
        }, callback);
    }
    getLastApiMetadata(callback) {
        return asyncStyle(done => {
            done(null, this._endpoints.getLastMeta());
        }, callback);
    }
}
//# sourceMappingURL=bootstrapApi.js.map