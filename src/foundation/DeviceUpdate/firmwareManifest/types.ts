import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *FirmwareManifestFirmwareManifestCreatedAtFilter
 */
export interface FirmwareManifestFirmwareManifestCreatedAtFilter {
    /**
     *createdAt in
     */
    in?: Array<Date>;

    /**
     *createdAt not in
     */
    nin?: Array<Date>;

    /**
     *createdAt less than
     */
    lte?: Array<Date>;

    /**
     *createdAt greater than
     */
    gte?: Array<Date>;
}
/**
 *FirmwareManifestFirmwareManifestDatafileUrlFilter
 */
export interface FirmwareManifestFirmwareManifestDatafileUrlFilter {
    /**
     *datafileUrl equal to
     */
    eq?: string;

    /**
     *datafileUrl not equal to
     */
    neq?: string;

    /**
     *datafileUrl in
     */
    in?: Array<string>;

    /**
     *datafileUrl not in
     */
    nin?: Array<string>;
}
/**
 *FirmwareManifestFirmwareManifestDatafileSizeFilter
 */
export interface FirmwareManifestFirmwareManifestDatafileSizeFilter {
    /**
     *datafileSize equal to
     */
    eq?: number;

    /**
     *datafileSize not equal to
     */
    neq?: number;

    /**
     *datafileSize in
     */
    in?: Array<number>;

    /**
     *datafileSize not in
     */
    nin?: Array<number>;
}
/**
 *FirmwareManifestFirmwareManifestDescriptionFilter
 */
export interface FirmwareManifestFirmwareManifestDescriptionFilter {
    /**
     *description equal to
     */
    eq?: string;

    /**
     *description not equal to
     */
    neq?: string;

    /**
     *description in
     */
    in?: Array<string>;

    /**
     *description not in
     */
    nin?: Array<string>;
}
/**
 *FirmwareManifestFirmwareManifestDeviceClassFilter
 */
export interface FirmwareManifestFirmwareManifestDeviceClassFilter {
    /**
     *deviceClass equal to
     */
    eq?: string;

    /**
     *deviceClass not equal to
     */
    neq?: string;

    /**
     *deviceClass in
     */
    in?: Array<string>;

    /**
     *deviceClass not in
     */
    nin?: Array<string>;
}
/**
 *FirmwareManifestFirmwareManifestIdFilter
 */
export interface FirmwareManifestFirmwareManifestIdFilter {
    /**
     *id equal to
     */
    eq?: string;

    /**
     *id not equal to
     */
    neq?: string;

    /**
     *id in
     */
    in?: Array<string>;

    /**
     *id not in
     */
    nin?: Array<string>;
}
/**
 *FirmwareManifestFirmwareManifestNameFilter
 */
export interface FirmwareManifestFirmwareManifestNameFilter {
    /**
     *name equal to
     */
    eq?: string;

    /**
     *name not equal to
     */
    neq?: string;

    /**
     *name in
     */
    in?: Array<string>;

    /**
     *name not in
     */
    nin?: Array<string>;
}
/**
 *FirmwareManifestFirmwareManifestTimestampFilter
 */
export interface FirmwareManifestFirmwareManifestTimestampFilter {
    /**
     *timestamp in
     */
    in?: Array<Date>;

    /**
     *timestamp not in
     */
    nin?: Array<Date>;

    /**
     *timestamp less than
     */
    lte?: Array<Date>;

    /**
     *timestamp greater than
     */
    gte?: Array<Date>;
}
/**
 *FirmwareManifestFirmwareManifestUpdatedAtFilter
 */
export interface FirmwareManifestFirmwareManifestUpdatedAtFilter {
    /**
     *updatedAt in
     */
    in?: Array<Date>;

    /**
     *updatedAt not in
     */
    nin?: Array<Date>;

    /**
     *updatedAt less than
     */
    lte?: Array<Date>;

    /**
     *updatedAt greater than
     */
    gte?: Array<Date>;
}
/**
 *FirmwareManifestFirmwareManifestFilter
 */
export interface FirmwareManifestFirmwareManifestFilter {
    /**
     *Filter by createdAt on FirmwareManifest
     */
    createdAt?: FirmwareManifestFirmwareManifestCreatedAtFilter;

    /**
     *Filter by datafileUrl on FirmwareManifest
     */
    datafileUrl?: string | FirmwareManifestFirmwareManifestDatafileUrlFilter;

    /**
     *Filter by datafileSize on FirmwareManifest
     */
    datafileSize?: number | FirmwareManifestFirmwareManifestDatafileSizeFilter;

    /**
     *Filter by description on FirmwareManifest
     */
    description?: string | FirmwareManifestFirmwareManifestDescriptionFilter;

    /**
     *Filter by deviceClass on FirmwareManifest
     */
    deviceClass?: string | FirmwareManifestFirmwareManifestDeviceClassFilter;

    /**
     *Filter by id on FirmwareManifest
     */
    id?: string | FirmwareManifestFirmwareManifestIdFilter;

    /**
     *Filter by name on FirmwareManifest
     */
    name?: string | FirmwareManifestFirmwareManifestNameFilter;

    /**
     *Filter by timestamp on FirmwareManifest
     */
    timestamp?: FirmwareManifestFirmwareManifestTimestampFilter;

    /**
     *Filter by updatedAt on FirmwareManifest
     */
    updatedAt?: FirmwareManifestFirmwareManifestUpdatedAtFilter;
}
/**
 *FirmwareManifestFirmwareManifestListOptions
 */
export interface FirmwareManifestFirmwareManifestListOptions extends ListOptions {
    /**
     *Filter for FirmwareManifest
     */
    filter?: FirmwareManifestFirmwareManifestFilter;
}
