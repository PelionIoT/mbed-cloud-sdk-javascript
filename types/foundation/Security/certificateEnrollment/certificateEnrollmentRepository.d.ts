import { ListOptions } from "../../../common";
import { Repository } from "../../../common/repository";
import { Paginator } from "../../../index";
import { CertificateEnrollment } from "./certificateEnrollment";
import { CertificateEnrollmentListOptions } from "./types";
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
