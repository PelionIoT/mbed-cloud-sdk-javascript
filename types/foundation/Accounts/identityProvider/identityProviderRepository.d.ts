import { ListOptions } from "../../../common";
import { Repository } from "../../../common/repository";
import { Paginator } from "../../../index";
import { IdentityProvider } from "./identityProvider";
import { IdentityProviderCreateRequest } from "./types";
import { IdentityProviderGenerateServiceProviderCertificateRequest } from "./types";
import { IdentityProviderUpdateRequest } from "./types";
/**
 *IdentityProvider repository
 */
export declare class IdentityProviderRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     * @param discovery - Indicates that the OpenID Connect endpoints and keys should be set using the OpenID Connect Discovery mechanism. The following parameters are set automatically: * authorization_endpoint * token_endpoint * userinfo_endpoint * revocation_endpoint * jwks_uri * keys
     */
    create(request: IdentityProviderCreateRequest, discovery?: boolean): Promise<IdentityProvider>;
    /**
     * delete
     * @param id - The ID of the identity provider to delete.
     */
    delete(id: string): Promise<void>;
    /**
     * deleteServiceProviderCertificate
     * @param id - Entity ID.
     */
    deleteServiceProviderCertificate(id: string): Promise<IdentityProvider>;
    /**
     * generateServiceProviderCertificate
     * @param request - The entity to perform action on.
     * @param id - Entity ID.
     */
    generateServiceProviderCertificate(request: IdentityProviderGenerateServiceProviderCertificateRequest, id: string): Promise<IdentityProvider>;
    /**
     * list
     * @param options - options
     */
    list(options?: ListOptions): Paginator<IdentityProvider, ListOptions>;
    /**
     * read
     * @param id - Entity ID.
     */
    read(id: string): Promise<IdentityProvider>;
    /**
     * refreshTokens
     * @param id - Entity ID.
     */
    refreshTokens(id: string): Promise<IdentityProvider>;
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - Entity ID.
     * @param discovery - Indicates that the OpenID Connect endpoints and keys should be set using the OpenID Connect Discovery mechanism. The following parameters are set automatically: * authorization_endpoint * token_endpoint * userinfo_endpoint * revocation_endpoint * jwks_uri * keys
     */
    update(request: IdentityProviderUpdateRequest, id: string, discovery?: boolean): Promise<IdentityProvider>;
}
