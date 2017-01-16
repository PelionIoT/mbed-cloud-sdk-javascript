import { ConnectionOptions, ListOptions, ListResponse } from "../helpers/interfaces";
import { User } from "./user";
import { Certificate } from "./certificate";
/**
* Root Account object
*/
export declare class Access {
    private _api;
    /**
    * @param options Options object
    */
    constructor(options: ConnectionOptions);
    private mapUser(from);
    /**
     * List device logs
     * @param options list options
     * @returns Promise of listResponse
     */
    getAccountDetails(): Promise<any>;
    /**
     * List device logs
     * @param options list options
     * @param callback A function that is passed the return arguments (error, listResponse)
     */
    getAccountDetails(callback: (err: any, data?: any) => any): void;
    listUsers(options?: ListOptions): Promise<ListResponse<User>>;
    listUsers(options?: ListOptions, callback?: (err: any, data?: ListResponse<User>) => void): any;
    listCertificates(options?: ListOptions): Promise<Certificate[]>;
    listCertificates(options?: ListOptions, callback?: (err: any, data?: Certificate[]) => void): any;
}
