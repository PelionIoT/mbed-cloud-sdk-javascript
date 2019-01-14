import { Adapter } from "../../../common/adapter";
import { CertificateIssuer } from "./certificateIssuer";
/**
 *CertificateIssuer adapter
 */
export class CertificateIssuerAdapter extends Adapter {
    public static fromApi(data: any, instance?: any): CertificateIssuer {
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
