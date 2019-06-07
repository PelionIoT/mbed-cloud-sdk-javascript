import { Repository } from "../../../common/repository";
import { CertificateIssuerConfig } from "./certificateIssuerConfig";
import { CertificateIssuerConfigCreateRequest } from "./types";
import { CertificateIssuerConfigListOptions } from "./types";
import { CertificateIssuerConfigUpdateRequest } from "./types";
import { Paginator } from "../../../common/pagination";
import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *CertificateIssuerConfig repository
 */
export declare class CertificateIssuerConfigRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     */
    create(request: CertificateIssuerConfigCreateRequest): Promise<CertificateIssuerConfig>;
    /**
* delete
* @param id - The ID of the certificate issuer configuration.

*/
    delete(id: string): Promise<void>;
    /**
     * getDefault
     */
    getDefault(): Promise<CertificateIssuerConfig>;
    /**
     * list
     * @param options - Options to use for the List
     */
    list(options?: CertificateIssuerConfigListOptions): Paginator<CertificateIssuerConfig, ListOptions>;
    /**
* read
* @param id - The ID of the certificate issuer configuration.

*/
    read(id: string): Promise<CertificateIssuerConfig>;
    /**
* update
* @param request - The entity to perform action on.
* @param id - The ID of the certificate issuer configuration.

*/
    update(request: CertificateIssuerConfigUpdateRequest, id: string): Promise<CertificateIssuerConfig>;
}
