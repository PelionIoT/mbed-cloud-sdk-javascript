/// <reference types="node" />
import { Repository } from "../../../common/repository";
import { DarkThemeImage } from "./darkThemeImage";
import { ReadStream } from "fs";
import { Paginator } from "../../../common/pagination";
import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *DarkThemeImage repository
 */
export declare class DarkThemeImageRepository extends Repository {
    /**
     * delete
     * @param reference - Name of the branding images (icon or picture).
     */
    delete(reference: string): Promise<DarkThemeImage>;
    /**
     * list
     * @param options - options
     */
    list(options?: ListOptions): Paginator<DarkThemeImage, ListOptions>;
    /**
     * read
     * @param reference - Name of the image.
     */
    read(reference: string): Promise<DarkThemeImage>;
    /**
     * update
     * @param image - The image in PNG or JPEG format as multipart form data.
     * @param reference - Name of the image.
     */
    update(image: ReadStream | Buffer | File | Blob, reference: string): Promise<DarkThemeImage>;
}
