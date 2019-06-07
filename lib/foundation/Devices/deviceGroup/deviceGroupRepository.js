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
 *DeviceGroup repository
 */
var DeviceGroupRepository = /** @class */ (function (_super) {
    __extends(DeviceGroupRepository, _super);
    function DeviceGroupRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * addDevice
     * @param request - The entity to perform action on.
     * @param id - The ID of the group.
     */
    DeviceGroupRepository.prototype.addDevice = function (request, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/device-groups/{device-group-id}/devices/add/",
                method: "POST",
                pathParams: {
                    "device-group-id": id,
                },
                body: {
                    device_id: request.deviceId,
                },
            }, resultsFn);
        }, function (_data, done) {
            done(null, null);
        });
    };
    /**
     * create
     * @param request - The entity to perform action on.
     */
    DeviceGroupRepository.prototype.create = function (request) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/device-groups/",
                method: "POST",
                body: {
                    custom_attributes: request.customAttributes,
                    description: request.description,
                    name: request.name,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.DeviceGroupAdapter.fromApi(data, request));
        });
    };
    /**
     * delete
     * @param id - The ID of the group
     */
    DeviceGroupRepository.prototype.delete = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/device-groups/{device-group-id}/",
                method: "DELETE",
                pathParams: {
                    "device-group-id": id,
                },
            }, resultsFn);
        }, function (_data, done) {
            done(null, null);
        });
    };
    /**
     * devices
     * @param id - id
     * @param options - Options to use for the List
     */
    DeviceGroupRepository.prototype.devices = function (id, options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/device-groups/{device-group-id}/devices/",
                    method: "GET",
                    query: {
                        account_id__eq: filters_1.extractFilter(pageOptions.filter, "accountId", "eq"),
                        account_id__neq: filters_1.extractFilter(pageOptions.filter, "accountId", "neq"),
                        account_id__in: filters_1.extractFilter(pageOptions.filter, "accountId", "in"),
                        account_id__nin: filters_1.extractFilter(pageOptions.filter, "accountId", "nin"),
                        auto_update__eq: filters_1.extractFilter(pageOptions.filter, "autoUpdate", "eq"),
                        auto_update__neq: filters_1.extractFilter(pageOptions.filter, "autoUpdate", "neq"),
                        bootstrap_expiration_date__in: filters_1.extractFilter(pageOptions.filter, "bootstrapExpirationDate", "in"),
                        bootstrap_expiration_date__nin: filters_1.extractFilter(pageOptions.filter, "bootstrapExpirationDate", "nin"),
                        bootstrap_expiration_date__lte: filters_1.extractFilter(pageOptions.filter, "bootstrapExpirationDate", "lte"),
                        bootstrap_expiration_date__gte: filters_1.extractFilter(pageOptions.filter, "bootstrapExpirationDate", "gte"),
                        bootstrapped_timestamp__in: filters_1.extractFilter(pageOptions.filter, "bootstrappedTimestamp", "in"),
                        bootstrapped_timestamp__nin: filters_1.extractFilter(pageOptions.filter, "bootstrappedTimestamp", "nin"),
                        bootstrapped_timestamp__lte: filters_1.extractFilter(pageOptions.filter, "bootstrappedTimestamp", "lte"),
                        bootstrapped_timestamp__gte: filters_1.extractFilter(pageOptions.filter, "bootstrappedTimestamp", "gte"),
                        ca_id__eq: filters_1.extractFilter(pageOptions.filter, "caId", "eq"),
                        ca_id__neq: filters_1.extractFilter(pageOptions.filter, "caId", "neq"),
                        ca_id__in: filters_1.extractFilter(pageOptions.filter, "caId", "in"),
                        ca_id__nin: filters_1.extractFilter(pageOptions.filter, "caId", "nin"),
                        connector_expiration_date__in: filters_1.extractFilter(pageOptions.filter, "connectorExpirationDate", "in"),
                        connector_expiration_date__nin: filters_1.extractFilter(pageOptions.filter, "connectorExpirationDate", "nin"),
                        connector_expiration_date__lte: filters_1.extractFilter(pageOptions.filter, "connectorExpirationDate", "lte"),
                        connector_expiration_date__gte: filters_1.extractFilter(pageOptions.filter, "connectorExpirationDate", "gte"),
                        created_at__in: filters_1.extractFilter(pageOptions.filter, "createdAt", "in"),
                        created_at__nin: filters_1.extractFilter(pageOptions.filter, "createdAt", "nin"),
                        created_at__lte: filters_1.extractFilter(pageOptions.filter, "createdAt", "lte"),
                        created_at__gte: filters_1.extractFilter(pageOptions.filter, "createdAt", "gte"),
                        deployed_state__eq: filters_1.extractFilter(pageOptions.filter, "deployedState", "eq"),
                        deployed_state__neq: filters_1.extractFilter(pageOptions.filter, "deployedState", "neq"),
                        deployed_state__in: filters_1.extractFilter(pageOptions.filter, "deployedState", "in"),
                        deployed_state__nin: filters_1.extractFilter(pageOptions.filter, "deployedState", "nin"),
                        deployment__eq: filters_1.extractFilter(pageOptions.filter, "deployment", "eq"),
                        deployment__neq: filters_1.extractFilter(pageOptions.filter, "deployment", "neq"),
                        deployment__in: filters_1.extractFilter(pageOptions.filter, "deployment", "in"),
                        deployment__nin: filters_1.extractFilter(pageOptions.filter, "deployment", "nin"),
                        description__eq: filters_1.extractFilter(pageOptions.filter, "description", "eq"),
                        description__neq: filters_1.extractFilter(pageOptions.filter, "description", "neq"),
                        description__in: filters_1.extractFilter(pageOptions.filter, "description", "in"),
                        description__nin: filters_1.extractFilter(pageOptions.filter, "description", "nin"),
                        device_class__eq: filters_1.extractFilter(pageOptions.filter, "deviceClass", "eq"),
                        device_class__neq: filters_1.extractFilter(pageOptions.filter, "deviceClass", "neq"),
                        device_class__in: filters_1.extractFilter(pageOptions.filter, "deviceClass", "in"),
                        device_class__nin: filters_1.extractFilter(pageOptions.filter, "deviceClass", "nin"),
                        device_execution_mode__eq: filters_1.extractFilter(pageOptions.filter, "deviceExecutionMode", "eq"),
                        device_execution_mode__neq: filters_1.extractFilter(pageOptions.filter, "deviceExecutionMode", "neq"),
                        device_execution_mode__in: filters_1.extractFilter(pageOptions.filter, "deviceExecutionMode", "in"),
                        device_execution_mode__nin: filters_1.extractFilter(pageOptions.filter, "deviceExecutionMode", "nin"),
                        device_key__eq: filters_1.extractFilter(pageOptions.filter, "deviceKey", "eq"),
                        device_key__neq: filters_1.extractFilter(pageOptions.filter, "deviceKey", "neq"),
                        device_key__in: filters_1.extractFilter(pageOptions.filter, "deviceKey", "in"),
                        device_key__nin: filters_1.extractFilter(pageOptions.filter, "deviceKey", "nin"),
                        endpoint_name__eq: filters_1.extractFilter(pageOptions.filter, "endpointName", "eq"),
                        endpoint_name__neq: filters_1.extractFilter(pageOptions.filter, "endpointName", "neq"),
                        endpoint_name__in: filters_1.extractFilter(pageOptions.filter, "endpointName", "in"),
                        endpoint_name__nin: filters_1.extractFilter(pageOptions.filter, "endpointName", "nin"),
                        endpoint_type__eq: filters_1.extractFilter(pageOptions.filter, "endpointType", "eq"),
                        endpoint_type__neq: filters_1.extractFilter(pageOptions.filter, "endpointType", "neq"),
                        endpoint_type__in: filters_1.extractFilter(pageOptions.filter, "endpointType", "in"),
                        endpoint_type__nin: filters_1.extractFilter(pageOptions.filter, "endpointType", "nin"),
                        enrolment_list_timestamp__in: filters_1.extractFilter(pageOptions.filter, "enrolmentListTimestamp", "in"),
                        enrolment_list_timestamp__nin: filters_1.extractFilter(pageOptions.filter, "enrolmentListTimestamp", "nin"),
                        enrolment_list_timestamp__lte: filters_1.extractFilter(pageOptions.filter, "enrolmentListTimestamp", "lte"),
                        enrolment_list_timestamp__gte: filters_1.extractFilter(pageOptions.filter, "enrolmentListTimestamp", "gte"),
                        firmware_checksum__eq: filters_1.extractFilter(pageOptions.filter, "firmwareChecksum", "eq"),
                        firmware_checksum__neq: filters_1.extractFilter(pageOptions.filter, "firmwareChecksum", "neq"),
                        firmware_checksum__in: filters_1.extractFilter(pageOptions.filter, "firmwareChecksum", "in"),
                        firmware_checksum__nin: filters_1.extractFilter(pageOptions.filter, "firmwareChecksum", "nin"),
                        host_gateway__eq: filters_1.extractFilter(pageOptions.filter, "hostGateway", "eq"),
                        host_gateway__neq: filters_1.extractFilter(pageOptions.filter, "hostGateway", "neq"),
                        host_gateway__in: filters_1.extractFilter(pageOptions.filter, "hostGateway", "in"),
                        host_gateway__nin: filters_1.extractFilter(pageOptions.filter, "hostGateway", "nin"),
                        id__eq: filters_1.extractFilter(pageOptions.filter, "id", "eq"),
                        id__neq: filters_1.extractFilter(pageOptions.filter, "id", "neq"),
                        id__in: filters_1.extractFilter(pageOptions.filter, "id", "in"),
                        id__nin: filters_1.extractFilter(pageOptions.filter, "id", "nin"),
                        manifest__eq: filters_1.extractFilter(pageOptions.filter, "manifest", "eq"),
                        manifest__neq: filters_1.extractFilter(pageOptions.filter, "manifest", "neq"),
                        manifest__in: filters_1.extractFilter(pageOptions.filter, "manifest", "in"),
                        manifest__nin: filters_1.extractFilter(pageOptions.filter, "manifest", "nin"),
                        manifest_timestamp__in: filters_1.extractFilter(pageOptions.filter, "manifestTimestamp", "in"),
                        manifest_timestamp__nin: filters_1.extractFilter(pageOptions.filter, "manifestTimestamp", "nin"),
                        manifest_timestamp__lte: filters_1.extractFilter(pageOptions.filter, "manifestTimestamp", "lte"),
                        manifest_timestamp__gte: filters_1.extractFilter(pageOptions.filter, "manifestTimestamp", "gte"),
                        mechanism__eq: filters_1.extractFilter(pageOptions.filter, "mechanism", "eq"),
                        mechanism__neq: filters_1.extractFilter(pageOptions.filter, "mechanism", "neq"),
                        mechanism__in: filters_1.extractFilter(pageOptions.filter, "mechanism", "in"),
                        mechanism__nin: filters_1.extractFilter(pageOptions.filter, "mechanism", "nin"),
                        mechanism_url__eq: filters_1.extractFilter(pageOptions.filter, "mechanismUrl", "eq"),
                        mechanism_url__neq: filters_1.extractFilter(pageOptions.filter, "mechanismUrl", "neq"),
                        mechanism_url__in: filters_1.extractFilter(pageOptions.filter, "mechanismUrl", "in"),
                        mechanism_url__nin: filters_1.extractFilter(pageOptions.filter, "mechanismUrl", "nin"),
                        name__eq: filters_1.extractFilter(pageOptions.filter, "name", "eq"),
                        name__neq: filters_1.extractFilter(pageOptions.filter, "name", "neq"),
                        name__in: filters_1.extractFilter(pageOptions.filter, "name", "in"),
                        name__nin: filters_1.extractFilter(pageOptions.filter, "name", "nin"),
                        serial_number__eq: filters_1.extractFilter(pageOptions.filter, "serialNumber", "eq"),
                        serial_number__neq: filters_1.extractFilter(pageOptions.filter, "serialNumber", "neq"),
                        serial_number__in: filters_1.extractFilter(pageOptions.filter, "serialNumber", "in"),
                        serial_number__nin: filters_1.extractFilter(pageOptions.filter, "serialNumber", "nin"),
                        state__eq: filters_1.extractFilter(pageOptions.filter, "state", "eq"),
                        state__neq: filters_1.extractFilter(pageOptions.filter, "state", "neq"),
                        state__in: filters_1.extractFilter(pageOptions.filter, "state", "in"),
                        state__nin: filters_1.extractFilter(pageOptions.filter, "state", "nin"),
                        updated_at__in: filters_1.extractFilter(pageOptions.filter, "updatedAt", "in"),
                        updated_at__nin: filters_1.extractFilter(pageOptions.filter, "updatedAt", "nin"),
                        updated_at__lte: filters_1.extractFilter(pageOptions.filter, "updatedAt", "lte"),
                        updated_at__gte: filters_1.extractFilter(pageOptions.filter, "updatedAt", "gte"),
                        vendor_id__eq: filters_1.extractFilter(pageOptions.filter, "vendorId", "eq"),
                        vendor_id__neq: filters_1.extractFilter(pageOptions.filter, "vendorId", "neq"),
                        vendor_id__in: filters_1.extractFilter(pageOptions.filter, "vendorId", "in"),
                        vendor_id__nin: filters_1.extractFilter(pageOptions.filter, "vendorId", "nin"),
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                    pathParams: {
                        "device-group-id": id,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new listResponse_1.ListResponse(data, data.data, index_2.DeviceAdapter.fromApi));
            }, null);
        };
        return new pagination_1.Paginator(pageFunc, options);
    };
    /**
     * list
     * @param options - Options to use for the List
     */
    DeviceGroupRepository.prototype.list = function (options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/device-groups/",
                    method: "GET",
                    query: {
                        id__eq: filters_1.extractFilter(pageOptions.filter, "id", "eq"),
                        id__neq: filters_1.extractFilter(pageOptions.filter, "id", "neq"),
                        id__in: filters_1.extractFilter(pageOptions.filter, "id", "in"),
                        id__nin: filters_1.extractFilter(pageOptions.filter, "id", "nin"),
                        devices_count__eq: filters_1.extractFilter(pageOptions.filter, "devicesCount", "eq"),
                        devices_count__neq: filters_1.extractFilter(pageOptions.filter, "devicesCount", "neq"),
                        devices_count__in: filters_1.extractFilter(pageOptions.filter, "devicesCount", "in"),
                        devices_count__nin: filters_1.extractFilter(pageOptions.filter, "devicesCount", "nin"),
                        devices_count__lte: filters_1.extractFilter(pageOptions.filter, "devicesCount", "lte"),
                        devices_count__gte: filters_1.extractFilter(pageOptions.filter, "devicesCount", "gte"),
                        name__eq: filters_1.extractFilter(pageOptions.filter, "name", "eq"),
                        name__neq: filters_1.extractFilter(pageOptions.filter, "name", "neq"),
                        name__in: filters_1.extractFilter(pageOptions.filter, "name", "in"),
                        name__nin: filters_1.extractFilter(pageOptions.filter, "name", "nin"),
                        created_at__in: filters_1.extractFilter(pageOptions.filter, "createdAt", "in"),
                        created_at__nin: filters_1.extractFilter(pageOptions.filter, "createdAt", "nin"),
                        created_at__lte: filters_1.extractFilter(pageOptions.filter, "createdAt", "lte"),
                        created_at__gte: filters_1.extractFilter(pageOptions.filter, "createdAt", "gte"),
                        updated_at__in: filters_1.extractFilter(pageOptions.filter, "updatedAt", "in"),
                        updated_at__nin: filters_1.extractFilter(pageOptions.filter, "updatedAt", "nin"),
                        updated_at__lte: filters_1.extractFilter(pageOptions.filter, "updatedAt", "lte"),
                        updated_at__gte: filters_1.extractFilter(pageOptions.filter, "updatedAt", "gte"),
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new listResponse_1.ListResponse(data, data.data, index_1.DeviceGroupAdapter.fromApi));
            }, null);
        };
        return new pagination_1.Paginator(pageFunc, options);
    };
    /**
     * read
     * @param id - The group ID.
     */
    DeviceGroupRepository.prototype.read = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/device-groups/{device-group-id}/",
                method: "GET",
                pathParams: {
                    "device-group-id": id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.DeviceGroupAdapter.fromApi(data));
        });
    };
    /**
     * removeDevice
     * @param request - The entity to perform action on.
     * @param id - The ID of the group.
     */
    DeviceGroupRepository.prototype.removeDevice = function (request, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/device-groups/{device-group-id}/devices/remove/",
                method: "POST",
                pathParams: {
                    "device-group-id": id,
                },
                body: {
                    device_id: request.deviceId,
                },
            }, resultsFn);
        }, function (_data, done) {
            done(null, null);
        });
    };
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - The group ID.
     */
    DeviceGroupRepository.prototype.update = function (request, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/device-groups/{device-group-id}/",
                method: "PUT",
                pathParams: {
                    "device-group-id": id,
                },
                body: {
                    custom_attributes: request.customAttributes,
                    description: request.description,
                    name: request.name,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.DeviceGroupAdapter.fromApi(data, request));
        });
    };
    return DeviceGroupRepository;
}(repository_1.Repository));
exports.DeviceGroupRepository = DeviceGroupRepository;
//# sourceMappingURL=deviceGroupRepository.js.map