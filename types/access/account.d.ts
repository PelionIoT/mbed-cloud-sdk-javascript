import { AccountType } from "./types";
import { AccountInfo as apiAccount, AccountUpdateReq as apiAccountRequest } from "../_api/iam";
export declare class Account {
    constructor(options: AccountType);
    static map(from: apiAccount): Account;
    static reverseMap(from: AccountType): apiAccountRequest;
}
export interface Account extends AccountType {
}
