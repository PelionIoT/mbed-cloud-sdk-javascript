import { ListOptions } from "../../../common";
import { Repository } from "../../../common/repository";
import { Paginator } from "../../../index";
import { VerificationResponse } from "../../index";
import { CertificateIssuer } from "./certificateIssuer";
import { CertificateIssuerCreateRequest } from "./types";
import { CertificateIssuerUpdateRequest } from "./types";
/**
 *CertificateIssuer repository
 */
export declare class CertificateIssuerRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     */
    create(request: CertificateIssuerCreateRequest): Promise<CertificateIssuer>;
    /**
* delete
* @param id - Certificate issuer ID. <br> The ID of the certificate issuer.
An active certificate issuer may not be deleted.

*/
    delete(id: string): Promise<void>;
    /**
     * list
     * @param options - options
     */
    list(options?: ListOptions): Paginator<CertificateIssuer, ListOptions>;
    /**
     * read
     * @param id - The ID of the certificate issuer.
     */
    read(id: string): Promise<CertificateIssuer>;
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - The ID of the certificate issuer.
     */
    update(request: CertificateIssuerUpdateRequest, id: string): Promise<CertificateIssuer>;
    /**
* verify
* @param id - Certificate issuer ID. <br> The ID of the certificate issuer.

*/
    verify(id: string): Promise<VerificationResponse>;
}
