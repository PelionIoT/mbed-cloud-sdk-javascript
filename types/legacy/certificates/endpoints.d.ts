import { ConfigOptions } from "../../common/config";
import { DeveloperCertificateApi as ConnectorApi, ServerCredentialsApi } from "../_api/connector_ca";
import { AccountAdminApi as AdminApi, DeveloperApi as AccountDeveloperApi } from "../_api/iam";
import { EndpointsBase } from "../common/endpointsBase";
export declare class Endpoints extends EndpointsBase {
    accountDeveloper: AccountDeveloperApi;
    connector: ConnectorApi;
    admin: AdminApi;
    serverCredentials: ServerCredentialsApi;
    constructor(options?: ConfigOptions);
}
