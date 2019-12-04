import { ConfigOptions } from "../../common/config";
import { DefaultApi as BillingApi } from "../_api/billing";
import { EndpointsBase } from "../common/endpointsBase";
export declare class Endpoints extends EndpointsBase {
    readonly billing: BillingApi;
    constructor(options?: ConfigOptions);
}
