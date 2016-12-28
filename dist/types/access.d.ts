import { AccountAdminApi } from "./_api/iam";
export interface AccessOptions {
    /**
    * Access Key for your mbed Device Connector account
    */
    accessKey: string;
    /**
    * URL for mbed Device Connector API
    */
    host?: string;
}
export interface UserOptions {
    account_id: string;
    status: string;
    username: string;
    full_name: string;
    id: string;
}
/**
* Root Account object
*/
export declare class Access {
    private api;
    /**
    * @param options Options object
    */
    constructor(options: AccessOptions);
    /**
    * Gets a list of currently registered endpoints
    * @param type Filters endpoints by endpoint-type
    * @param callback A function that is passed the arguments (error, endpoints)
    * @returns Optional Promise of currently registered endpoints
    */
    getUsers(limit?: number, after?: string, order?: string, include?: string, filter?: string, callback?: (err: any, data?: User[]) => void): Promise<User[]>;
}
export declare class User {
    private api;
    constructor(api: AccountAdminApi, options: UserOptions);
}
export interface User extends UserOptions {
}
