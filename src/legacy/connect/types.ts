/*
* Pelion Device Management JavaScript SDK
* Copyright Arm Limited 2017
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

import { CallbackFn, Order } from "../common/interfaces";
import { TlvValue } from "../../common/tlv";
import { ConfigOptions } from "../../common/config";

export interface ConnectOptions extends ConfigOptions {
    /**
     * @deprecated will detect webhook usage with a call to updateWebhook
     */
    handleNotifications?: boolean;
    /**
     * Whether to clear any existing notification channel or webhook
     */
    forceClear?: boolean;
    /**
     * If true, will start receiving notifications automatically. Otherwise explicit calls to startNotifications or updateWebhook are required
     */
    autostartNotifications?: boolean;
    /**
     * If true and running in node, sdk will not cleanup channels on exit of program
     */
    skipCleanup?: boolean;
}
export type DeliveryMethod = "SERVER_INITIATED" | "CLIENT_INITIATED";

export interface NotificationObject {
    /**
     * Notifications
     */
    notifications?: Array<any>;
    /**
     * New device registration notifications
     */
    registrations?: Array<any>;
    /**
     * Device registration update notifications
     */
    "reg-updates"?: Array<any>;
    /**
     * Device deregistration notifications
     */
    "de-registrations"?: Array<any>;
    /**
     * Device registration expiry notifications
     */
    "registrations-expired"?: Array<any>;
    /**
     * Asynchronous resoonse notifications
     */
    "async-responses"?: Array<any>;
}

/**
 * The types of device event
 */
export type DeviceEventEnum = "expired" | "registration" | "reregistration" | "deregistration";

export interface DeviceEvent<T> {
    /**
     * The ID of the device
     */
    id?: string;
    /**
     * The type of the device
     */
    type?: string;
    /**
     * The queue mode of the device
     */
    queueMode?: boolean;
    /**
     * The resources of the device
     */
    resources?: Array<T>;
    /**
     * The type of device event
     */
    event?: DeviceEventEnum;
}

export interface DeviceEventFilter {
    /**
     * Device Ids to be notified of
     */
    id?: string | Array<string>;
    /**
     * Device Events to be notified of
     */
    event?: DeviceEventEnum | Array<DeviceEventEnum>;
}

export type FirstValueEnum = "OnRegistration" | "OnValueUpdate";

export interface ResourceValuesFilter {
    /**
     * device Id
     */
    deviceId?: string | Array<string>;

    /**
     * Resource Paths
     */
    resourcePaths?: Array<string>;
}

export interface NotificationData {
    path?: string;
    maxAge?: string;
    payload?: string | number | IterableIterator<TlvValue>;
    deviceId?: string;
    contentType?: string;
}

export interface AsyncResponse {
    /**
     * Asynchronous response unique ID.
     */
    id?: string;
    /**
     * HTTP status code, for example 200 for OK.
     */
    status?: number;
    /**
     * Content type
     */
    ct?: string;
    /**
     * Requested data, base64 encoded.
     */
    payload?: string;
    /**
     * Determines how long this value will be valid in cache, in seconds. 0 means that value is not stored in cache.
     */
    "max-age"?: string;
    /**
     * Optional error message, describing the error.
     */
    error?: string;
}

export interface NotificationOptions {
    /**
     * @deprecated not needed as long polling is no longer used
     */
    interval?: number;
    /**
     * A function that is passed any asynchronous responses
     */
    requestCallback?: CallbackFn<Array<AsyncResponse>>;
    /**
     * @deprecated please use forceClear on ConnectionOptions
     */
    forceClear?: boolean;
}

export interface PresubscriptionObject {
    /**
     * The device id (optionally having an * character at the end)
     */
    deviceId?: string;
    /**
     * The device type
     */
    deviceType?: string;
    /**
     * A list of resources to subscribe to. Allows wildcards to subscribe to multiple resources at once
     */
    resourcePaths?: Array<string>;
}

export type MetricsIncludeEnum = "handshakes" | "transactions" | "observations" | "successfulApiCalls" | "failedApiCalls" | "successfulProxyRequests" | "failedProxyRequests" | "successfulSubscriptionRequests" | "failedSubscriptionRequests" | "successfulBootstraps" | "failedBootstraps" | "pendingBootstraps" | "fullRegistrations" | "updatedRegistrations" | "expiredRegistrations" | "deletedRegistrations";

export type UnitType = "minutes" | "hours" | "days" | "weeks";

export interface TimePeriod {
    /**
     * The time period unit
     */
    unit: UnitType;
    /**
     * The unit duration
     */
    duration: number;
}

export interface MetricsListOptions {
    /**
     * How many objects to retrieve in the page
     */
    limit?: number;
    /**
     * ASC or DESC
     */
    order?: Order;
    /**
     * The ID of the the item after which to retrieve the next page
     */
    after?: string;
    /**
     * Optional metrics fields to include
     */
    include?: Array<MetricsIncludeEnum>;
    /**
     * Group data by this interval, defaults to 1 day
     */
    interval?: TimePeriod;
}

export interface MetricsStartEndListOptions extends MetricsListOptions {
    /**
     * Start date
     */
    start: Date;
    /**
     * End date
     */
    end: Date;
}

export interface MetricsPeriodListOptions extends MetricsListOptions {
    /**
     * Fetch data for this period until now
     */
    period: TimePeriod;
}
