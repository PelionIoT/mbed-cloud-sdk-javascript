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
var filters_1 = require("../../../common/filters");
var index_1 = require("../../index");
var pagination_1 = require("../../../common/pagination");
var listResponse_1 = require("../../../legacy/common/listResponse");
/**
 *DeviceEnrollmentDenial repository
 */
var DeviceEnrollmentDenialRepository = /** @class */ (function (_super) {
    __extends(DeviceEnrollmentDenialRepository, _super);
    function DeviceEnrollmentDenialRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * list
     * @param options - Options to use for the List
     */
    DeviceEnrollmentDenialRepository.prototype.list = function (options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/device-enrollment-denials",
                    method: "GET",
                    query: {
                        trusted_certificate_id__eq: filters_1.extractFilter(pageOptions.filter, "trustedCertificateId", "eq"),
                        endpoint_name__eq: filters_1.extractFilter(pageOptions.filter, "endpointName", "eq"),
                        after: pageOptions.after,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new listResponse_1.ListResponse(data, data.data, index_1.DeviceEnrollmentDenialAdapter.fromApi));
            }, null);
        };
        return new pagination_1.Paginator(pageFunc, options);
    };
    /**
     * read
     * @param deviceEnrollmentDenialId - id of the recorded failed bootstrap attempt
     */
    DeviceEnrollmentDenialRepository.prototype.read = function (deviceEnrollmentDenialId) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/device-enrollment-denials/{device_enrollment_denial_id}",
                method: "GET",
                pathParams: {
                    device_enrollment_denial_id: deviceEnrollmentDenialId,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.DeviceEnrollmentDenialAdapter.fromApi(data));
        });
    };
    return DeviceEnrollmentDenialRepository;
}(repository_1.Repository));
exports.DeviceEnrollmentDenialRepository = DeviceEnrollmentDenialRepository;
//# sourceMappingURL=deviceEnrollmentDenialRepository.js.map