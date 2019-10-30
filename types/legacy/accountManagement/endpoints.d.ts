import { EndpointsBase } from "../common/endpointsBase";
import { DeveloperApi, AccountAdminApi } from "../_api/iam";
import { ConfigOptions } from "../../common/config";
export declare class Endpoints extends EndpointsBase {
    developer: DeveloperApi;
    admin: AccountAdminApi;
    constructor(options?: ConfigOptions);
}
