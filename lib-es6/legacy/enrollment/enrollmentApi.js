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
import { apiWrapper, encodeInclude, asyncStyle } from "../common/functions";
import { Endpoints } from "./endpoints";
import { ListResponse } from "../common/listResponse";
import * as EnrollmentAdapter from "./models/enrollmentClaimAdapter";
export class EnrollmentApi {
    /**
     * The API can be initalized with a .env file in the working directory with the following values
     *
     * MBED_CLOUD_SDK_API_KEY=<Pelion DM API Key>
     *
     * and optionally
     *
     * MBED_CLOUD_SDK_HOST=<your host> (defaults to https://api.us-east-1.mbedcloud.com)
     *
     * OR
     *
     * This API is initialized with [ConnectionOptions](../interfaces/connectionoptions.html).
     *
     * To create an instance of this API in [Node.js](https://nodejs.org):
     *
     * ```JavaScript
     * var PelionDMSDK = require("mbed-cloud-sdk");
     *
     * var update = new PelionDMSDK.UpdateApi({
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
     *     var update = new MbedCloudSDK.UpdateApi({
     *         apiKey: "<Pelion DM API Key>"
     *     });
     * </script>
     * ```
     * @param options Connection objects
     */
    constructor(options) {
        this._endpoints = new Endpoints(options);
    }
    addEnrollmentClaim(enrollmentClaim, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.enrollment.createDeviceEnrollment(EnrollmentAdapter.addMap(enrollmentClaim), resultsFn);
        }, (data, done) => {
            done(null, EnrollmentAdapter.map(data, this));
        }, callback);
    }
    getEnrollmentClaim(claimId, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.enrollment.getDeviceEnrollment(claimId, resultsFn);
        }, (data, done) => {
            done(null, EnrollmentAdapter.map(data, this));
        }, callback);
    }
    listEnrollmentClaims(options, callback) {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
        }
        return apiWrapper(resultsFn => {
            const { limit, after, order, include } = options;
            this._endpoints.enrollment.getDeviceEnrollments(limit, order, after, encodeInclude(include), resultsFn);
        }, (data, done) => {
            const devices = data.data.map(device => {
                return EnrollmentAdapter.map(device, this);
            });
            done(null, new ListResponse(data, devices));
        }, callback);
    }
    deleteEnrollmentClaim(claimId, callback) {
        return apiWrapper(resultsFn => {
            this._endpoints.enrollment.deleteDeviceEnrollment(claimId, resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
    }
    getLastApiMetadata(callback) {
        return asyncStyle(done => {
            done(null, this._endpoints.getLastMeta());
        }, callback);
    }
}
//# sourceMappingURL=enrollmentApi.js.map