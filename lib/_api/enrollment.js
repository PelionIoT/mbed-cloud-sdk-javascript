"use strict";
/* tslint:disable:array-type */
/* tslint:disable:no-namespace */
/* tslint:disable:no-string-literal */
/* tslint:disable:max-classes-per-file */
/* tslint:disable:no-trailing-whitespace */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var apiBase_1 = require("../common/apiBase");
var sdkError_1 = require("../common/sdkError");
/**
 * PublicAPIApi
 */
var PublicAPIApi = /** @class */ (function (_super) {
    __extends(PublicAPIApi, _super);
    function PublicAPIApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Place an enrollment claim for one or several devices.
     * When the device connects to the bootstrap server and provides the enrollment ID, it will be assigned to your account.
     * @param enrollmentIdentity
     */
    PublicAPIApi.prototype.createDeviceEnrollment = function (enrollmentIdentity, callback, requestOptions) {
        // verify required parameter "enrollmentIdentity" is set
        if (enrollmentIdentity === null || enrollmentIdentity === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'enrollmentIdentity' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [
            "application/json"
        ];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/device-enrollments",
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: enrollmentIdentity,
        }, callback);
    };
    /**
     * Delete an enrollment by ID.
     * To free a device from your account you can delete the enrollment claim. To bypass the device ownership, you need to delete the enrollment and do a factory reset for the device. For more information on the ownership trasfer, see [https://github.com/ARMmbed/mbed_Cloud_Docs/blob/restructure/Docs/provisioning/generic_instructions/device-ownership.md#transferring-ownership-using-first-to-claim](TODO put the right link).
     * @param id Enrollment identity internal id
     */
    PublicAPIApi.prototype.deleteDeviceEnrollment = function (id, callback, requestOptions) {
        // verify required parameter "id" is set
        if (id === null || id === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'id' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/device-enrollments/{id}".replace("{" + "id" + "}", String(id)),
            method: "DELETE",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Get details of an enrollment by ID.
     * To check the enrollment info in detail, for example claming date and expiration date.
     * @param id Enrollment identity internal id
     */
    PublicAPIApi.prototype.getDeviceEnrollment = function (id, callback, requestOptions) {
        // verify required parameter "id" is set
        if (id === null || id === undefined) {
            if (callback) {
                callback(new sdkError_1.SDKError("Required parameter 'id' missing."));
            }
            return;
        }
        var headerParams = {};
        var queryParameters = {};
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/device-enrollments/{id}".replace("{" + "id" + "}", String(id)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    /**
     * Get enrollment list.
     * Provides a list of pending and claimed enrollments. Example usage:
     * @param limit Number of results to be returned. Between 2 and 1000, inclusive.
     * @param after Entity ID to fetch after.
     * @param order ASC or DESC
     * @param include Comma separate additional data to return. Currently supported: total_count
     */
    PublicAPIApi.prototype.getDeviceEnrollments = function (limit, after, order, include, callback, requestOptions) {
        var headerParams = {};
        var queryParameters = {};
        if (limit !== undefined) {
            queryParameters["limit"] = limit;
        }
        if (after !== undefined) {
            queryParameters["after"] = after;
        }
        if (order !== undefined) {
            queryParameters["order"] = order;
        }
        if (include !== undefined) {
            queryParameters["include"] = include;
        }
        // tslint:disable-next-line:prefer-const
        var useFormData = false;
        var formParams = {};
        // Determine the Content-Type header
        var contentTypes = [];
        // Determine the Accept header
        var acceptTypes = [
            "application/json"
        ];
        return this.request({
            url: "/v3/device-enrollments",
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    };
    return PublicAPIApi;
}(apiBase_1.ApiBase));
exports.PublicAPIApi = PublicAPIApi;

//# sourceMappingURL=enrollment.js.map
