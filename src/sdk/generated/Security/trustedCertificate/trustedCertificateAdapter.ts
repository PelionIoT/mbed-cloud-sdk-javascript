import { Adapter } from "../../../common/adapter";
import { TrustedCertificate } from "./trustedCertificate";
import { isDeveloperCertificateSetter } from "../../../common/privateFunctions";
/**
 *TrustedCertificate adapter
 */
export class TrustedCertificateAdapter extends Adapter {
    public static fromApi(data: any, instance?: any): TrustedCertificate {
        if (!data) {
            return null;
        }
        const mappedEntity = TrustedCertificateAdapter.assignDefined(instance || {}, {
            _discriminator: "TRUSTED_CERTIFICATE",
            accountId: data.account_id,
            certificate: data.certificate,
            certificateFingerprint: data.certificate_fingerprint,
            createdAt: data.created_at,
            description: data.description,
            deviceExecutionMode: data.device_execution_mode,
            enrollmentMode: data.enrollment_mode,
            id: data.id,
            isDeveloperCertificate: data.is_developer_certificate,
            issuer: data.issuer,
            name: data.name,
            ownerId: data.owner_id,
            service: data.service,
            status: data.status,
            subject: data.subject,
            updatedAt: data.updated_at,
            validity: data.validity,
        });
        isDeveloperCertificateSetter(mappedEntity);
        return mappedEntity;
    }
}
