import { ListOptions } from "../../../common";
import { Repository } from "../../../common/repository";
import { Paginator } from "../../../index";
import { DeveloperCertificate } from "../../index";
import { TrustedCertificate } from "./trustedCertificate";
import { TrustedCertificateCreateRequest } from "./types";
import { TrustedCertificateListOptions } from "./types";
import { TrustedCertificateUpdateRequest } from "./types";
/**
 *TrustedCertificate repository
 */
export declare class TrustedCertificateRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     */
    create(request: TrustedCertificateCreateRequest): Promise<TrustedCertificate>;
    /**
     * delete
     * @param id - The ID of the trusted certificate to delete.
     */
    delete(id: string): Promise<void>;
    /**
     * getDeveloperCertificateInfo
     * @param id - ID that uniquely identifies the developer certificate.
     */
    getDeveloperCertificateInfo(id: string): Promise<DeveloperCertificate>;
    /**
     * list
     * @param options - Options to use for the List
     */
    list(options?: TrustedCertificateListOptions): Paginator<TrustedCertificate, ListOptions>;
    /**
     * read
     * @param id - Entity ID.
     */
    read(id: string): Promise<TrustedCertificate>;
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - Entity ID.
     */
    update(request: TrustedCertificateUpdateRequest, id: string): Promise<TrustedCertificate>;
}
