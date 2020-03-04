import { ConfigOptions } from "../../common/config";
import { PreSharedKeysApi } from "../_api/connector_bootstrap";
import { EndpointsBase } from "../common/endpointsBase";
export declare class Endpoints extends EndpointsBase {
    readonly bootstrap: PreSharedKeysApi;
    constructor(options?: ConfigOptions);
}
