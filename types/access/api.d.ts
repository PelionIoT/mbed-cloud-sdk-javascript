import { ConnectionOptions } from "../helpers/interfaces";
import { DefaultApi as AccessApi, DeveloperApi, AccountAdminApi } from "../_api/iam";
export declare class Api {
    access: AccessApi;
    developer: DeveloperApi;
    admin: AccountAdminApi;
    constructor(options: ConnectionOptions);
}
