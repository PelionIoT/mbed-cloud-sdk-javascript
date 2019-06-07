import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *FirmwareImageCreatedAtFilter
 */
export interface FirmwareImageCreatedAtFilter {
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
 *FirmwareImageDatafileUrlFilter
 */
export interface FirmwareImageDatafileUrlFilter {
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
 *FirmwareImageDatafileChecksumFilter
 */
export interface FirmwareImageDatafileChecksumFilter {
    /**
     *datafileChecksum equal to
     */
    eq?: string;
    /**
     *datafileChecksum not equal to
     */
    neq?: string;
    /**
     *datafileChecksum in
     */
    in?: Array<string>;
    /**
     *datafileChecksum not in
     */
    nin?: Array<string>;
}
/**
 *FirmwareImageDatafileSizeFilter
 */
export interface FirmwareImageDatafileSizeFilter {
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
 *FirmwareImageDescriptionFilter
 */
export interface FirmwareImageDescriptionFilter {
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
 *FirmwareImageIdFilter
 */
export interface FirmwareImageIdFilter {
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
 *FirmwareImageNameFilter
 */
export interface FirmwareImageNameFilter {
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
 *FirmwareImageUpdatedAtFilter
 */
export interface FirmwareImageUpdatedAtFilter {
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
 *FirmwareImageFilter
 */
export interface FirmwareImageFilter {
    /**
     *Filter by createdAt on FirmwareImage
     */
    createdAt?: FirmwareImageCreatedAtFilter;
    /**
     *Filter by datafileUrl on FirmwareImage
     */
    datafileUrl?: string | FirmwareImageDatafileUrlFilter;
    /**
     *Filter by datafileChecksum on FirmwareImage
     */
    datafileChecksum?: string | FirmwareImageDatafileChecksumFilter;
    /**
     *Filter by datafileSize on FirmwareImage
     */
    datafileSize?: number | FirmwareImageDatafileSizeFilter;
    /**
     *Filter by description on FirmwareImage
     */
    description?: string | FirmwareImageDescriptionFilter;
    /**
     *Filter by id on FirmwareImage
     */
    id?: string | FirmwareImageIdFilter;
    /**
     *Filter by name on FirmwareImage
     */
    name?: string | FirmwareImageNameFilter;
    /**
     *Filter by updatedAt on FirmwareImage
     */
    updatedAt?: FirmwareImageUpdatedAtFilter;
}
/**
 *FirmwareImageListOptions
 */
export interface FirmwareImageListOptions extends ListOptions {
    /**
     *Filter for FirmwareImage
     */
    filter?: FirmwareImageFilter;
}
