import { ConnectionOptions, CallbackFn, ListOptions } from "../common/interfaces";
import { QuotaHistory } from "./models/quotaHistory";
import { ListResponse } from "../common/listResponse";
import { ServicePackage } from "./models/servicePackage";
export declare class BillingApi {
    private readonly _endpoints;
    /**
     * @param options Connection objects
     */
    constructor(options: ConnectionOptions);
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
