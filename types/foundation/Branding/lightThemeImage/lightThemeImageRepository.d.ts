/// <reference types="node" />
import { Repository } from "../../../common/repository";
import { LightThemeImage } from "./lightThemeImage";
import { ReadStream } from "fs";
import { Paginator } from "../../../common/pagination";
import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *LightThemeImage repository
 */
export declare class LightThemeImageRepository extends Repository {
    /**
     * delete
     * @param reference - Name of the branding images (icon or picture).
     */
    delete(reference: string): Promise<LightThemeImage>;
    /**
     * list
     * @param options - options
     */
    list(options?: ListOptions): Paginator<LightThemeImage, ListOptions>;
    /**
     * read
     * @param reference - Name of the image.
     */
    read(reference: string): Promise<LightThemeImage>;
    /**
     * update
     * @param image - The image in PNG or JPEG format as multipart form data.
     * @param reference - Name of the image.
     */
    update(image: ReadStream | Buffer | File | Blob, reference: string): Promise<LightThemeImage>;
}
