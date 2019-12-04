import { ConfigOptions } from "../../common/config";
import { AccountAdminApi, DeveloperApi } from "../_api/iam";
import { EndpointsBase } from "../common/endpointsBase";
export declare class Endpoints extends EndpointsBase {
    developer: DeveloperApi;
    admin: AccountAdminApi;
    constructor(options?: ConfigOptions);
}
