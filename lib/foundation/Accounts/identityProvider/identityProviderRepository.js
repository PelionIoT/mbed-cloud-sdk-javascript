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
var functions_1 = require("../../../legacy/common/functions");
var index_1 = require("../../index");
var index_2 = require("../../../index");
/**
 *IdentityProvider repository
 */
var IdentityProviderRepository = /** @class */ (function (_super) {
    __extends(IdentityProviderRepository, _super);
    function IdentityProviderRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * create
     * @param request - The entity to perform action on.
     * @param discovery - Indicates that the OpenID Connect endpoints and keys should be set using the OpenID Connect Discovery mechanism. The following parameters are set automatically: * authorization_endpoint * token_endpoint * userinfo_endpoint * revocation_endpoint * jwks_uri * keys
     */
    IdentityProviderRepository.prototype.create = function (request, discovery) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
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
        }, function (data, done) {
            done(null, index_1.IdentityProviderAdapter.fromApi(data, request));
        });
    };
    /**
     * delete
     * @param id - The ID of the identity provider to delete.
     */
    IdentityProviderRepository.prototype.delete = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/identity-providers/{identity_provider_id}",
                method: "DELETE",
                pathParams: {
                    identity_provider_id: id,
                },
            }, resultsFn);
        }, function (_data, done) {
            done(null, null);
        });
    };
    /**
     * deleteServiceProviderCertificate
     * @param id - Entity ID.
     */
    IdentityProviderRepository.prototype.deleteServiceProviderCertificate = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/identity-providers/{identity_provider_id}/delete-sp-certificate",
                method: "POST",
                pathParams: {
                    identity_provider_id: id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.IdentityProviderAdapter.fromApi(data));
        });
    };
    /**
     * generateServiceProviderCertificate
     * @param request - The entity to perform action on.
     * @param id - Entity ID.
     */
    IdentityProviderRepository.prototype.generateServiceProviderCertificate = function (request, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
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
        }, function (data, done) {
            done(null, index_1.IdentityProviderAdapter.fromApi(data, request));
        });
    };
    /**
     * list
     * @param options - options
     */
    IdentityProviderRepository.prototype.list = function (options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/identity-providers",
                    method: "GET",
                    query: {
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new index_2.Page(data, data.data, index_1.IdentityProviderAdapter.fromApi, pageOptions));
            }, null);
        };
        return new index_2.Paginator(pageFunc, options);
    };
    /**
     * read
     * @param id - Entity ID.
     */
    IdentityProviderRepository.prototype.read = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/identity-providers/{identity_provider_id}",
                method: "GET",
                pathParams: {
                    identity_provider_id: id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.IdentityProviderAdapter.fromApi(data));
        });
    };
    /**
     * refreshTokens
     * @param id - Entity ID.
     */
    IdentityProviderRepository.prototype.refreshTokens = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/identity-providers/{identity_provider_id}/refresh-jwks",
                method: "POST",
                pathParams: {
                    identity_provider_id: id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.IdentityProviderAdapter.fromApi(data));
        });
    };
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - Entity ID.
     * @param discovery - Indicates that the OpenID Connect endpoints and keys should be set using the OpenID Connect Discovery mechanism. The following parameters are set automatically: * authorization_endpoint * token_endpoint * userinfo_endpoint * revocation_endpoint * jwks_uri * keys
     */
    IdentityProviderRepository.prototype.update = function (request, id, discovery) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
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
        }, function (data, done) {
            done(null, index_1.IdentityProviderAdapter.fromApi(data, request));
        });
    };
    return IdentityProviderRepository;
}(repository_1.Repository));
exports.IdentityProviderRepository = IdentityProviderRepository;
//# sourceMappingURL=identityProviderRepository.js.map