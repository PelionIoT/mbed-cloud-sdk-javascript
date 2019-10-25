import { Adapter } from "../../../common/adapter";
import { ServerCredentials } from "./serverCredentials";
/**
 *ServerCredentials adapter
 */
export declare class ServerCredentialsAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data: any, instance?: any): ServerCredentials;
}
