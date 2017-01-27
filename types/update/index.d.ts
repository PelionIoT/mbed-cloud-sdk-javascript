import { ConnectionOptions, ListOptions, ListResponse } from "../common/interfaces";
import { FirmwareImage } from "./firmwareImage";
import { FirmwareManifest } from "./firmwareManifest";
/**
* Root Update API
*/
export declare class UpdateApi {
    private _endpoints;
    /**
    * @param options connection options
    */
    constructor(options: ConnectionOptions);
    /**
     * List firmware images
     * @param options list options
     * @returns Promise of listResponse
     */
    listFirmwareImages(options?: ListOptions): Promise<ListResponse<FirmwareImage>>;
    /**
     * List firmware images
     * @param options list options
     * @param callback A function that is passed the return arguments (error, listResponse)
     */
    listFirmwareImages(options?: ListOptions, callback?: (err: any, data?: ListResponse<FirmwareImage>) => any): any;
    /**
     * List firmware manifests
     * @param options list options
     * @returns Promise of listResponse
     */
    listFirmwareManifests(options?: ListOptions): Promise<ListResponse<FirmwareManifest>>;
    /**
     * List manifests
     * @param options list options
     * @param callback A function that is passed the return arguments (error, listResponse)
     */
    listFirmwareManifests(options?: ListOptions, callback?: (err: any, data?: ListResponse<FirmwareManifest>) => any): any;
}
