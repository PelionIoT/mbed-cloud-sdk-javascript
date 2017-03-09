import { ListOptions } from "../common/interfaces";
import { UserType } from "./types";
import { UserInfoReq as apiUserRequest, UserInfoResp as apiUser } from "../_api/iam";
import { AccessApi } from "./index";
import { ApiKey } from "./apiKey";
export declare class User {
    private _api;
    constructor(options: UserType, _api?: AccessApi);
    static map(from: apiUser, api: AccessApi): User;
    static reverseMap(from: any): apiUserRequest;
    /**
     * Updates the user
     * @param options.username A username containing alphanumerical letters and -,._@+= characters
     * @param options.phoneNumber Phone number
     * @param options.marketingAccepted A flag indicating that receiving marketing information has been accepted
     * @param options.termsAccepted A flag indicating that the General Terms and Conditions has been accepted
     * @param options.fullName The full name of the user
     * @param options.address Address
     * @param options.password The password when creating a new user. It will will generated when not present in the request
     * @param options.email The email address
     * @returns Promise containing user
     */
    update(options: {
        username: string;
        phoneNumber?: string;
        marketingAccepted?: boolean;
        termsAccepted?: boolean;
        fullName?: string;
        address?: string;
        password?: string;
        email: string;
    }): Promise<User>;
    /**
     * Updates the user
     * @param options.username A username containing alphanumerical letters and -,._@+= characters
     * @param options.phoneNumber Phone number
     * @param options.marketingAccepted A flag indicating that receiving marketing information has been accepted
     * @param options.termsAccepted A flag indicating that the General Terms and Conditions has been accepted
     * @param options.fullName The full name of the user
     * @param options.address Address
     * @param options.password The password when creating a new user. It will will generated when not present in the request
     * @param options.email The email address
     * @param callback A function that is passed the return arguments (error, user)
     */
    update(options: {
        username: string;
        phoneNumber?: string;
        marketingAccepted?: boolean;
        termsAccepted?: boolean;
        fullName?: string;
        address?: string;
        password?: string;
        email: string;
    }, callback: (err: any, data?: User) => any): any;
    /**
     * List the API keys for this user
     * @returns Promise containing API keys
     */
    listApiKeys(options?: ListOptions): Promise<ApiKey[]>;
    /**
     * List the API keys for this user
     * @param callback A function that is passed the return arguments (error, API keys)
     */
    listApiKeys(options?: ListOptions, callback?: (err: any, data?: ApiKey[]) => any): any;
    /**
     * Delete the user
     * @returns Promise containing any error
     */
    delete(): Promise<void>;
    /**
     * Delete the user
     * @param callback A function that is passed any error
     */
    delete(callback?: (err: any, data?: void) => any): any;
}
export interface User extends UserType {
}
