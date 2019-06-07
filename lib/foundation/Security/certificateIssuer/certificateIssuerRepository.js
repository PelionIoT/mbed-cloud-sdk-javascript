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
var index_2 = require("../../index");
var pagination_1 = require("../../../common/pagination");
var listResponse_1 = require("../../../legacy/common/listResponse");
/**
 *CertificateIssuer repository
 */
var CertificateIssuerRepository = /** @class */ (function (_super) {
    __extends(CertificateIssuerRepository, _super);
    function CertificateIssuerRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * create
     * @param request - The entity to perform action on.
     */
    CertificateIssuerRepository.prototype.create = function (request) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/certificate-issuers",
                method: "POST",
                body: {
                    description: request.description,
                    issuer_attributes: request.issuerAttributes,
                    issuer_credentials: request.issuerCredentials,
                    issuer_type: request.issuerType,
                    name: request.name,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.CertificateIssuerAdapter.fromApi(data, request));
        });
    };
    /**
* delete
* @param id - Certificate issuer ID. <br> The ID of the certificate issuer.
An active certificate issuer may not be deleted.

*/
    CertificateIssuerRepository.prototype.delete = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/certificate-issuers/{certificate-issuer-id}",
                method: "DELETE",
                pathParams: {
                    "certificate-issuer-id": id,
                },
            }, resultsFn);
        }, function (_data, done) {
            done(null, null);
        });
    };
    /**
     * list
     * @param options - options
     */
    CertificateIssuerRepository.prototype.list = function (options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/certificate-issuers",
                    method: "GET",
                    query: {
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new listResponse_1.ListResponse(data, data.data, index_1.CertificateIssuerAdapter.fromApi));
            }, null);
        };
        return new pagination_1.Paginator(pageFunc, options);
    };
    /**
     * read
     * @param id - The ID of the certificate issuer.
     */
    CertificateIssuerRepository.prototype.read = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/certificate-issuers/{certificate-issuer-id}",
                method: "GET",
                pathParams: {
                    "certificate-issuer-id": id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.CertificateIssuerAdapter.fromApi(data));
        });
    };
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - The ID of the certificate issuer.
     */
    CertificateIssuerRepository.prototype.update = function (request, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/certificate-issuers/{certificate-issuer-id}",
                method: "PUT",
                pathParams: {
                    "certificate-issuer-id": id,
                },
                body: {
                    description: request.description,
                    issuer_attributes: request.issuerAttributes,
                    issuer_credentials: request.issuerCredentials,
                    name: request.name,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.CertificateIssuerAdapter.fromApi(data, request));
        });
    };
    /**
* verify
* @param id - Certificate issuer ID. <br> The ID of the certificate issuer.

*/
    CertificateIssuerRepository.prototype.verify = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/certificate-issuers/{certificate-issuer-id}/verify",
                method: "POST",
                pathParams: {
                    "certificate-issuer-id": id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_2.VerificationResponseAdapter.fromApi(data));
        });
    };
    return CertificateIssuerRepository;
}(repository_1.Repository));
exports.CertificateIssuerRepository = CertificateIssuerRepository;
//# sourceMappingURL=certificateIssuerRepository.js.map