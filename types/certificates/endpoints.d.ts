import { ConnectionOptions } from "../common/interfaces";
import { EndpointsBase } from "../common/endpointsBase";
import { AccountAdminApi as AdminApi, DeveloperApi as AccountDeveloperApi } from "../_api/iam";
import { ExternalAPIApi as ConnectorApi } from "../_api/connector_ca";
export declare class Endpoints extends EndpointsBase {
    accountDeveloper: AccountDeveloperApi;
    connector: ConnectorApi;
    admin: AdminApi;
    constructor(options: ConnectionOptions);
}
