/// <reference types="node" />
import { Repository } from "../../../common/repository";
import { SubtenantDarkThemeImage } from "./subtenantDarkThemeImage";
import { ReadStream } from "fs";
/**
 *SubtenantDarkThemeImage repository
 */
export declare class SubtenantDarkThemeImageRepository extends Repository {
    /**
     * delete
     * @param accountId - Account ID.
     * @param reference - Name of the branding images (icon or picture).
     */
    delete(accountId: string, reference: string): Promise<SubtenantDarkThemeImage>;
    /**
     * read
     * @param accountId - Account ID.
     * @param reference - Name of the image.
     */
    read(accountId: string, reference: string): Promise<SubtenantDarkThemeImage>;
    /**
     * update
     * @param accountId - Account ID.
     * @param image - The image in PNG or JPEG format as multipart form data.
     * @param reference - Name of the image.
     */
    update(accountId: string, image: ReadStream | Buffer | File | Blob, reference: string): Promise<SubtenantDarkThemeImage>;
}
