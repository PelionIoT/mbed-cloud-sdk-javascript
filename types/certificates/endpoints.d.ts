import { ConnectionOptions } from "../common/interfaces";
import { AccountAdminApi as AdminApi, DeveloperApi as AccountDeveloperApi } from "../_api/iam";
import { ServerCredentialsApi as ServerApi, DeveloperCertificateApi as CertDeveloperApi } from "../_api/connector_ca";
export declare class Endpoints {
    certDeveloper: CertDeveloperApi;
    accountDeveloper: AccountDeveloperApi;
    server: ServerApi;
    admin: AdminApi;
    constructor(options: ConnectionOptions);
}
