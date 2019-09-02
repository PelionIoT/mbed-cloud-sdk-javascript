import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { IdentityProviderAdapter } from "../../index";
import { Paginator, Page } from "../../../index";
/**
 *IdentityProvider repository
 */
export class IdentityProviderRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     * @param discovery - Indicates that the OpenID Connect endpoints and keys should be set using the OpenID Connect Discovery mechanism. The following parameters are set automatically: * authorization_endpoint * token_endpoint * userinfo_endpoint * revocation_endpoint * jwks_uri * keys
     */
    create(request, discovery) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/identity-providers",
                method: "POST",
                query: {
                    discovery: discovery,
                },
                body: {
                    description: request.description,
                    name: request.name,
                    oidc_attributes: request.oidcAttributes,
                    saml2_attributes: request.saml2Attributes,
                    status: request.status,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, IdentityProviderAdapter.fromApi(data, request));
        });
    }
    /**
     * delete
     * @param id - The ID of the identity provider to delete.
     */
    delete(id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/identity-providers/{identity_provider_id}",
                method: "DELETE",
                pathParams: {
                    identity_provider_id: id,
                },
            }, resultsFn);
        }, (_data, done) => {
            done(null, null);
        });
    }
    /**
     * deleteServiceProviderCertificate
     * @param id - Entity ID.
     */
    deleteServiceProviderCertificate(id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/identity-providers/{identity_provider_id}/delete-sp-certificate",
                method: "POST",
                pathParams: {
                    identity_provider_id: id,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, IdentityProviderAdapter.fromApi(data));
        });
    }
    /**
     * generateServiceProviderCertificate
     * @param request - The entity to perform action on.
     * @param id - Entity ID.
     */
    generateServiceProviderCertificate(request, id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/identity-providers/{identity_provider_id}/generate-sp-certificate",
                method: "POST",
                pathParams: {
                    identity_provider_id: id,
                },
                body: {
                    algorithm: request.algorithm,
                    validity: request.validity,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, IdentityProviderAdapter.fromApi(data, request));
        });
    }
    /**
     * list
     * @param options - options
     */
    list(options) {
        const pageFunc = (pageOptions) => {
            pageOptions = pageOptions || {};
            return apiWrapper(resultsFn => {
                this.client._CallApi({
                    url: "/v3/identity-providers",
                    method: "GET",
                    query: {
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                }, resultsFn);
            }, (data, done) => {
                done(null, new Page(data, data.data, IdentityProviderAdapter.fromApi, pageOptions));
            }, null);
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param id - Entity ID.
     */
    read(id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/identity-providers/{identity_provider_id}",
                method: "GET",
                pathParams: {
                    identity_provider_id: id,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, IdentityProviderAdapter.fromApi(data));
        });
    }
    /**
     * refreshTokens
     * @param id - Entity ID.
     */
    refreshTokens(id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/identity-providers/{identity_provider_id}/refresh-jwks",
                method: "POST",
                pathParams: {
                    identity_provider_id: id,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, IdentityProviderAdapter.fromApi(data));
        });
    }
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - Entity ID.
     * @param discovery - Indicates that the OpenID Connect endpoints and keys should be set using the OpenID Connect Discovery mechanism. The following parameters are set automatically: * authorization_endpoint * token_endpoint * userinfo_endpoint * revocation_endpoint * jwks_uri * keys
     */
    update(request, id, discovery) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
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
                    name: request.name,
                    oidc_attributes: request.oidcAttributes,
                    saml2_attributes: request.saml2Attributes,
                    status: request.status,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, IdentityProviderAdapter.fromApi(data, request));
        });
    }
}
//# sourceMappingURL=identityProviderRepository.js.map