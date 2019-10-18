import { ConnectionOptions, CallbackFn, ListOptions } from "../common/interfaces";
import { QuotaHistory } from "./models/quotaHistory";
import { ListResponse } from "../common/listResponse";
import { ServicePackage } from "./models/servicePackage";
export declare class BillingApi {
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
     * var billing = new PelionDMSDK.BillingApi({
     *     apiKey: "<Pelion DM API Key>"
     * });
     * ```
     *
     * To create an instance of this API in the browser:
     *
     * ```html
     * <script src="<pelion-dm-sdk>/bundles/billing.min.js"></script>
     *
     * <script>
     *     var billing = new MbedCloudSDK.BillingApi({
     *         apiKey: "<Pelion DM API Key>"
     *     });
     * </script>
     * ```
     * @param options Connection objects
     */
    constructor(options?: ConnectionOptions);
    /**
     * Get the main billing report.
     * @param month Date object for the year and month you want a report from
     * @param filepath Optional. If specified, the destination to write the billing report to.
     * @returns Promise of string. The json string for the billing report.
     */
    getReportOverview(month: Date, filepath?: string): Promise<string>;
    /**
     * Get the main billing report.
     * @param month Date object for the year and month you want a report from
     * @param filepath Optional. If specified, the destination to write the billing report to.
     * @param callback
     */
    getReportOverview(month: Date, filepath?: string, callback?: CallbackFn<string>): void;
    /**
     * Get the active devices report.
     * @param month Date object for the year and month you want a report from
     * @param filepath Optional. If specified, the destination to write the billing report to.
     * @returns Promise of string. The json string for the billing report.
     */
    getReportActiveDevices(month: Date, filepath?: string): Promise<string>;
    /**
     * Get the active devices report.
     * @param month Date object for the year and month you want a report from
     * @param filepath Optional. If specified, the destination to write the billing report to.
     * @param callback
     */
    getReportActiveDevices(month: Date, filepath?: string, callback?: CallbackFn<string>): void;
    /**
     * Get the firmware update report.
     * @param month Date object for the year and month you want a report from
     * @param filepath Optional. If specified, the destination to write the billing report to.
     * @returns Promise of string. The json string for the billing report.
     */
    getReportFirmwareUpdates(month: Date, filepath?: string): Promise<string>;
    /**
     * Get the firmware update report.
     * @param month Date object for the year and month you want a report from
     * @param filepath Optional. If specified, the destination to write the billing report to.
     * @param callback
     */
    getReportFirmwareUpdates(month: Date, filepath?: string, callback?: CallbackFn<string>): void;
    /**
     * Get the service packages in order: pending -> active -> all pending
     * @returns Promise with Array of ServicePackages
     */
    getServicePackages(): Promise<Array<ServicePackage>>;
    /**
     * Get the service packages in order: pending -> active -> all pending
     * @param callback
     */
    getServicePackages(callback: CallbackFn<Array<ServicePackage>>): void;
    /**
     * Streams content from HTTP url to file path on disk
     * @param filepath
     * @param url
     * @param done callback
     */
    private streamToFile;
    /**
     * Get all quota history
     * @param options
     * @returns Promise with List Response of QuotaHistory
     */
    getQuotaHistory(options?: ListOptions): Promise<ListResponse<QuotaHistory>>;
    /**
     * Get all quota history
     * @param options
     * @param callback
     */
    getQuotaHistory(options?: ListOptions, callback?: CallbackFn<ListResponse<QuotaHistory>>): void;
    /**
     * Get your remaining quota
     * @returns Promise of number
     */
    getQuotaRemaining(): Promise<number>;
    /**
     * Get your remaining quota
     * @param callback
     */
    getQuotaRemaining(callback: CallbackFn<number>): void;
}
