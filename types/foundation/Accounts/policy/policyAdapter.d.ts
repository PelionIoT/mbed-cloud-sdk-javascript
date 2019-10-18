import { Adapter } from "../../../common/adapter";
import { Policy } from "./policy";
/**
 *Policy adapter
 */
export declare class PolicyAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data: any, instance?: any): Policy;
}
