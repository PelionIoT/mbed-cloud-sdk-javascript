/// <reference types="node" />
import { ReadStream } from "fs";
import { ListOptions } from "../../../common";
import { Repository } from "../../../common/repository";
import { Paginator } from "../../../index";
import { LightThemeImage } from "./lightThemeImage";
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
