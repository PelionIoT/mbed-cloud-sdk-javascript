import { ConnectionOptions } from "../common/interfaces";
import { EndpointsBase } from "../common/endpointsBase";
import { DeveloperApi, AccountAdminApi } from "../_api/iam";
export declare class Endpoints extends EndpointsBase {
    developer: DeveloperApi;
    admin: AccountAdminApi;
    constructor(options?: ConnectionOptions);
}
