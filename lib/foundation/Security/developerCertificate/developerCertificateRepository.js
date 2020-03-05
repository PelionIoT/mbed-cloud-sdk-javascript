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
 *DeveloperCertificate repository
 */
var DeveloperCertificateRepository = /** @class */ (function (_super) {
    __extends(DeveloperCertificateRepository, _super);
    function DeveloperCertificateRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * create
     * @param request - The entity to perform action on.
     */
    DeveloperCertificateRepository.prototype.create = function (request) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/developer-certificates",
                method: "POST",
                body: {
                    description: request.description,
                    name: request.name,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.DeveloperCertificateAdapter.fromApi(data, request));
        });
    };
    /**
     * delete
     * @param id - The ID of the trusted certificate to delete.
     */
    DeveloperCertificateRepository.prototype.delete = function (id) {
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
     * getTrustedCertificateInfo
     * @param id - Entity ID.
     */
    DeveloperCertificateRepository.prototype.getTrustedCertificateInfo = function (id) {
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
            done(null, index_2.TrustedCertificateAdapter.fromApi(data));
        });
    };
    /**
     * read
     * @param id - ID that uniquely identifies the developer certificate.
     */
    DeveloperCertificateRepository.prototype.read = function (id) {
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
            done(null, index_1.DeveloperCertificateAdapter.fromApi(data));
        });
    };
    return DeveloperCertificateRepository;
}(repository_1.Repository));
exports.DeveloperCertificateRepository = DeveloperCertificateRepository;
//# sourceMappingURL=developerCertificateRepository.js.map