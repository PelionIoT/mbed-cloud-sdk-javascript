import { Repository } from "../../../common/repository";
import { CertificateEnrollment } from "./certificateEnrollment";
import { CertificateEnrollmentListOptions } from "./types";
import { Paginator } from "../../../common/pagination";
import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *CertificateEnrollment repository
 */
export declare class CertificateEnrollmentRepository extends Repository {
    /**
     * list
     * @param options - Options to use for the List
     */
    list(options?: CertificateEnrollmentListOptions): Paginator<CertificateEnrollment, ListOptions>;
    /**
     * read
     * @param id - The certificate enrollment ID.
     */
    read(id: string): Promise<CertificateEnrollment>;
}
