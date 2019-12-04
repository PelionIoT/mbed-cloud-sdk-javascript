import { Adapter } from "../../../common/adapter";
/**
 *ServerCredentials adapter
 */
export class ServerCredentialsAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data, instance) {
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
//# sourceMappingURL=serverCredentialsAdapter.js.map