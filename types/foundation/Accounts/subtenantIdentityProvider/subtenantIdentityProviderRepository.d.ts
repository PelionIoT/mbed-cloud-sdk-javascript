import { Repository } from "../../../common/repository";
import { SubtenantIdentityProvider } from "./subtenantIdentityProvider";
import { SubtenantIdentityProviderCreateRequest } from "./types";
import { SubtenantIdentityProviderGenerateServiceProviderCertificateRequest } from "./types";
import { SubtenantIdentityProviderUpdateRequest } from "./types";
import { Paginator } from "../../../index";
import { ListOptions } from "../../../common";
/**
 *SubtenantIdentityProvider repository
 */
export declare class SubtenantIdentityProviderRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account the identity provider belongs to.
     * @param discovery - Indicates that the OpenID Connect endpoints and keys should be set using the OpenID Connect Discovery mechanism. The following parameters are set automatically: * authorization_endpoint * token_endpoint * userinfo_endpoint * revocation_endpoint * jwks_uri * keys
     */
    create(request: SubtenantIdentityProviderCreateRequest, accountId: string, discovery?: boolean): Promise<SubtenantIdentityProvider>;
    /**
     * delete
     * @param accountId - Account ID.
     * @param id - The ID of the identity provider to delete.
     */
    delete(accountId: string, id: string): Promise<void>;
    /**
     * deleteServiceProviderCertificate
     * @param accountId - The ID of the account the identity provider belongs to.
     * @param id - Entity ID.
     */
    deleteServiceProviderCertificate(accountId: string, id: string): Promise<SubtenantIdentityProvider>;
    /**
     * generateServiceProviderCertificate
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account the identity provider belongs to.
     * @param id - Entity ID.
     */
    generateServiceProviderCertificate(request: SubtenantIdentityProviderGenerateServiceProviderCertificateRequest, accountId: string, id: string): Promise<SubtenantIdentityProvider>;
    /**
     * list
     * @param accountId - Account ID.
     * @param options - options
     */
    list(accountId: string, options?: ListOptions): Paginator<SubtenantIdentityProvider, ListOptions>;
    /**
     * read
     * @param accountId - The ID of the account the identity provider belongs to.
     * @param id - Entity ID.
     */
    read(accountId: string, id: string): Promise<SubtenantIdentityProvider>;
    /**
     * refreshTokens
     * @param accountId - The ID of the account the identity provider belongs to.
     * @param id - Entity ID.
     */
    refreshTokens(accountId: string, id: string): Promise<SubtenantIdentityProvider>;
    /**
     * update
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account the identity provider belongs to.
     * @param id - Entity ID.
     * @param discovery - Indicates that the OpenID Connect endpoints and keys should be set using the OpenID Connect Discovery mechanism. The following parameters are set automatically: * authorization_endpoint * token_endpoint * userinfo_endpoint * revocation_endpoint * jwks_uri * keys
     */
    update(request: SubtenantIdentityProviderUpdateRequest, accountId: string, id: string, discovery?: boolean): Promise<SubtenantIdentityProvider>;
}
