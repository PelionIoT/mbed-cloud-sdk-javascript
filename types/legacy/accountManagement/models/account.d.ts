import { CallbackFn } from "../../common/interfaces";
import { UpdateAccountObject, AccountStatusEnum } from "../types";
import { AccountManagementApi } from "../accountManagementApi";
import { Policy } from "./policy";
/**
 * Account
 */
export declare class Account {
    private _api?;
    /**
     * Account ID.
     */
    readonly id: string;
    /**
     * An array of aliases.
     */
    readonly aliases: Array<string>;
    /**
     * The status of the account.
     */
    readonly status: AccountStatusEnum;
    /**
     * The tier level of the account; '0': free tier, '1': commercial account. Other values are reserved for the future.
     */
    readonly tier: string;
    /**
     * List of limits as key-value pairs if requested.
     */
    readonly limits?: {
        [key: string]: string;
    };
    /**
     * List of policies if requested.
     */
    readonly policies?: Array<Policy>;
    /**
     * Creation time.
     */
    readonly createdAt?: Date;
    /**
     * Time when upgraded to commercial account.
     */
    readonly upgradedAt?: Date;
    /**
     * A reason note for updating the status of the account.
     */
    readonly reason?: string;
    /**
     * Account template ID.
     */
    readonly templateId?: string;
    /**
     * Contract number of the customer
     */
    readonly contractNumber?: string;
    /**
     * Customer number of the customer
     */
    readonly customerNumber?: string;
    /**
     * Reference note for updating the status of the account
     */
    readonly referenceNote?: string;
    /**
     * The last update time
     */
    readonly updatedAt?: Date;
    constructor(init: Partial<Account>, _api?: AccountManagementApi);
    /**
     * Update details of the account
     * @returns Promise of account
     */
    update(): Promise<Account>;
    /**
     * Update details of the account
     * @param callback A function that is passed the return arguments (error, account)
     */
    update(callback: CallbackFn<Account>): void;
}
export interface Account extends UpdateAccountObject {
}
