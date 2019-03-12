import { Adapter } from "../../../common/adapter";
import { CertificateIssuerConfig } from "./certificateIssuerConfig";
/**
 *CertificateIssuerConfig adapter
 */
export class CertificateIssuerConfigAdapter extends Adapter {
    /**
     * fromApi
     * @returns CertificateIssuerConfig
     * @param data *required*
     * @param instance
     */
    public static fromApi(data: any, instance?: any): CertificateIssuerConfig {
        if (!data) {
            return null;
        }
        const mappedEntity = CertificateIssuerConfigAdapter.assignDefined(instance || {}, {
            _discriminator: "CERTIFICATE_ISSUER_CONFIG",
            certificateIssuerId: data.certificate_issuer_id,
            certificateReference: data.reference,
            createdAt: data.created_at,
            id: data.id,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    }
}
