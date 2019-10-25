import { EndpointsBase } from "../common/endpointsBase";
import { DefaultApi as BillingApi } from "../_api/billing";
import { ConfigOptions } from "../../common/config";
export declare class Endpoints extends EndpointsBase {
    readonly billing: BillingApi;
    constructor(options?: ConfigOptions);
}
