import { AccountType } from "./types";
import { AccountUpdateReq as apiAccountRequest, AccountInfo as apiAccount } from "../_api/iam";
export declare class Account {
    constructor(options: AccountType);
    static map(from: apiAccount): Account;
    static reverseMap(from: AccountType): apiAccountRequest;
}
export interface Account extends AccountType {
}
