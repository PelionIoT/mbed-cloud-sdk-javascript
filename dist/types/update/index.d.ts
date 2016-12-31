/**
* Root Update object
*/
export declare class Update {
    private _api;
    /**
    * @param options Options object
    */
    constructor(options: Update.UpdateOptions);
    /**
    * Gets a list of currently registered endpoints
    * @param type Filters endpoints by endpoint-type
    * @param callback A function that is passed the arguments (error, endpoints)
    * @returns Optional Promise of currently registered endpoints
    */
    getFirmwareImages(options?: Update.ListOptions, callback?: (err: any, data?: any) => void): Promise<any>;
    getManifests(options?: Update.ListOptions, callback?: (err: any, data?: any) => void): Promise<any>;
}
export declare namespace Update {
    interface UpdateOptions {
        /**
        * Access Key for your mbed Device Connector account
        */
        accessKey: string;
        /**
        * URL for mbed Device Connector API
        */
        host?: string;
    }
    interface ListOptions {
        limit?: number;
        order?: string;
        after?: string;
        include?: string;
    }
}
