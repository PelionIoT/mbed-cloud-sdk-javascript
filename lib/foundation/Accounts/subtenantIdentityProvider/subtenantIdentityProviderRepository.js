"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var repository_1 = require("../../../common/repository");
var index_1 = require("../../../index");
var functions_1 = require("../../../legacy/common/functions");
var index_2 = require("../../index");
/**
 *SubtenantIdentityProvider repository
 */
var SubtenantIdentityProviderRepository = /** @class */ (function (_super) {
    __extends(SubtenantIdentityProviderRepository, _super);
    function SubtenantIdentityProviderRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * create
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account the identity provider belongs to.
     * @param discovery - Indicates that the OpenID Connect endpoints and keys should be set using the OpenID Connect Discovery mechanism. The following parameters are set automatically: * authorization_endpoint * token_endpoint * userinfo_endpoint * revocation_endpoint * jwks_uri * keys
     */
    SubtenantIdentityProviderRepository.prototype.create = function (request, accountId, discovery) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/identity-providers",
                method: "POST",
                query: {
                    discovery: discovery,
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
            }, resultsFn);
        }, function (data, done) {
            done(null, index_2.SubtenantIdentityProviderAdapter.fromApi(data, request));
        });
    };
    /**
     * delete
     * @param accountId - Account ID.
     * @param id - The ID of the identity provider to delete.
     */
    SubtenantIdentityProviderRepository.prototype.delete = function (accountId, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/identity-providers/{identity_provider_id}",
                method: "DELETE",
                pathParams: {
                    account_id: accountId,
                    identity_provider_id: id,
                },
            }, resultsFn);
        }, function (_data, done) {
            done(null, null);
        });
    };
    /**
     * deleteServiceProviderCertificate
     * @param accountId - The ID of the account the identity provider belongs to.
     * @param id - Entity ID.
     */
    SubtenantIdentityProviderRepository.prototype.deleteServiceProviderCertificate = function (accountId, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/identity-providers/{identity_provider_id}/delete-sp-certificate",
                method: "POST",
                pathParams: {
                    account_id: accountId,
                    identity_provider_id: id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_2.SubtenantIdentityProviderAdapter.fromApi(data));
        });
    };
    /**
     * generateServiceProviderCertificate
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account the identity provider belongs to.
     * @param id - Entity ID.
     */
    SubtenantIdentityProviderRepository.prototype.generateServiceProviderCertificate = function (request, accountId, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/identity-providers/{identity_provider_id}/generate-sp-certificate",
                method: "POST",
                pathParams: {
                    account_id: accountId,
                    identity_provider_id: id,
                },
                body: {
                    algorithm: request.algorithm,
                    validity: request.validity,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_2.SubtenantIdentityProviderAdapter.fromApi(data, request));
        });
    };
    /**
     * list
     * @param accountId - The ID of the account.
     * @param options - options
     */
    SubtenantIdentityProviderRepository.prototype.list = function (accountId, options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
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
                }, resultsFn);
            }, function (data, done) {
                done(null, new index_1.Page(data, data.data, index_2.SubtenantIdentityProviderAdapter.fromApi, pageOptions));
            }, null);
        };
        return new index_1.Paginator(pageFunc, options);
    };
    /**
     * read
     * @param accountId - The ID of the account the identity provider belongs to.
     * @param id - Entity ID.
     */
    SubtenantIdentityProviderRepository.prototype.read = function (accountId, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/identity-providers/{identity_provider_id}",
                method: "GET",
                pathParams: {
                    account_id: accountId,
                    identity_provider_id: id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_2.SubtenantIdentityProviderAdapter.fromApi(data));
        });
    };
    /**
     * refreshTokens
     * @param accountId - The ID of the account the identity provider belongs to.
     * @param id - Entity ID.
     */
    SubtenantIdentityProviderRepository.prototype.refreshTokens = function (accountId, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/identity-providers/{identity_provider_id}/refresh-jwks",
                method: "POST",
                pathParams: {
                    account_id: accountId,
                    identity_provider_id: id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_2.SubtenantIdentityProviderAdapter.fromApi(data));
        });
    };
    /**
     * update
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account the identity provider belongs to.
     * @param id - Entity ID.
     * @param discovery - Indicates that the OpenID Connect endpoints and keys should be set using the OpenID Connect Discovery mechanism. The following parameters are set automatically: * authorization_endpoint * token_endpoint * userinfo_endpoint * revocation_endpoint * jwks_uri * keys
     */
    SubtenantIdentityProviderRepository.prototype.update = function (request, accountId, id, discovery) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/identity-providers/{identity_provider_id}",
                method: "PUT",
                query: {
                    discovery: discovery,
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
            }, resultsFn);
        }, function (data, done) {
            done(null, index_2.SubtenantIdentityProviderAdapter.fromApi(data, request));
        });
    };
    return SubtenantIdentityProviderRepository;
}(repository_1.Repository));
exports.SubtenantIdentityProviderRepository = SubtenantIdentityProviderRepository;
//# sourceMappingURL=subtenantIdentityProviderRepository.js.map