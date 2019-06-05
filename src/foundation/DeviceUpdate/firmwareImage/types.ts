import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *FirmwareImageFirmwareImageCreatedAtFilter
 */
export interface FirmwareImageFirmwareImageCreatedAtFilter {
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
 *FirmwareImageFirmwareImageDatafileUrlFilter
 */
export interface FirmwareImageFirmwareImageDatafileUrlFilter {
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
 *FirmwareImageFirmwareImageDatafileChecksumFilter
 */
export interface FirmwareImageFirmwareImageDatafileChecksumFilter {
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
 *FirmwareImageFirmwareImageDatafileSizeFilter
 */
export interface FirmwareImageFirmwareImageDatafileSizeFilter {
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
 *FirmwareImageFirmwareImageDescriptionFilter
 */
export interface FirmwareImageFirmwareImageDescriptionFilter {
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
 *FirmwareImageFirmwareImageIdFilter
 */
export interface FirmwareImageFirmwareImageIdFilter {
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
 *FirmwareImageFirmwareImageNameFilter
 */
export interface FirmwareImageFirmwareImageNameFilter {
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
 *FirmwareImageFirmwareImageUpdatedAtFilter
 */
export interface FirmwareImageFirmwareImageUpdatedAtFilter {
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
 *FirmwareImageFirmwareImageFilter
 */
export interface FirmwareImageFirmwareImageFilter {
    /**
     *Filter by createdAt on FirmwareImage
     */
    createdAt?: FirmwareImageFirmwareImageCreatedAtFilter;

    /**
     *Filter by datafileUrl on FirmwareImage
     */
    datafileUrl?: string | FirmwareImageFirmwareImageDatafileUrlFilter;

    /**
     *Filter by datafileChecksum on FirmwareImage
     */
    datafileChecksum?: string | FirmwareImageFirmwareImageDatafileChecksumFilter;

    /**
     *Filter by datafileSize on FirmwareImage
     */
    datafileSize?: number | FirmwareImageFirmwareImageDatafileSizeFilter;

    /**
     *Filter by description on FirmwareImage
     */
    description?: string | FirmwareImageFirmwareImageDescriptionFilter;

    /**
     *Filter by id on FirmwareImage
     */
    id?: string | FirmwareImageFirmwareImageIdFilter;

    /**
     *Filter by name on FirmwareImage
     */
    name?: string | FirmwareImageFirmwareImageNameFilter;

    /**
     *Filter by updatedAt on FirmwareImage
     */
    updatedAt?: FirmwareImageFirmwareImageUpdatedAtFilter;
}
/**
 *FirmwareImageFirmwareImageListOptions
 */
export interface FirmwareImageFirmwareImageListOptions extends ListOptions {
    /**
     *Filter for FirmwareImage
     */
    filter?: FirmwareImageFirmwareImageFilter;
}
