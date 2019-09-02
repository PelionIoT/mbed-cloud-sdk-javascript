import { Adapter } from "../../../common/adapter";
import { User } from "./user";
/**
 *User adapter
 */
export declare class UserAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data: any, instance?: any): User;
}
