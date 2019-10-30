/// <reference types="node" />
import { Repository } from "../../../common/repository";
import { SubtenantLightThemeImage } from "./subtenantLightThemeImage";
import { ReadStream } from "fs";
/**
 *SubtenantLightThemeImage repository
 */
export declare class SubtenantLightThemeImageRepository extends Repository {
    /**
     * delete
     * @param accountId - The ID of the account.
     * @param reference - Name of the branding images (icon or picture).
     */
    delete(accountId: string, reference: string): Promise<SubtenantLightThemeImage>;
    /**
     * read
     * @param accountId - The ID of the account.
     * @param reference - Name of the image.
     */
    read(accountId: string, reference: string): Promise<SubtenantLightThemeImage>;
    /**
     * update
     * @param accountId - The ID of the account.
     * @param image - The image in PNG or JPEG format as multipart form data.
     * @param reference - Name of the image.
     */
    update(accountId: string, image: ReadStream | Buffer | File | Blob, reference: string): Promise<SubtenantLightThemeImage>;
}
