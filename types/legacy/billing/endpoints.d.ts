import { EndpointsBase } from "../common/endpointsBase";
import { DefaultApi as BillingApi } from "../_api/billing";
import { ConnectionOptions } from "../common/interfaces";
export declare class Endpoints extends EndpointsBase {
    readonly billing: BillingApi;
    constructor(options?: ConnectionOptions);
}
