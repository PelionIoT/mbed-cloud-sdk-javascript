import { ConnectionOptions, ListOptions } from "../helpers/interfaces";
/**
* Root Update object
*/
export declare class Update {
    private _api;
    /**
    * @param options Options object
    */
    constructor(options: ConnectionOptions);
    /**
    * Gets a list of currently registered endpoints
    * @param type Filters endpoints by endpoint-type
    * @param callback A function that is passed the arguments (error, endpoints)
    * @returns Optional Promise of currently registered endpoints
    */
    getFirmwareImages(options?: ListOptions, callback?: (err: any, data?: any) => void): Promise<any>;
    getManifests(options?: ListOptions, callback?: (err: any, data?: any) => void): Promise<any>;
}
