import { AccountInfo as apiAccount, AccountUpdateReq as apiAccountRequest } from "../../_api/iam";
import { AccountManagementApi } from "../accountManagementApi";
import { UpdateAccountObject } from "../types";
import { Account } from "./account";
/**
 * Account Adapter
 */
export declare class AccountAdapter {
    static map(from: apiAccount, api: AccountManagementApi): Account;
    static reverseMap(from: UpdateAccountObject): apiAccountRequest;
}
