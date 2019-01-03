import { Adapter } from "../../../common/adapter";
import { ServerCredentials } from "./serverCredentials";
/**
 *ServerCredentials adapter
 */
export class ServerCredentialsAdapter extends Adapter {
    public static fromApi(data: any, instance?: ServerCredentials): ServerCredentials {
        return ServerCredentialsAdapter.assignDefined<ServerCredentials>(instance || {}, {
            createdAt: data.created_at,
            id: data.id,
            serverCertificate: data.server_certificate,
            serverUri: data.server_uri,
        });
    }
}
