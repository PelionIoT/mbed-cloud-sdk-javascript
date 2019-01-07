import { Adapter } from "../../../common/adapter";
import { CertificateEnrollment } from "./certificateEnrollment";
/**
 *CertificateEnrollment adapter
 */
export class CertificateEnrollmentAdapter extends Adapter {
    public static fromApi(data: any, instance?: CertificateEnrollment): CertificateEnrollment {
        if (!data) {
            return null;
        }
        const mappedEntity = CertificateEnrollmentAdapter.assignDefined<CertificateEnrollment>(instance || {}, {
            _discriminator: "CERTIFICATE_ENROLLMENT",
            certificateName: data.certificate_name,
            createdAt: data.created_at,
            deviceId: data.device_id,
            enrollResult: data.enroll_result,
            enrollStatus: data.enroll_status,
            id: data.id,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    }
}
