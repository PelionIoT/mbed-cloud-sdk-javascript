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
/**
 *SubtenantTrustedCertificate repository
 */
var SubtenantTrustedCertificateRepository = /** @class */ (function (_super) {
    __extends(SubtenantTrustedCertificateRepository, _super);
    function SubtenantTrustedCertificateRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * create
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account.
     */
    SubtenantTrustedCertificateRepository.prototype.create = function (request, accountId) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/trusted-certificates",
                method: "POST",
                pathParams: {
                    account_id: accountId,
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
            done(null, index_1.SubtenantTrustedCertificateAdapter.fromApi(data, request));
        });
    };
    /**
     * delete
     * @param accountId - Account ID.
     * @param id - The ID of the trusted certificate to delete.
     */
    SubtenantTrustedCertificateRepository.prototype.delete = function (accountId, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/trusted-certificates/{cert_id}",
                method: "DELETE",
                pathParams: {
                    account_id: accountId,
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
    SubtenantTrustedCertificateRepository.prototype.getDeveloperCertificateInfo = function (id) {
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
     * read
     * @param accountId - The ID of the account.
     * @param id - Entity ID.
     */
    SubtenantTrustedCertificateRepository.prototype.read = function (accountId, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/trusted-certificates/{cert_id}",
                method: "GET",
                pathParams: {
                    account_id: accountId,
                    cert_id: id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.SubtenantTrustedCertificateAdapter.fromApi(data));
        });
    };
    /**
     * update
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account.
     * @param id - Entity ID.
     */
    SubtenantTrustedCertificateRepository.prototype.update = function (request, accountId, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/trusted-certificates/{cert_id}",
                method: "PUT",
                pathParams: {
                    account_id: accountId,
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
            done(null, index_1.SubtenantTrustedCertificateAdapter.fromApi(data, request));
        });
    };
    return SubtenantTrustedCertificateRepository;
}(repository_1.Repository));
exports.SubtenantTrustedCertificateRepository = SubtenantTrustedCertificateRepository;
//# sourceMappingURL=subtenantTrustedCertificateRepository.js.map