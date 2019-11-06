import { ListOptions } from "../../../common";
import { Repository } from "../../../common/repository";
import { Page, Paginator } from "../../../index";
import { apiWrapper } from "../../../legacy/common/functions";
import { SubtenantIdentityProviderAdapter } from "../../index";
import { SubtenantIdentityProvider } from "./subtenantIdentityProvider";
import { SubtenantIdentityProviderCreateRequest } from "./types";
import { SubtenantIdentityProviderGenerateServiceProviderCertificateRequest } from "./types";
import { SubtenantIdentityProviderUpdateRequest } from "./types";
/**
 *SubtenantIdentityProvider repository
 */
export class SubtenantIdentityProviderRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account the identity provider belongs to.
     * @param discovery - Indicates that the OpenID Connect endpoints and keys should be set using the OpenID Connect Discovery mechanism. The following parameters are set automatically: * authorization_endpoint * token_endpoint * userinfo_endpoint * revocation_endpoint * jwks_uri * keys
     */
    public create(
        request: SubtenantIdentityProviderCreateRequest,
        accountId: string,
        discovery?: boolean
    ): Promise<SubtenantIdentityProvider> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/identity-providers",
                        method: "POST",
                        query: {
                            discovery,
                        },
                        pathParams: {
                            account_id: accountId,
                        },
                        body: {
                            description: request.description,
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
                done(null, SubtenantIdentityProviderAdapter.fromApi(data, request));
            }
        );
    }
    /**
     * delete
     * @param accountId - Account ID.
     * @param id - The ID of the identity provider to delete.
     */
    public delete(accountId: string, id: string): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/identity-providers/{identity_provider_id}",
                        method: "DELETE",
                        pathParams: {
                            account_id: accountId,
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
     * @param accountId - The ID of the account the identity provider belongs to.
     * @param id - Entity ID.
     */
    public deleteServiceProviderCertificate(accountId: string, id: string): Promise<SubtenantIdentityProvider> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url:
                            "/v3/accounts/{account_id}/identity-providers/{identity_provider_id}/delete-sp-certificate",
                        method: "POST",
                        pathParams: {
                            account_id: accountId,
                            identity_provider_id: id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, SubtenantIdentityProviderAdapter.fromApi(data));
            }
        );
    }
    /**
     * generateServiceProviderCertificate
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account the identity provider belongs to.
     * @param id - Entity ID.
     */
    public generateServiceProviderCertificate(
        request: SubtenantIdentityProviderGenerateServiceProviderCertificateRequest,
        accountId: string,
        id: string
    ): Promise<SubtenantIdentityProvider> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url:
                            "/v3/accounts/{account_id}/identity-providers/{identity_provider_id}/generate-sp-certificate",
                        method: "POST",
                        pathParams: {
                            account_id: accountId,
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
                done(null, SubtenantIdentityProviderAdapter.fromApi(data, request));
            }
        );
    }
    /**
     * list
     * @param accountId - The ID of the account.
     * @param options - options
     */
    public list(accountId: string, options?: ListOptions): Paginator<SubtenantIdentityProvider, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<Page<SubtenantIdentityProvider>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/accounts/{account_id}/identity-providers",
                            method: "GET",
                            query: {
                                after: pageOptions.after,
                                include: pageOptions.include,
                                limit: pageOptions.limit,
                                order: pageOptions.order,
                            },
                            pathParams: {
                                account_id: accountId,
                            },
                        },
                        resultsFn
                    );
                },
                (data: Page<SubtenantIdentityProvider>, done) => {
                    done(null, new Page(data, data.data, SubtenantIdentityProviderAdapter.fromApi, pageOptions));
                },
                null
            );
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param accountId - The ID of the account the identity provider belongs to.
     * @param id - Entity ID.
     */
    public read(accountId: string, id: string): Promise<SubtenantIdentityProvider> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/identity-providers/{identity_provider_id}",
                        method: "GET",
                        pathParams: {
                            account_id: accountId,
                            identity_provider_id: id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, SubtenantIdentityProviderAdapter.fromApi(data));
            }
        );
    }
    /**
     * refreshTokens
     * @param accountId - The ID of the account the identity provider belongs to.
     * @param id - Entity ID.
     */
    public refreshTokens(accountId: string, id: string): Promise<SubtenantIdentityProvider> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/identity-providers/{identity_provider_id}/refresh-jwks",
                        method: "POST",
                        pathParams: {
                            account_id: accountId,
                            identity_provider_id: id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, SubtenantIdentityProviderAdapter.fromApi(data));
            }
        );
    }
    /**
     * update
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account the identity provider belongs to.
     * @param id - Entity ID.
     * @param discovery - Indicates that the OpenID Connect endpoints and keys should be set using the OpenID Connect Discovery mechanism. The following parameters are set automatically: * authorization_endpoint * token_endpoint * userinfo_endpoint * revocation_endpoint * jwks_uri * keys
     */
    public update(
        request: SubtenantIdentityProviderUpdateRequest,
        accountId: string,
        id: string,
        discovery?: boolean
    ): Promise<SubtenantIdentityProvider> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/identity-providers/{identity_provider_id}",
                        method: "PUT",
                        query: {
                            discovery,
                        },
                        pathParams: {
                            account_id: accountId,
                            identity_provider_id: id,
                        },
                        body: {
                            description: request.description,
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
                done(null, SubtenantIdentityProviderAdapter.fromApi(data, request));
            }
        );
    }
}
