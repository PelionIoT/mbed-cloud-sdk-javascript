import { Adapter } from "../../../common/adapter";
import { ServerCredentials } from "./serverCredentials";
/**
 *ServerCredentials adapter
 */
export class ServerCredentialsAdapter extends Adapter {
    /**
     * fromApi
     * @returns ServerCredentials
     * @param data *required*
     * @param instance
     */
    public static fromApi(data: any, instance?: any): ServerCredentials {
        if (!data) {
            return null;
        }
        const mappedEntity = ServerCredentialsAdapter.assignDefined(instance || {}, {
            _discriminator: "SERVER_CREDENTIALS",
            createdAt: data.created_at,
            id: data.id,
            serverCertificate: data.server_certificate,
            serverUri: data.server_uri,
        });
        return mappedEntity;
    }
}
