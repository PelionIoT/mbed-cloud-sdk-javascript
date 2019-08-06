import { ListOptions } from "../../../common";
/**
 *FirmwareManifestCreatedAtFilter
 */
export interface FirmwareManifestCreatedAtFilter {
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
 *FirmwareManifestDatafileUrlFilter
 */
export interface FirmwareManifestDatafileUrlFilter {
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
 *FirmwareManifestDatafileSizeFilter
 */
export interface FirmwareManifestDatafileSizeFilter {
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
 *FirmwareManifestDescriptionFilter
 */
export interface FirmwareManifestDescriptionFilter {
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
 *FirmwareManifestDeviceClassFilter
 */
export interface FirmwareManifestDeviceClassFilter {
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
 *FirmwareManifestIdFilter
 */
export interface FirmwareManifestIdFilter {
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
 *FirmwareManifestNameFilter
 */
export interface FirmwareManifestNameFilter {
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
 *FirmwareManifestTimestampFilter
 */
export interface FirmwareManifestTimestampFilter {
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
 *FirmwareManifestUpdatedAtFilter
 */
export interface FirmwareManifestUpdatedAtFilter {
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
 *FirmwareManifestFilter
 */
export interface FirmwareManifestFilter {
    /**
     *Filter by createdAt on FirmwareManifest
     */
    createdAt?: FirmwareManifestCreatedAtFilter;

    /**
     *Filter by datafileUrl on FirmwareManifest
     */
    datafileUrl?: string | FirmwareManifestDatafileUrlFilter;

    /**
     *Filter by datafileSize on FirmwareManifest
     */
    datafileSize?: number | FirmwareManifestDatafileSizeFilter;

    /**
     *Filter by description on FirmwareManifest
     */
    description?: string | FirmwareManifestDescriptionFilter;

    /**
     *Filter by deviceClass on FirmwareManifest
     */
    deviceClass?: string | FirmwareManifestDeviceClassFilter;

    /**
     *Filter by id on FirmwareManifest
     */
    id?: string | FirmwareManifestIdFilter;

    /**
     *Filter by name on FirmwareManifest
     */
    name?: string | FirmwareManifestNameFilter;

    /**
     *Filter by timestamp on FirmwareManifest
     */
    timestamp?: FirmwareManifestTimestampFilter;

    /**
     *Filter by updatedAt on FirmwareManifest
     */
    updatedAt?: FirmwareManifestUpdatedAtFilter;
}
/**
 *FirmwareManifestListOptions
 */
export interface FirmwareManifestListOptions extends ListOptions {
    /**
     *Filter for FirmwareManifest
     */
    filter?: FirmwareManifestFilter;
}
