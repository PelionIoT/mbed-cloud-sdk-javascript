import { Adapter } from "../../../common/adapter";
/**
 *CertificateIssuer adapter
 */
export class CertificateIssuerAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data, instance) {
        if (!data) {
            return null;
        }
        const mappedEntity = CertificateIssuerAdapter.assignDefined(instance || {}, {
            _discriminator: "CERTIFICATE_ISSUER",
            createdAt: data.created_at,
            description: data.description,
            id: data.id,
            issuerAttributes: data.issuer_attributes,
            issuerType: data.issuer_type,
            name: data.name,
        });
        return mappedEntity;
    }
}
//# sourceMappingURL=certificateIssuerAdapter.js.map