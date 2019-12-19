import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { IdentityProvider } from "./identityProvider";
import { IdentityProviderAdapter } from "../../index";
import { IdentityProviderCreateRequest } from "./types";
import { IdentityProviderGenerateServiceProviderCertificateRequest } from "./types";
import { IdentityProviderUpdateRequest } from "./types";
import { Paginator, Page } from "../../../index";
import { ListOptions } from "../../../common";
/**
 *IdentityProvider repository
 */
export class IdentityProviderRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     * @param discovery - Indicates that the OpenID Connect endpoints and keys should be set using the OpenID Connect Discovery mechanism. The following parameters are set automatically: * authorization_endpoint * token_endpoint * userinfo_endpoint * revocation_endpoint * jwks_uri * keys
     */
    public create(request: IdentityProviderCreateRequest, discovery?: boolean): Promise<IdentityProvider> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/identity-providers",
                        method: "POST",
                        query: {
                            discovery: discovery,
                        },
                        body: {
                            description: request.description,
                            type: request.identityProviderType,
                            name: request.name,
                            oidc_attributes: request.oidcAttributes,
                            saml2_attributes: request.saml2Attributes,
                            status: request.status,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, IdentityProviderAdapter.fromApi(data, request));
            }
        );
    }
    /**
     * delete
     * @param id - The ID of the identity provider to delete.
     */
    public delete(id: string): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/identity-providers/{identity_provider_id}",
                        method: "DELETE",
                        pathParams: {
                            identity_provider_id: id,
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
    /**
     * deleteServiceProviderCertificate
     * @param id - Entity ID.
     */
    public deleteServiceProviderCertificate(id: string): Promise<IdentityProvider> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/identity-providers/{identity_provider_id}/delete-sp-certificate",
                        method: "POST",
                        pathParams: {
                            identity_provider_id: id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, IdentityProviderAdapter.fromApi(data));
            }
        );
    }
    /**
     * generateServiceProviderCertificate
     * @param request - The entity to perform action on.
     * @param id - Entity ID.
     */
    public generateServiceProviderCertificate(
        request: IdentityProviderGenerateServiceProviderCertificateRequest,
        id: string
    ): Promise<IdentityProvider> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/identity-providers/{identity_provider_id}/generate-sp-certificate",
                        method: "POST",
                        pathParams: {
                            identity_provider_id: id,
                        },
                        body: {
                            algorithm: request.algorithm,
                            validity: request.validity,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, IdentityProviderAdapter.fromApi(data, request));
            }
        );
    }
    /**
     * list
     * @param options - options
     */
    public list(options?: ListOptions): Paginator<IdentityProvider, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<Page<IdentityProvider>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/identity-providers",
                            method: "GET",
                            query: {
                                after: pageOptions.after,
                                include: pageOptions.include,
                                limit: pageOptions.limit,
                                order: pageOptions.order,
                            },
                        },
                        resultsFn
                    );
                },
                (data: Page<IdentityProvider>, done) => {
                    done(null, new Page(data, data.data, IdentityProviderAdapter.fromApi, pageOptions));
                },
                null
            );
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param id - Entity ID.
     */
    public read(id: string): Promise<IdentityProvider> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/identity-providers/{identity_provider_id}",
                        method: "GET",
                        pathParams: {
                            identity_provider_id: id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, IdentityProviderAdapter.fromApi(data));
            }
        );
    }
    /**
     * refreshTokens
     * @param id - Entity ID.
     */
    public refreshTokens(id: string): Promise<IdentityProvider> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/identity-providers/{identity_provider_id}/refresh-jwks",
                        method: "POST",
                        pathParams: {
                            identity_provider_id: id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, IdentityProviderAdapter.fromApi(data));
            }
        );
    }
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - Entity ID.
     * @param discovery - Indicates that the OpenID Connect endpoints and keys should be set using the OpenID Connect Discovery mechanism. The following parameters are set automatically: * authorization_endpoint * token_endpoint * userinfo_endpoint * revocation_endpoint * jwks_uri * keys
     */
    public update(request: IdentityProviderUpdateRequest, id: string, discovery?: boolean): Promise<IdentityProvider> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/identity-providers/{identity_provider_id}",
                        method: "PUT",
                        query: {
                            discovery: discovery,
                        },
                        pathParams: {
                            identity_provider_id: id,
                        },
                        body: {
                            description: request.description,
                            type: request.identityProviderType,
                            name: request.name,
                            oidc_attributes: request.oidcAttributes,
                            saml2_attributes: request.saml2Attributes,
                            status: request.status,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, IdentityProviderAdapter.fromApi(data, request));
            }
        );
    }
}
