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
var filters_1 = require("../../../common/filters");
var pagination_1 = require("../../../common/pagination");
var listResponse_1 = require("../../../legacy/common/listResponse");
/**
 *CertificateIssuerConfig repository
 */
var CertificateIssuerConfigRepository = /** @class */ (function (_super) {
    __extends(CertificateIssuerConfigRepository, _super);
    function CertificateIssuerConfigRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * create
     * @param request - The entity to perform action on.
     */
    CertificateIssuerConfigRepository.prototype.create = function (request) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/certificate-issuer-configurations",
                method: "POST",
                body: {
                    certificate_issuer_id: request.certificateIssuerId,
                    reference: request.reference,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.CertificateIssuerConfigAdapter.fromApi(data, request));
        });
    };
    /**
* delete
* @param id - The ID of the certificate issuer configuration.

*/
    CertificateIssuerConfigRepository.prototype.delete = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/certificate-issuer-configurations/{certificate-issuer-configuration-id}",
                method: "DELETE",
                pathParams: {
                    "certificate-issuer-configuration-id": id,
                },
            }, resultsFn);
        }, function (_data, done) {
            done(null, null);
        });
    };
    /**
     * getDefault
     */
    CertificateIssuerConfigRepository.prototype.getDefault = function () {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/certificate-issuer-configurations/lwm2m",
                method: "GET",
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.CertificateIssuerConfigAdapter.fromApi(data));
        });
    };
    /**
     * list
     * @param options - Options to use for the List
     */
    CertificateIssuerConfigRepository.prototype.list = function (options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/certificate-issuer-configurations",
                    method: "GET",
                    query: {
                        reference__eq: filters_1.extractFilter(pageOptions.filter, "reference", "eq"),
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new listResponse_1.ListResponse(data, data.data, index_1.CertificateIssuerConfigAdapter.fromApi));
            }, null);
        };
        return new pagination_1.Paginator(pageFunc, options);
    };
    /**
* read
* @param id - The ID of the certificate issuer configuration.

*/
    CertificateIssuerConfigRepository.prototype.read = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/certificate-issuer-configurations/{certificate-issuer-configuration-id}",
                method: "GET",
                pathParams: {
                    "certificate-issuer-configuration-id": id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.CertificateIssuerConfigAdapter.fromApi(data));
        });
    };
    /**
* update
* @param request - The entity to perform action on.
* @param id - The ID of the certificate issuer configuration.

*/
    CertificateIssuerConfigRepository.prototype.update = function (request, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/certificate-issuer-configurations/{certificate-issuer-configuration-id}",
                method: "PUT",
                pathParams: {
                    "certificate-issuer-configuration-id": id,
                },
                body: {
                    certificate_issuer_id: request.certificateIssuerId,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.CertificateIssuerConfigAdapter.fromApi(data, request));
        });
    };
    return CertificateIssuerConfigRepository;
}(repository_1.Repository));
exports.CertificateIssuerConfigRepository = CertificateIssuerConfigRepository;
//# sourceMappingURL=certificateIssuerConfigRepository.js.map