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

import { ComparisonObject, ListOptions } from "../common/interfaces";

export type MechanismEnum = "connector" | "direct";
export type DeviceStateEnum = "unenrolled" | "cloud_enrolling" | "bootstrapped" | "registered" | "deregistered";

export interface DeviceObject {
    /**
     * This is the value of the CN field (in the Subject) of the Issuer of the certificate.
     */
    certificateIssuerId?: string;
    /**
     * This is not part of the certificate but rather the SH-256 hash of the certificate.
     */
    certificateFingerprint?: string;
    /**
     * The name of the device
     */
    name?: string;
    /**
     * The alias of the device
     */
    alias?: string;
    /**
     * The description of the device
     */
    description?: string;
    /**
     * The type of the device - e.g. if the device is a gateway.
     */
    deviceType?: string;
    /**
     * The device name of the host gateway, if appropriate.
     */
    hostGateway?: string;
    /**
     * Up to 5 custom JSON attributes
     */
    customAttributes?: { [key: string]: string };
}

export interface AddDeviceObject extends DeviceObject {
    /**
     * The current state of the device
     */
    state?: DeviceStateEnum;
    /**
     * The device class
     */
    deviceClass?: string;
    /**
     * The device execution mode
     */
    deviceExecutionMode?: number;
    /**
     * The serial number of the device
     */
    serialNumber?: string;
    /**
     * The device vendor ID
     */
    vendorId?: string;
    /**
     * Expiration date of the certificate used to connect to connector server
     */
    connectorCertificateExpiration?: Date;
    /**
     * Expiration date of the certificate used to connect to bootstrap server
     */
    bootstrapCertificateExpiration?: Date;
    /**
     * The date and time the device was bootstrapped
     */
    bootstrappedTimestamp?: Date;
    /**
     * The ID of the channel used to communicate with the device
     */
    mechanism?: MechanismEnum;
    /**
     * The address of the connector to use
     */
    mechanismUrl?: string;
    /**
     * The SHA256 checksum of the current firmware image
     */
    firmwareChecksum?: string;
}

export interface UpdateDeviceObject extends DeviceObject {
    /**
     * The ID of the device
     */
    id: string;
}

export interface QueryObject {
    /**
     * The name of the query
     */
    name?: string;
    /**
     * The device filter
     *
     * Constructed like so:
     *  ```JavaScript
     *  filter: {
     *    state: { $eq: "bootstrapped" },
     *    createdAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *    updatedAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *    customAttributes: {
     *      <custom_name_1>: { $eq: "custom_value_1" },
     *      <custom_name_2>: { $ne: "custom_value_2" }
     *    }
     *  }
     *  ```
     */
    filter?: {
        accountId?: ComparisonObject<string>;
        bootstrapCertificateExpiration?: ComparisonObject<Date>;
        bootstrappedTimestamp?: ComparisonObject<Date>;
        certificateIssuerId?: ComparisonObject<string>;
        connectorCertificateExpiration?: ComparisonObject<Date>;
        createdAt?: ComparisonObject<Date>;
        description?: ComparisonObject<string>;
        deviceClass?: ComparisonObject<string>;
        certificateFingerprint?: ComparisonObject<string>;
        alias?: ComparisonObject<string>;
        firmwareChecksum?: ComparisonObject<string>;
        manifestTimestamp?: ComparisonObject<Date>;
        mechanism?: ComparisonObject<string>;
        mechanismUrl?: ComparisonObject<string>;
        name?: ComparisonObject<string>;
        serialNumber?: ComparisonObject<string>;
        state?: ComparisonObject<string>;
        updatedAt?: ComparisonObject<Date>;
        vendorId?: ComparisonObject<string>;
        deviceType?: ComparisonObject<string>;
        hostGateway?: ComparisonObject<string>;
        customAttributes?: { [key: string]: ComparisonObject<string> };
    };
}

export interface UpdateQueryObject extends QueryObject {
    /**
     * The ID of the query
     */
    id: string;
}

export interface AddQueryObject extends QueryObject {
    /**
     * The name of the query
     */
    name: string;
    /**
     * The device filter
     *
     * Constructed like so:
     *  ```JavaScript
     *  filter: {
     *    state: { $eq: "bootstrapped" },
     *    createdAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *    updatedAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *    customAttributes: {
     *      <custom_name_1>: { $eq: "custom_value_1" },
     *      <custom_name_2>: { $ne: "custom_value_2" }
     *    }
     *  }
     *  ```
     */
    filter: {
        accountId?: ComparisonObject<string>;
        bootstrapCertificateExpiration?: ComparisonObject<Date>;
        bootstrappedTimestamp?: ComparisonObject<Date>;
        certificateIssuerId?: ComparisonObject<string>;
        connectorCertificateExpiration?: ComparisonObject<Date>;
        createdAt?: ComparisonObject<Date>;
        description?: ComparisonObject<string>;
        deviceClass?: ComparisonObject<string>;
        certificateFingerprint?: ComparisonObject<string>;
        alias?: ComparisonObject<string>;
        firmwareChecksum?: ComparisonObject<string>;
        manifestTimestamp?: ComparisonObject<Date>;
        mechanism?: ComparisonObject<string>;
        mechanismUrl?: ComparisonObject<string>;
        name?: ComparisonObject<string>;
        serialNumber?: ComparisonObject<string>;
        state?: ComparisonObject<string>;
        updatedAt?: ComparisonObject<Date>;
        vendorId?: ComparisonObject<string>;
        deviceType?: ComparisonObject<string>;
        hostGateway?: ComparisonObject<string>;
        customAttributes?: { [key: string]: ComparisonObject<string> };
    };
}

/**
 * Options to use when listing devices
 */
export interface DeviceListOptions extends ListOptions {
    /**
     * The device filter
     *
     * Constructed like so:
     *  ```JavaScript
     *  filter: {
     *    state: { $eq: "bootstrapped" },
     *    createdAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *    updatedAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *    customAttributes: {
     *      <custom_name_1>: { $eq: "custom_value_1" },
     *      <custom_name_2>: { $ne: "custom_value_2" }
     *    }
     *  }
     *  ```
     * ### Other example filters
     * Currently connected devices:
     * ```
     * filter: {
     *     state: { $eq: "registered" }
     * }
     * ```
     *
     * Directly connected devices (not via gateways):
     * ```
     * filter: {
     *     hostGateway: { $eq: "" },
     *     deviceType: { $eq: "" }
     * }
     * ```
     *
     * Devices connected via gateways:
     * ```
     * filter: {
     *     hostGateway: { $neq: "" }
     * }
     * ```
     *
     * Gateway devices:
     * ```
     * filter: {
     *     deviceType: { $eq: "MBED_GW" }
     * }
     * ```
     */
    filter?: {
        accountId?: ComparisonObject<string>;
        bootstrapCertificateExpiration?: ComparisonObject<Date>;
        bootstrappedTimestamp?: ComparisonObject<Date>;
        certificateIssuerId?: ComparisonObject<string>;
        connectorCertificateExpiration?: ComparisonObject<Date>;
        createdAt?: ComparisonObject<Date>;
        description?: ComparisonObject<string>;
        deviceClass?: ComparisonObject<string>;
        certificateFingerprint?: ComparisonObject<string>;
        alias?: ComparisonObject<string>;
        firmwareChecksum?: ComparisonObject<string>;
        manifestTimestamp?: ComparisonObject<Date>;
        mechanism?: ComparisonObject<string>;
        mechanismUrl?: ComparisonObject<string>;
        name?: ComparisonObject<string>;
        serialNumber?: ComparisonObject<string>;
        state?: ComparisonObject<string>;
        updatedAt?: ComparisonObject<Date>;
        vendorId?: ComparisonObject<string>;
        deviceType?: ComparisonObject<string>;
        hostGateway?: ComparisonObject<string>;
        customAttributes?: { [key: string]: ComparisonObject<string> };
    };
}

/**
 * Options to use when listing queries
 */
export interface QueryListOptions extends ListOptions {
    /**
     * The query filter
     *
     * Constructed like so:
     *  ```JavaScript
     *  filter: {
     *    name: { $eq: "test" },
     *    createdAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") },
     *    updatedAt: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") }
     *  }
     *  ```
     */
    filter?: {
        name?: ComparisonObject<string>;
        createdAt?: ComparisonObject<Date>;
        updatedAt?: ComparisonObject<Date>;
    };
}

/**
 * Options to use when listing device events
 */
export interface DeviceEventListOptions extends ListOptions {
    /**
     * The device event filter
     *
     * Constructed like so:
     *  ```JavaScript
     *  filter: {
     *    deviceId: { $eq: "1" },
     *    eventDate: { $gte: new Date("01-01-2014"), $lte: new Date("01-01-2018") }
     *  }
     *  ```
     */
    filter?: {
        type?: ComparisonObject<string>;
        deviceId?: ComparisonObject<string>;
        eventDate?: ComparisonObject<Date>;
    };
}
