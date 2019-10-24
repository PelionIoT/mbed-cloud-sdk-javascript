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

import { CallbackFn, ListOptions } from "../common/interfaces";
import { Endpoints } from "./endpoints";
import { apiWrapper, dateToBillingMonth, isThisNode } from "../common/functions";
import { QuotaHistory } from "./models/quotaHistory";
import { mapQuotaHistory } from "./models/quotaHistoryAdapter";
import { ListResponse } from "../common/listResponse";
import { ServicePackageQuota, ServicePackagesResponse, ServicePackageQuotaHistoryResponse, BillingReportRawDataResponse } from "../_api/billing";
import { ServicePackage } from "./models/servicePackage";
import { mapPending, mapActive, mapPrevious } from "./models/servicePackageAdapter";
import { SDKError } from "../common/sdkError";
import { writeFile, createWriteStream } from "fs";
import { get as http_get } from "superagent";
import { ConfigOptions } from "../../common/config";

export class BillingApi {
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
    constructor(options?: ConfigOptions) {
        this._endpoints = new Endpoints(options);
    }

    /**
     * Get the main billing report.
     * @param month Date object for the year and month you want a report from
     * @param filepath Optional. If specified, the destination to write the billing report to.
     * @returns Promise of string. The json string for the billing report.
     */
    public getReportOverview(month: Date, filepath?: string): Promise<string>;
    /**
     * Get the main billing report.
     * @param month Date object for the year and month you want a report from
     * @param filepath Optional. If specified, the destination to write the billing report to.
     * @param callback
     */
    public getReportOverview(month: Date, filepath?: string, callback?: CallbackFn<string>): void;
    public getReportOverview(month: Date, filepath?: string, callback?: CallbackFn<string>): Promise<string> {
        if (typeof filepath === "function") {
            callback = filepath;
        }

        return apiWrapper( resultsFn => {
            this._endpoints.billing.getBillingReport(dateToBillingMonth(month), resultsFn);
        }, (data, done) => {
            const string = JSON.stringify(data);
            if (isThisNode()) {
                // we're in node
                if (filepath) {
                    writeFile(filepath, string, "utf8", error => {
                        if (error) {
                            return done(new SDKError(error.message), null);
                        }
                        return done(null, string);
                    });
                }
            } else {
                done(null, string);
            }
        }, callback);
    }

    /**
     * Get the active devices report.
     * @param month Date object for the year and month you want a report from
     * @param filepath Optional. If specified, the destination to write the billing report to.
     * @returns Promise of string. The json string for the billing report.
     */
    public getReportActiveDevices(month: Date, filepath?: string): Promise<string>;
    /**
     * Get the active devices report.
     * @param month Date object for the year and month you want a report from
     * @param filepath Optional. If specified, the destination to write the billing report to.
     * @param callback
     */
    public getReportActiveDevices(month: Date, filepath?: string, callback?: CallbackFn<string>): void;
    public getReportActiveDevices(month: Date, filepath?: string, callback?: CallbackFn<string>): Promise<string> {
        if (typeof filepath === "function") {
            callback = filepath;
        }

        return apiWrapper( resultsFn => {
            this._endpoints.billing.getBillingReportActiveDevices(dateToBillingMonth(month), resultsFn);
        }, (data: BillingReportRawDataResponse, done) => {
            this.streamToFile(filepath, data.url, done);
        }, callback);
    }

    /**
     * Get the firmware update report.
     * @param month Date object for the year and month you want a report from
     * @param filepath Optional. If specified, the destination to write the billing report to.
     * @returns Promise of string. The json string for the billing report.
     */
    public getReportFirmwareUpdates(month: Date, filepath?: string): Promise<string>;
    /**
     * Get the firmware update report.
     * @param month Date object for the year and month you want a report from
     * @param filepath Optional. If specified, the destination to write the billing report to.
     * @param callback
     */
    public getReportFirmwareUpdates(month: Date, filepath?: string, callback?: CallbackFn<string>): void;
    public getReportFirmwareUpdates(month: Date, filepath?: string, callback?: CallbackFn<string>): Promise<string> {
        if (typeof filepath === "function") {
            callback = filepath;
        }

        return apiWrapper( resultsFn => {
            this._endpoints.billing.getBillingReportFirmwareUpdates(dateToBillingMonth(month), resultsFn);
        }, (data: BillingReportRawDataResponse, done) => {
            this.streamToFile(filepath, data.url, done);
        }, callback);
    }

    /**
     * Get the service packages in order: pending -> active -> all pending
     * @returns Promise with Array of ServicePackages
     */
    public getServicePackages(): Promise<Array<ServicePackage>>;
    /**
     * Get the service packages in order: pending -> active -> all pending
     * @param callback
     */
    public getServicePackages(callback: CallbackFn<Array<ServicePackage>>): void;
    public getServicePackages(callback?: CallbackFn<Array<ServicePackage>>): Promise<Array<ServicePackage>> {
        return apiWrapper( resultsFn => {
            this._endpoints.billing.getServicePackages(resultsFn);
        }, (data: ServicePackagesResponse, done) => {
            const list: Array<ServicePackage> = new Array();
            if (data) {
                if (data.pending) {
                    list.push(mapPending(data.pending));
                }
                if (data.active) {
                    list.push(mapActive(data.active));
                }
                if (data.previous) {
                    data.previous.forEach( p => list.push(mapPrevious(p)));
                }
            }
            done(null, list);
        }, callback);
    }

    /**
     * Streams content from HTTP url to file path on disk
     * @param filepath
     * @param url
     * @param done callback
     */
    private streamToFile(filepath: string, url: string, done: any) {
        if (isThisNode() && filepath) {
            // we're in node and want to stream a file
            const fileStream = createWriteStream(filepath, { flags: "a+" });
            const req = http_get(url);
            // bugfix: https://github.com/segmentio/superagent-retry/issues/24
            //         https://github.com/visionmedia/superagent/issues/313
            req.pipe(fileStream).on("finish", _ => {
                done(null, url);
            });
            req.on("error", error => {
                done(new SDKError(error.message), null);
            });
        } else {
            done(null, url);
        }
    }

    /**
     * Get all quota history
     * @param options
     * @returns Promise with List Response of QuotaHistory
     */
    public getQuotaHistory(options?: ListOptions): Promise<ListResponse<QuotaHistory>>;
    /**
     * Get all quota history
     * @param options
     * @param callback
     */
    public getQuotaHistory(options?: ListOptions, callback?: CallbackFn<ListResponse<QuotaHistory>>): void;
    public getQuotaHistory(options?: any, callback?: CallbackFn<ListResponse<QuotaHistory>>): Promise<ListResponse<QuotaHistory>> {
        options = options || {};

        if (typeof options === "function") {
            callback = options;
        }

        return apiWrapper( resultsFn => {
            const { limit, after } = options;
            this._endpoints.billing.getServicePackageQuotaHistory(limit, after, resultsFn);
        }, (data: ServicePackageQuotaHistoryResponse, done) => {
            let keys: Array<QuotaHistory>;
            if (data && data.data && data.data.length) {
                keys = data.data.map( key => {
                    return mapQuotaHistory(key);
                });
            }

            done(null, new ListResponse<QuotaHistory>(data, keys));
        }, callback);
    }

    /**
     * Get your remaining quota
     * @returns Promise of number
     */
    public getQuotaRemaining(): Promise<number>;
    /**
     * Get your remaining quota
     * @param callback
     */
    public getQuotaRemaining(callback: CallbackFn<number>): void;
    public getQuotaRemaining(callback?: CallbackFn<number>): Promise<number> {
        return apiWrapper( resultsFn => {
            this._endpoints.billing.getServicePackageQuota(resultsFn);
        }, (data: ServicePackageQuota, done) => {
            if (data) {
                return done(null, data.quota);
            }
        }, callback);
    }
}
