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
 *FirmwareManifest repository
 */
var FirmwareManifestRepository = /** @class */ (function (_super) {
    __extends(FirmwareManifestRepository, _super);
    function FirmwareManifestRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * create
     * @param firmwareManifestFile - The manifest file to create. The API gateway enforces the account-specific file size.
     */
    FirmwareManifestRepository.prototype.create = function (firmwareManifestFile, options) {
        var _this = this;
        options = options || {};
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/firmware-manifests/",
                method: "POST",
                formParams: {
                    description: options.description,
                    datafile: firmwareManifestFile,
                    key_table: options.keyTableFile,
                    name: options.name,
                },
                contentTypes: ["multipart/form-data"],
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.FirmwareManifestAdapter.fromApi(data));
        });
    };
    /**
     * delete
     * @param id - The firmware manifest ID
     */
    FirmwareManifestRepository.prototype.delete = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/firmware-manifests/{manifest_id}/",
                method: "DELETE",
                pathParams: {
                    manifest_id: id,
                },
            }, resultsFn);
        }, function (_data, done) {
            done(null, null);
        });
    };
    /**
     * list
     * @param options - Options to use for the List
     */
    FirmwareManifestRepository.prototype.list = function (options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/firmware-manifests/",
                    method: "GET",
                    query: {
                        created_at__in: filters_1.extractFilter(pageOptions.filter, "createdAt", "in"),
                        created_at__nin: filters_1.extractFilter(pageOptions.filter, "createdAt", "nin"),
                        created_at__lte: filters_1.extractFilter(pageOptions.filter, "createdAt", "lte"),
                        created_at__gte: filters_1.extractFilter(pageOptions.filter, "createdAt", "gte"),
                        datafile__eq: filters_1.extractFilter(pageOptions.filter, "datafileUrl", "eq"),
                        datafile__neq: filters_1.extractFilter(pageOptions.filter, "datafileUrl", "neq"),
                        datafile__in: filters_1.extractFilter(pageOptions.filter, "datafileUrl", "in"),
                        datafile__nin: filters_1.extractFilter(pageOptions.filter, "datafileUrl", "nin"),
                        datafile_size__eq: filters_1.extractFilter(pageOptions.filter, "datafileSize", "eq"),
                        datafile_size__neq: filters_1.extractFilter(pageOptions.filter, "datafileSize", "neq"),
                        datafile_size__in: filters_1.extractFilter(pageOptions.filter, "datafileSize", "in"),
                        datafile_size__nin: filters_1.extractFilter(pageOptions.filter, "datafileSize", "nin"),
                        description__eq: filters_1.extractFilter(pageOptions.filter, "description", "eq"),
                        description__neq: filters_1.extractFilter(pageOptions.filter, "description", "neq"),
                        description__in: filters_1.extractFilter(pageOptions.filter, "description", "in"),
                        description__nin: filters_1.extractFilter(pageOptions.filter, "description", "nin"),
                        device_class__eq: filters_1.extractFilter(pageOptions.filter, "deviceClass", "eq"),
                        device_class__neq: filters_1.extractFilter(pageOptions.filter, "deviceClass", "neq"),
                        device_class__in: filters_1.extractFilter(pageOptions.filter, "deviceClass", "in"),
                        device_class__nin: filters_1.extractFilter(pageOptions.filter, "deviceClass", "nin"),
                        id__eq: filters_1.extractFilter(pageOptions.filter, "id", "eq"),
                        id__neq: filters_1.extractFilter(pageOptions.filter, "id", "neq"),
                        id__in: filters_1.extractFilter(pageOptions.filter, "id", "in"),
                        id__nin: filters_1.extractFilter(pageOptions.filter, "id", "nin"),
                        name__eq: filters_1.extractFilter(pageOptions.filter, "name", "eq"),
                        name__neq: filters_1.extractFilter(pageOptions.filter, "name", "neq"),
                        name__in: filters_1.extractFilter(pageOptions.filter, "name", "in"),
                        name__nin: filters_1.extractFilter(pageOptions.filter, "name", "nin"),
                        timestamp__in: filters_1.extractFilter(pageOptions.filter, "timestamp", "in"),
                        timestamp__nin: filters_1.extractFilter(pageOptions.filter, "timestamp", "nin"),
                        timestamp__lte: filters_1.extractFilter(pageOptions.filter, "timestamp", "lte"),
                        timestamp__gte: filters_1.extractFilter(pageOptions.filter, "timestamp", "gte"),
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
                done(null, new listResponse_1.ListResponse(data, data.data, index_1.FirmwareManifestAdapter.fromApi));
            }, null);
        };
        return new pagination_1.Paginator(pageFunc, options);
    };
    /**
     * read
     * @param id - The firmware manifest ID
     */
    FirmwareManifestRepository.prototype.read = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/firmware-manifests/{manifest_id}/",
                method: "GET",
                pathParams: {
                    manifest_id: id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.FirmwareManifestAdapter.fromApi(data));
        });
    };
    return FirmwareManifestRepository;
}(repository_1.Repository));
exports.FirmwareManifestRepository = FirmwareManifestRepository;
//# sourceMappingURL=firmwareManifestRepository.js.map