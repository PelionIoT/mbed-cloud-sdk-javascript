import { Adapter } from "../../../common/adapter";
/**
 *DeveloperCertificate adapter
 */
export class DeveloperCertificateAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data, instance) {
        if (!data) {
            return null;
        }
        const mappedEntity = DeveloperCertificateAdapter.assignDefined(instance || {}, {
            _discriminator: "DEVELOPER_CERTIFICATE",
            accountId: data.account_id,
            certificate: data.developer_certificate,
            createdAt: data.created_at,
            description: data.description,
            developerPrivateKey: data.developer_private_key,
            id: data.id,
            name: data.name,
            securityFileContent: data.security_file_content,
        });
        return mappedEntity;
    }
}
//# sourceMappingURL=developerCertificateAdapter.js.map