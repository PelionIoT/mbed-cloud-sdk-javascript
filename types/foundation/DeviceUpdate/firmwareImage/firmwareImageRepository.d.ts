/// <reference types="node" />
import { Repository } from "../../../common/repository";
import { FirmwareImage } from "./firmwareImage";
import { FirmwareImageListOptions } from "./types";
import { ReadStream } from "fs";
import { Paginator } from "../../../common/pagination";
import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *FirmwareImage repository
 */
export declare class FirmwareImageRepository extends Repository {
    /**
     * create
     * @param firmwareImageFile - The firmware image file to upload
     */
    create(firmwareImageFile: ReadStream | Buffer | File | Blob, options?: {
        description?: string;
        name?: string;
    }): Promise<FirmwareImage>;
    /**
     * delete
     * @param id - The firmware image ID
     */
    delete(id: string): Promise<void>;
    /**
     * list
     * @param options - Options to use for the List
     */
    list(options?: FirmwareImageListOptions): Paginator<FirmwareImage, ListOptions>;
    /**
     * read
     * @param id - The firmware image ID
     */
    read(id: string): Promise<FirmwareImage>;
}
