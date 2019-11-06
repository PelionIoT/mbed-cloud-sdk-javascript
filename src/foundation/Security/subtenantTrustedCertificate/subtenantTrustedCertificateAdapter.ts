import { Adapter } from "../../../common/adapter";
import { isDeveloperCertificateGetter } from "../../../common/privateFunctions";
import { SubtenantTrustedCertificate } from "./subtenantTrustedCertificate";
/**
 *SubtenantTrustedCertificate adapter
 */
export class SubtenantTrustedCertificateAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    public static fromApi(data: any, instance?: any): SubtenantTrustedCertificate {
        if (!data) {
            return null;
        }
        const mappedEntity = SubtenantTrustedCertificateAdapter.assignDefined(instance || {}, {
            _discriminator: "SUBTENANT_TRUSTED_CERTIFICATE",
            accountId: data.account_id,
            certificate: data.certificate,
            certificateFingerprint: data.certificate_fingerprint,
            createdAt: data.created_at,
            description: data.description,
            deviceExecutionMode: data.device_execution_mode || 0,
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
            valid: data.valid,
            validity: data.validity,
        });
        isDeveloperCertificateGetter(mappedEntity);
        return mappedEntity;
    }
}
