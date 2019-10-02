import { Adapter } from "../../../common/adapter";
import { Account } from "./account";
/**
 *Account adapter
 */
export declare class AccountAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data: any, instance?: any): Account;
}
