import { CallbackFn, ConnectionOptions } from "../common/interfaces";
import { AddPreSharedKey } from "./types";
import { PreSharedKey } from "./models/preSharedKey";
import { ApiMetadata } from "../common/apiMetadata";
export declare class BootstrapApi {
    private readonly _endpoints;
    /**
     * @param options Connection objects
     */
    constructor(options: ConnectionOptions);
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
     * Get meta data for the last Mbed Cloud API call
     * @returns Promise of meta data
     */
    getLastApiMetadata(): Promise<ApiMetadata>;
    /**
     * Get meta data for the last Mbed Cloud API call
     * @param callback A function that is passed the arguments (error, meta data)
     */
    getLastApiMetadata(callback: CallbackFn<ApiMetadata>): void;
}
