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
var filters_1 = require("../../../common/filters");
var pagination_1 = require("../../../common/pagination");
var listResponse_1 = require("../../../legacy/common/listResponse");
/**
 *TrustedCertificate repository
 */
var TrustedCertificateRepository = /** @class */ (function (_super) {
    __extends(TrustedCertificateRepository, _super);
    function TrustedCertificateRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * create
     * @param request - The entity to perform action on.
     */
    TrustedCertificateRepository.prototype.create = function (request) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/trusted-certificates",
                method: "POST",
                body: {
                    certificate: request.certificate,
                    description: request.description,
                    enrollment_mode: request.enrollmentMode,
                    name: request.name,
                    service: request.service,
                    status: request.status,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.TrustedCertificateAdapter.fromApi(data, request));
        });
    };
    /**
     * delete
     * @param id - The ID of the trusted certificate to delete.
     */
    TrustedCertificateRepository.prototype.delete = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/trusted-certificates/{cert_id}",
                method: "DELETE",
                pathParams: {
                    cert_id: id,
                },
            }, resultsFn);
        }, function (_data, done) {
            done(null, null);
        });
    };
    /**
     * getDeveloperCertificateInfo
     * @param id - ID that uniquely identifies the developer certificate.
     */
    TrustedCertificateRepository.prototype.getDeveloperCertificateInfo = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/developer-certificates/{developerCertificateId}",
                method: "GET",
                pathParams: {
                    developerCertificateId: id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_2.DeveloperCertificateAdapter.fromApi(data));
        });
    };
    /**
     * list
     * @param options - Options to use for the List
     */
    TrustedCertificateRepository.prototype.list = function (options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/trusted-certificates",
                    method: "GET",
                    query: {
                        name__eq: filters_1.extractFilter(pageOptions.filter, "name", "eq"),
                        service__eq: filters_1.extractFilter(pageOptions.filter, "service", "eq"),
                        expire__eq: filters_1.extractFilter(pageOptions.filter, "expire", "eq"),
                        device_execution_mode__eq: filters_1.extractFilter(pageOptions.filter, "deviceExecutionMode", "eq"),
                        device_execution_mode__neq: filters_1.extractFilter(pageOptions.filter, "deviceExecutionMode", "neq"),
                        owner__eq: filters_1.extractFilter(pageOptions.filter, "owner", "eq"),
                        enrollment_mode__eq: filters_1.extractFilter(pageOptions.filter, "enrollmentMode", "eq"),
                        status__eq: filters_1.extractFilter(pageOptions.filter, "status", "eq"),
                        issuer__like: filters_1.extractFilter(pageOptions.filter, "issuer", "like"),
                        subject__like: filters_1.extractFilter(pageOptions.filter, "subject", "like"),
                        valid__eq: filters_1.extractFilter(pageOptions.filter, "valid", "eq"),
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new listResponse_1.ListResponse(data, data.data, index_1.TrustedCertificateAdapter.fromApi));
            }, null);
        };
        return new pagination_1.Paginator(pageFunc, options);
    };
    /**
     * read
     * @param id - Entity ID.
     */
    TrustedCertificateRepository.prototype.read = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/trusted-certificates/{cert_id}",
                method: "GET",
                pathParams: {
                    cert_id: id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.TrustedCertificateAdapter.fromApi(data));
        });
    };
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - Entity ID.
     */
    TrustedCertificateRepository.prototype.update = function (request, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/trusted-certificates/{cert_id}",
                method: "PUT",
                pathParams: {
                    cert_id: id,
                },
                body: {
                    certificate: request.certificate,
                    description: request.description,
                    enrollment_mode: request.enrollmentMode,
                    name: request.name,
                    service: request.service,
                    status: request.status,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.TrustedCertificateAdapter.fromApi(data, request));
        });
    };
    return TrustedCertificateRepository;
}(repository_1.Repository));
exports.TrustedCertificateRepository = TrustedCertificateRepository;
//# sourceMappingURL=trustedCertificateRepository.js.map