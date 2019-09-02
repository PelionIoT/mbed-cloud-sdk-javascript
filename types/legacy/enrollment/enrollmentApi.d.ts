import { CallbackFn, ConnectionOptions, ListOptions } from "../common/interfaces";
import { AddEnrollmentClaim } from "./types";
import { EnrollmentClaim } from "./models/enrollmentClaim";
import { ListResponse } from "../common/listResponse";
import { ApiMetadata } from "../common/apiMetadata";
export declare class EnrollmentApi {
    private readonly _endpoints;
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
    constructor(options?: ConnectionOptions);
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
    addEnrollmentClaim(enrollmentClaim: AddEnrollmentClaim): Promise<EnrollmentClaim>;
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
    addEnrollmentClaim(enrollmentClaim: AddEnrollmentClaim, callback: CallbackFn<EnrollmentClaim>): void;
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
    getEnrollmentClaim(claimId: string): Promise<EnrollmentClaim>;
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
    getEnrollmentClaim(claimId: string, callback: CallbackFn<EnrollmentClaim>): void;
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
    listEnrollmentClaims(options?: ListOptions): Promise<ListResponse<EnrollmentClaim>>;
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
    listEnrollmentClaims(options?: ListOptions, callback?: CallbackFn<ListResponse<EnrollmentClaim>>): void;
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
    deleteEnrollmentClaim(claimId: string): Promise<void>;
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
    deleteEnrollmentClaim(claimId: string, callback: CallbackFn<void>): void;
    /**
     * Get meta data for the last Pelion Device Management API call
     * @returns Promise of meta data
     */
    getLastApiMetadata(): Promise<ApiMetadata>;
    /**
     * Get meta data for the last Pelion Device Management API call
     * @param callback A function that is passed the arguments (error, meta data)
     */
    getLastApiMetadata(callback: CallbackFn<ApiMetadata>): void;
}
