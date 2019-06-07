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
var privateFunctions_1 = require("../../../common/privateFunctions");
var privateFunctions_2 = require("../../../common/privateFunctions");
/**
 *DeviceEnrollmentBulkCreate repository
 */
var DeviceEnrollmentBulkCreateRepository = /** @class */ (function (_super) {
    __extends(DeviceEnrollmentBulkCreateRepository, _super);
    function DeviceEnrollmentBulkCreateRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * create
     * @param enrollmentIdentities - The `CSV` file containing the enrollment IDs. The maximum file size is 10 MB.
     */
    DeviceEnrollmentBulkCreateRepository.prototype.create = function (enrollmentIdentities) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/device-enrollments-bulk-uploads",
                method: "POST",
                formParams: {
                    enrollment_identities: enrollmentIdentities,
                },
                contentTypes: ["multipart/form-data"],
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.DeviceEnrollmentBulkCreateAdapter.fromApi(data));
        });
    };
    /**
     * downloadErrorsReportFile
     * @param model - model
     */
    DeviceEnrollmentBulkCreateRepository.prototype.downloadErrorsReportFile = function (model) {
        return privateFunctions_1.downloadErrorsReportFile(this, model);
    };
    /**
     * downloadFullReportFile
     * @param model - model
     */
    DeviceEnrollmentBulkCreateRepository.prototype.downloadFullReportFile = function (model) {
        return privateFunctions_2.downloadFullReportFile(this, model);
    };
    /**
     * read
     * @param id - Bulk ID
     */
    DeviceEnrollmentBulkCreateRepository.prototype.read = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/device-enrollments-bulk-uploads/{id}",
                method: "GET",
                pathParams: {
                    id: id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.DeviceEnrollmentBulkCreateAdapter.fromApi(data));
        });
    };
    return DeviceEnrollmentBulkCreateRepository;
}(repository_1.Repository));
exports.DeviceEnrollmentBulkCreateRepository = DeviceEnrollmentBulkCreateRepository;
//# sourceMappingURL=deviceEnrollmentBulkCreateRepository.js.map