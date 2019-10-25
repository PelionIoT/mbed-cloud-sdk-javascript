import { EndpointsBase } from "../common/endpointsBase";
import { PreSharedKeysApi } from "../_api/connector_bootstrap";
import { ConfigOptions } from "../../common/config";
export declare class Endpoints extends EndpointsBase {
    readonly bootstrap: PreSharedKeysApi;
    constructor(options?: ConfigOptions);
}
