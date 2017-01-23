import { ConnectionOptions, ListOptions, ListResponse } from "../helpers/interfaces";
import { Account } from "./account";
import { Certificate } from "./certificate";
import { User } from "./user";
/**
* Root Access API
*/
export declare class AccessApi {
    private _endpoints;
    /**
    * @param options connection options
    */
    constructor(options: ConnectionOptions);
    /**
     * Get account details
     * @returns Promise of account
     */
    getAccount(): Promise<Account>;
    /**
     * Get account details
     * @param callback A function that is passed the return arguments (error, account)
     */
    getAccount(callback: (err: any, data?: Account) => any): void;
    /**
    * List users
    * @param options list options
    * @returns Promise of listResponse
    */
    listUsers(options?: ListOptions): Promise<ListResponse<User>>;
    /**
    * List users
    * @param options list options
    * @param callback A function that is passed the arguments (error, listResponse)
    */
    listUsers(options?: ListOptions, callback?: (err: any, data?: ListResponse<User>) => any): any;
    /**
    * List certificates
    * @param options list options
    * @param callback A function that is passed the arguments (error, listResponse)
    * @returns Promise of listResponse
    */
    listCertificates(options?: ListOptions): Promise<ListResponse<Certificate>>;
    /**
    * List certificates
    * @param options list options
    * @param callback A function that is passed the arguments (error, listResponse)
    * @returns Promise of listResponse
    */
    listCertificates(options?: ListOptions, callback?: (err: any, data?: ListResponse<Certificate>) => any): any;
}
