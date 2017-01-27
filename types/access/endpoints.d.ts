import { ConnectionOptions } from "../common/interfaces";
import { DefaultApi as AccessApi, DeveloperApi, AccountAdminApi } from "../_api/iam";
export declare class Endpoints {
    access: AccessApi;
    developer: DeveloperApi;
    admin: AccountAdminApi;
    constructor(options: ConnectionOptions);
}
