import { ConnectionOptions } from "../common/interfaces";
import { DeveloperApi, AccountAdminApi } from "../_api/iam";
export declare class Endpoints {
    developer: DeveloperApi;
    admin: AccountAdminApi;
    constructor(options: ConnectionOptions);
}
