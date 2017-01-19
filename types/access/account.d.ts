import { AccountType } from "./types";
import { AccountInfo as apiAccount } from "../_api/iam";
export declare class Account {
    constructor(options: AccountType);
    static map(from: apiAccount): Account;
}
export interface Account extends AccountType {
}
