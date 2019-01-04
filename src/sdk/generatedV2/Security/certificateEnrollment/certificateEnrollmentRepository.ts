import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../common/functions";
import { CertificateEnrollment } from "./certificateEnrollment";
/**
 *CertificateEnrollment repository
 */
export class CertificateEnrollmentRepository extends Repository {
    public get(id: string): Promise<CertificateEnrollment> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/certificate-enrollments/{certificate-enrollment-id}",
                        method: "GET",
                        pathParams: {
                            "certificate-enrollment-id": id,
                        },
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
}
