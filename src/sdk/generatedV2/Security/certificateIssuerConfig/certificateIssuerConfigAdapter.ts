import { Adapter } from "../../../common/adapter";
import { CertificateIssuerConfig } from "./certificateIssuerConfig";
/**
 *CertificateIssuerConfig adapter
 */
export class CertificateIssuerConfigAdapter extends Adapter {
    public static fromApi(data: any, instance?: CertificateIssuerConfig): CertificateIssuerConfig {
        return CertificateIssuerConfigAdapter.assignDefined<CertificateIssuerConfig>(instance || {}, {
            _discriminator: "CERTIFICATE_ISSUER_CONFIG",
            certificateIssuerId: data.certificate_issuer_id,
            certificateReference: data.reference,
            createdAt: data.created_at,
            id: data.id,
            updatedAt: data.updated_at,
        });
    }
}
