import { CallbackFn, ConnectionOptions } from "../common/interfaces";
import { AddPreSharedKey, PskListOptions } from "./types";
import { PreSharedKey } from "./models/preSharedKey";
import { ApiMetadata } from "../common/apiMetadata";
import { ListResponse } from "../common/listResponse";
export declare class BootstrapApi {
    private readonly _endpoints;
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
    constructor(options?: ConnectionOptions);
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
    listPsks(options?: PskListOptions): Promise<ListResponse<PreSharedKey>>;
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
    listPsks(options?: PskListOptions, callback?: CallbackFn<ListResponse<PreSharedKey>>): void;
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
    addPsk(preSharedKey: AddPreSharedKey): Promise<PreSharedKey>;
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
    addPsk(preSharedKey: AddPreSharedKey, callback: CallbackFn<PreSharedKey>): void;
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
    getPsk(preSharedKey: string): Promise<PreSharedKey>;
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
    getPsk(preSharedKey: string, callback: CallbackFn<PreSharedKey>): void;
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
    deletePsk(preSharedKey: string): Promise<void>;
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
    deletePsk(preSharedKey: string, callback: CallbackFn<void>): void;
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
