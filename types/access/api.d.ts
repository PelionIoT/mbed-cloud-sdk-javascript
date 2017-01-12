import { ConnectionOptions } from "../helpers/interfaces";
import { DefaultApi as AccessApi, DeveloperApi, RootAdminApi, AccountAdminApi } from "../_api/iam";
export declare class Api {
    access: AccessApi;
    developer: DeveloperApi;
    admin: AccountAdminApi;
    root: RootAdminApi;
    constructor(options: ConnectionOptions);
}
