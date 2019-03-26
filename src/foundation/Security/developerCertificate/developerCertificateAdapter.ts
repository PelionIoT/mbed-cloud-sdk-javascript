import { Adapter } from "../../../common/adapter";
import { DeveloperCertificate } from "./developerCertificate";
/**
 *DeveloperCertificate adapter
 */
export class DeveloperCertificateAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    public static fromApi(data: any, instance?: any): DeveloperCertificate {
        if (!data) {
            return null;
        }
        const mappedEntity = DeveloperCertificateAdapter.assignDefined(instance || {}, {
            _discriminator: "DEVELOPER_CERTIFICATE",
            accountId: data.account_id,
            certificate: data.developer_certificate,
            createdAt: data.created_at,
            description: data.description,
            id: data.id,
            name: data.name,
            securityFileContent: data.security_file_content,
        });
        return mappedEntity;
    }
}
