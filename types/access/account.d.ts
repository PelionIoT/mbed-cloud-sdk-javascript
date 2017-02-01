import { AccountType } from "./types";
import { AccountUpdateReq as apiAccountRequest, AccountInfo as apiAccount } from "../_api/iam";
import { AccessApi } from "./index";
export declare class Account {
    private _api;
    constructor(options: AccountType, _api?: AccessApi);
    static map(from: apiAccount, api: AccessApi): Account;
    static reverseMap(from: any): apiAccountRequest;
    /**
     * Update details of the account
     * @param options.displayName The display name for the account
     * @param options.parentId The ID of the parent account, if it has any
     * @param options.aliases An array of aliases
     * @param options.company The name of the company
     * @param options.contact The name of the contact person for this account
     * @param options.email The company email address for this account
     * @param options.phoneNumber The phone number of the company
     * @param options.addressLine1 Postal address line 1
     * @param options.addressLine2 Postal address line 2
     * @param options.city The city part of the postal address
     * @param options.state The state part of the postal address
     * @param options.postcode The postal code part of the postal address
     * @param options.country The country part of the postal address
     * @returns Promise of account
     */
    update(options: {
        displayName?: string;
        parentId?: string;
        aliases?: string[];
        company?: string;
        contact?: string;
        email?: string;
        phoneNumber?: string;
        addressLine1?: string;
        addressLine2?: string;
        city?: string;
        state?: string;
        postcode?: string;
        country?: string;
    }): Promise<Account>;
    /**
     * Update details of the account
     * @param options.displayName The display name for the account
     * @param options.parentId The ID of the parent account, if it has any
     * @param options.aliases An array of aliases
     * @param options.company The name of the company
     * @param options.contact The name of the contact person for this account
     * @param options.email The company email address for this account
     * @param options.phoneNumber The phone number of the company
     * @param options.addressLine1 Postal address line 1
     * @param options.addressLine2 Postal address line 2
     * @param options.city The city part of the postal address
     * @param options.state The state part of the postal address
     * @param options.postcode The postal code part of the postal address
     * @param options.country The country part of the postal address
     * @param callback A function that is passed the return arguments (error, account)
     */
    update(options: {
        displayName?: string;
        parentId?: string;
        aliases?: string[];
        company?: string;
        contact?: string;
        email?: string;
        phoneNumber?: string;
        addressLine1?: string;
        addressLine2?: string;
        city?: string;
        state?: string;
        postcode?: string;
        country?: string;
    }, callback?: (err: any, data?: Account) => any): any;
}
export interface Account extends AccountType {
}
