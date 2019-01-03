import { Adapter } from "../../../common/adapter";
import { SubtenantTrustedCertificate } from "./subtenantTrustedCertificate";
/**
 *SubtenantTrustedCertificate adapter
 */
export class SubtenantTrustedCertificateAdapter extends Adapter {
    public static fromApi(data: any, instance?: SubtenantTrustedCertificate): SubtenantTrustedCertificate {
        return SubtenantTrustedCertificateAdapter.assignDefined<SubtenantTrustedCertificate>(instance || {}, {
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
    }
}
