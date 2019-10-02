import { Repository } from "../../../common/repository";
import { DeveloperCertificate } from "./developerCertificate";
import { DeveloperCertificateCreateRequest } from "./types";
import { TrustedCertificate } from "../../index";
/**
 *DeveloperCertificate repository
 */
export declare class DeveloperCertificateRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     */
    create(request: DeveloperCertificateCreateRequest): Promise<DeveloperCertificate>;
    /**
     * delete
     * @param id - The ID of the trusted certificate to delete.
     */
    delete(id: string): Promise<void>;
    /**
     * getTrustedCertificateInfo
     * @param id - Entity ID.
     */
    getTrustedCertificateInfo(id: string): Promise<TrustedCertificate>;
    /**
     * read
     * @param id - ID that uniquely identifies the developer certificate.
     */
    read(id: string): Promise<DeveloperCertificate>;
}
