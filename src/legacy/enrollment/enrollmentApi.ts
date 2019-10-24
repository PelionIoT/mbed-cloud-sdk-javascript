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
import { CallbackFn, ListOptions } from "../common/interfaces";
import { AddEnrollmentClaim } from "./types";
import { EnrollmentClaim } from "./models/enrollmentClaim";
import { ListResponse } from "../common/listResponse";
import * as EnrollmentAdapter from "./models/enrollmentClaimAdapter";
import { ApiMetadata } from "../common/apiMetadata";
import { ConfigOptions } from "../../common/config";

export class EnrollmentApi {
    private readonly _endpoints: Endpoints;

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
    constructor(options?: ConfigOptions) {
        this._endpoints = new Endpoints(options);
    }

    /**
     * Place an enrollment claim for a device.
     *
     * Example:
     * ```JavaScript
     * enrollment.addEnrollmentClaim({
     *     claimId: 'A-35:e7:72:8a:07:50:3b:3d:75:96:57:52:72:41:0d:78:cc:c6:e5:53:48:c6:65:58:5b:fa:af:4d:2d:73:95:c5'
     * })
     * .then(enrollmentClaim => {
     *     // Utilize claim here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param enrollmentClaim Claim details
     * @returns Promise of enrollment claim
     */
    public addEnrollmentClaim(enrollmentClaim: AddEnrollmentClaim): Promise<EnrollmentClaim>;
    /**
     * Place an enrollment claim for a device.
     *
     * Example:
     * ```JavaScript
     * enrollment.addEnrollmentClaim({
     *     claimId: 'A-35:e7:72:8a:07:50:3b:3d:75:96:57:52:72:41:0d:78:cc:c6:e5:53:48:c6:65:58:5b:fa:af:4d:2d:73:95:c5'
     * }, function(error, enrollmentClaim) {
     *     if (error) throw error;
     *     // Utilize enrollment claim here
     * });
     * ```
     *
     * @param enrollmentClaim Claim details
     * @param callback A function that is passed the arguments (error, enrollmentClaim)
     */
    public addEnrollmentClaim(enrollmentClaim: AddEnrollmentClaim, callback: CallbackFn<EnrollmentClaim>): void;
    public addEnrollmentClaim(enrollmentClaim: AddEnrollmentClaim, callback?: CallbackFn<EnrollmentClaim>): Promise<EnrollmentClaim> {
        return apiWrapper( resultsFn => {
            this._endpoints.enrollment.createDeviceEnrollment(EnrollmentAdapter.addMap(enrollmentClaim), resultsFn);
        }, (data, done) => {
            done(null, EnrollmentAdapter.map(data, this));
        }, callback);
    }

    /**
     * Gets details of an enrollment.
     *
     * Example:
     * ```JavaScript
     * enrollment.getEnrollmentClaim('sckv52bebji8dxnxuw3zvnon95u8gshm'')
     * .then(enrollmentClaim => {
     *     // Utilize enrollment claim here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param claimId Enrollment claim ID
     * @returns Promise of enrollment claim
     */
    public getEnrollmentClaim(claimId: string): Promise<EnrollmentClaim>;
    /**
     * Gets details of an enrollment.
     *
     * Example:
     * ```JavaScript
     * enrollment.getEnrollmentClaim('sckv52bebji8dxnxuw3zvnon95u8gshm', function(error, enrollmentClaim) {
     *     if (error) throw error;
     *     // Utilize claim here
     * });
     * ```
     *
     * @param claimId Enrollment claim ID
     * @param callback A function that is passed the arguments (error, enrollmentClaim)
     */
    public getEnrollmentClaim(claimId: string, callback: CallbackFn<EnrollmentClaim>): void;
    public getEnrollmentClaim(claimId: string, callback?: CallbackFn<EnrollmentClaim>): Promise<EnrollmentClaim> {
        return apiWrapper( resultsFn => {
            this._endpoints.enrollment.getDeviceEnrollment(claimId, resultsFn);
        }, (data, done) => {
            done(null, EnrollmentAdapter.map(data, this));
        }, callback);
    }

    /**
     * Get enrollment list.
     *
     * Example:
     * ```JavaScript
     * enrollment.listEnrollmentClaims({
     *     limit: 100
     * })
     * .then(claims => {
     *     // Utilize claims here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param options list options
     * @returns Promise of devices
     */
    public listEnrollmentClaims(options?: ListOptions): Promise<ListResponse<EnrollmentClaim>>;
    /**
     * Get enrollment list.
     *
     * Example:
     * ```JavaScript
     * enrollment.listEnrollmentClaims({
     *     limit: 100
     * }, function(error, claims) {
     *     if (error) throw error;
     *     // Utilize claims here
     * });
     * ```
     *
     * @param options List options or callback
     * @param callback A function that is passed the arguments (error, claims)
     */
    public listEnrollmentClaims(options?: ListOptions, callback?: CallbackFn<ListResponse<EnrollmentClaim>>): void;
    public listEnrollmentClaims(options?: any, callback?: CallbackFn<ListResponse<EnrollmentClaim>>): Promise<ListResponse<EnrollmentClaim>> {
        options = options || {};

        if (typeof options === "function") {
            callback = options;
        }

        return apiWrapper( resultsFn => {
            const { limit, after, order, include } = options;
            this._endpoints.enrollment.getDeviceEnrollments(limit, order, after, encodeInclude(include), resultsFn);
        }, (data, done) => {
            const devices = data.data.map( device => {
                return EnrollmentAdapter.map(device, this);
            });

            done(null, new ListResponse<EnrollmentClaim>(data, devices));
        }, callback);
    }

    /**
     * Delete an enrollment claim.
     *
     * Example:
     * ```JavaScript
     * enrollment.deleteEnrollmentClaim('sckv52bebji8dxnxuw3zvnon95u8gshm')
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param claimId Enrollment claim ID
     * @returns Promise containing any error
     */
    public deleteEnrollmentClaim(claimId: string): Promise<void>;
    /**
     *
     * Delete an enrollment claim.
     *
     * Example:
     * ```JavaScript
     * enrollment.deleteEnrollmentClaim('sckv52bebji8dxnxuw3zvnon95u8gshm')
     *     if (error) throw error;
     * });
     * ```
     *
     * @param claimId Device ID
     * @param callback A function that is passed any error
     */
    public deleteEnrollmentClaim(claimId: string, callback: CallbackFn<void>): void;
    public deleteEnrollmentClaim(claimId: string, callback?: CallbackFn<void>): Promise<void> {
        return apiWrapper( resultsFn => {
            this._endpoints.enrollment.deleteDeviceEnrollment(claimId, resultsFn);
        }, (data, done) => {
            done(null, data);
        }, callback);
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
        return asyncStyle( done => {
            done(null, this._endpoints.getLastMeta());
        }, callback);
    }
}
