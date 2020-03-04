import { Repository } from "../../../common/repository";
import { SubtenantTrustedCertificate } from "./subtenantTrustedCertificate";
import { SubtenantTrustedCertificateCreateRequest } from "./types";
import { DeveloperCertificate } from "../../index";
import { SubtenantTrustedCertificateUpdateRequest } from "./types";
/**
 *SubtenantTrustedCertificate repository
 */
export declare class SubtenantTrustedCertificateRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account.
     */
    create(request: SubtenantTrustedCertificateCreateRequest, accountId: string): Promise<SubtenantTrustedCertificate>;
    /**
     * delete
     * @param accountId - Account ID.
     * @param id - The ID of the trusted certificate to delete.
     */
    delete(accountId: string, id: string): Promise<void>;
    /**
     * getDeveloperCertificateInfo
     * @param id - ID that uniquely identifies the developer certificate.
     */
    getDeveloperCertificateInfo(id: string): Promise<DeveloperCertificate>;
    /**
     * read
     * @param accountId - The ID of the account.
     * @param id - Entity ID.
     */
    read(accountId: string, id: string): Promise<SubtenantTrustedCertificate>;
    /**
     * update
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account.
     * @param id - Entity ID.
     */
    update(request: SubtenantTrustedCertificateUpdateRequest, accountId: string, id: string): Promise<SubtenantTrustedCertificate>;
}
