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
var pagination_1 = require("../../../common/pagination");
var listResponse_1 = require("../../../legacy/common/listResponse");
/**
 *DeviceEnrollment repository
 */
var DeviceEnrollmentRepository = /** @class */ (function (_super) {
    __extends(DeviceEnrollmentRepository, _super);
    function DeviceEnrollmentRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * create
     * @param request - The entity to perform action on.
     */
    DeviceEnrollmentRepository.prototype.create = function (request) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/device-enrollments",
                method: "POST",
                body: {
                    enrollment_identity: request.enrollmentIdentity,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.DeviceEnrollmentAdapter.fromApi(data, request));
        });
    };
    /**
     * delete
     * @param id - Enrollment identity.
     */
    DeviceEnrollmentRepository.prototype.delete = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/device-enrollments/{id}",
                method: "DELETE",
                pathParams: {
                    id: id,
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
    DeviceEnrollmentRepository.prototype.list = function (options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/device-enrollments",
                    method: "GET",
                    query: {
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new listResponse_1.ListResponse(data, data.data, index_1.DeviceEnrollmentAdapter.fromApi));
            }, null);
        };
        return new pagination_1.Paginator(pageFunc, options);
    };
    /**
     * read
     * @param id - Enrollment identity.
     */
    DeviceEnrollmentRepository.prototype.read = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/device-enrollments/{id}",
                method: "GET",
                pathParams: {
                    id: id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.DeviceEnrollmentAdapter.fromApi(data));
        });
    };
    return DeviceEnrollmentRepository;
}(repository_1.Repository));
exports.DeviceEnrollmentRepository = DeviceEnrollmentRepository;
//# sourceMappingURL=deviceEnrollmentRepository.js.map