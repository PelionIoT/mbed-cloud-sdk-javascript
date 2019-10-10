import { Adapter } from "../../../common/adapter";
/**
 *CertificateEnrollment adapter
 */
export class CertificateEnrollmentAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data, instance) {
        if (!data) {
            return null;
        }
        const mappedEntity = CertificateEnrollmentAdapter.assignDefined(instance || {}, {
            _discriminator: "CERTIFICATE_ENROLLMENT",
            certificateName: data.certificate_name,
            createdAt: data.created_at,
            deviceId: data.device_id,
            enrollResult: data.enroll_result,
            enrollResultDetail: data.enroll_result_detail,
            enrollStatus: data.enroll_status,
            id: data.id,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    }
}
//# sourceMappingURL=certificateEnrollmentAdapter.js.map