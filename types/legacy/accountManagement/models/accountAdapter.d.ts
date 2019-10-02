import { AccountUpdateReq as apiAccountRequest, AccountInfo as apiAccount } from "../../_api/iam";
import { UpdateAccountObject } from "../types";
import { AccountManagementApi } from "../accountManagementApi";
import { Account } from "./account";
/**
 * Account Adapter
 */
export declare class AccountAdapter {
    static map(from: apiAccount, api: AccountManagementApi): Account;
    static reverseMap(from: UpdateAccountObject): apiAccountRequest;
}
