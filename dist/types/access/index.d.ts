import { ConnectionOptions, ListOptions } from "../helpers/interfaces";
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
    getUsers(options?: ListOptions): Promise<User[]>;
    getUsers(options?: ListOptions, callback?: (err: any, data?: User[]) => void): any;
    getCertificates(options?: ListOptions): Promise<Certificate[]>;
    getCertificates(options?: ListOptions, callback?: (err: any, data?: Certificate[]) => void): any;
}
