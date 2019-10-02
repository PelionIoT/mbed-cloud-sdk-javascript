import { EndpointsBase } from "../common/endpointsBase";
import { ConnectionOptions } from "../common/interfaces";
import { PreSharedKeysApi } from "../_api/connector_bootstrap";
export declare class Endpoints extends EndpointsBase {
    readonly bootstrap: PreSharedKeysApi;
    constructor(options?: ConnectionOptions);
}
