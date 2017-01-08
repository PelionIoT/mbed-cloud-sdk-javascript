import { ConnectionOptions } from "../helpers/interfaces";
import { DefaultApi, DeveloperApi, RootAdminApi, AccountAdminApi } from "../_api/iam";
export declare class Api {
    default: DefaultApi;
    developer: DeveloperApi;
    admin: AccountAdminApi;
    root: RootAdminApi;
    constructor(options: ConnectionOptions);
}
