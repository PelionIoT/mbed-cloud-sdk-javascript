import { Adapter } from "../../../common/adapter";
import { OidcRequest } from "./oidcRequest";
/**
 *OidcRequest adapter
 */
export declare class OidcRequestAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data: any, instance?: any): OidcRequest;
}
