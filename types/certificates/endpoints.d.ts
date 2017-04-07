import { ConnectionOptions } from "../common/interfaces";
import { AccountAdminApi } from "../_api/iam";
import { DeveloperCertificateApi as DeveloperApi, ServerCredentialsApi as ServerApi } from "../_api/connector_ca";
export declare class Endpoints {
    developer: DeveloperApi;
    server: ServerApi;
    admin: AccountAdminApi;
    constructor(options: ConnectionOptions);
}
