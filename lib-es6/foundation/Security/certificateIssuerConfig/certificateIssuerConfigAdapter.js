import { Adapter } from "../../../common/adapter";
/**
 *CertificateIssuerConfig adapter
 */
export class CertificateIssuerConfigAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data, instance) {
        if (!data) {
            return null;
        }
        const mappedEntity = CertificateIssuerConfigAdapter.assignDefined(instance || {}, {
            _discriminator: "CERTIFICATE_ISSUER_CONFIG",
            certificateIssuerId: data.certificate_issuer_id,
            createdAt: data.created_at,
            id: data.id,
            reference: data.reference,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    }
}
//# sourceMappingURL=certificateIssuerConfigAdapter.js.map