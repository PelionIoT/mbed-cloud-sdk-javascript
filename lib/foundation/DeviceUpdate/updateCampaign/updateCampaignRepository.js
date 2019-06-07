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
 *UpdateCampaign repository
 */
var UpdateCampaignRepository = /** @class */ (function (_super) {
    __extends(UpdateCampaignRepository, _super);
    function UpdateCampaignRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * archive
     * @param id - The campaign ID
     */
    UpdateCampaignRepository.prototype.archive = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/update-campaigns/{campaign_id}/archive",
                method: "POST",
                pathParams: {
                    campaign_id: id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.UpdateCampaignAdapter.fromApi(data));
        });
    };
    /**
     * create
     * @param request - The entity to perform action on.
     */
    UpdateCampaignRepository.prototype.create = function (request) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/update-campaigns/",
                method: "POST",
                body: {
                    description: request.description,
                    device_filter: request.deviceFilter,
                    name: request.name,
                    root_manifest_id: request.rootManifestId,
                    when: request.when,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.UpdateCampaignAdapter.fromApi(data, request));
        });
    };
    /**
     * delete
     * @param id - The ID of the update campaign
     */
    UpdateCampaignRepository.prototype.delete = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/update-campaigns/{campaign_id}/",
                method: "DELETE",
                pathParams: {
                    campaign_id: id,
                },
            }, resultsFn);
        }, function (_data, done) {
            done(null, null);
        });
    };
    /**
     * deviceMetadata
     * @param id - The update campaign ID
     * @param options - options
     */
    UpdateCampaignRepository.prototype.deviceMetadata = function (id, options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/update-campaigns/{campaign_id}/campaign-device-metadata/",
                    method: "GET",
                    query: {
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                    pathParams: {
                        campaign_id: id,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new listResponse_1.ListResponse(data, data.data, index_2.CampaignDeviceMetadataAdapter.fromApi));
            }, null);
        };
        return new pagination_1.Paginator(pageFunc, options);
    };
    /**
     * list
     * @param options - Options to use for the List
     */
    UpdateCampaignRepository.prototype.list = function (options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/update-campaigns/",
                    method: "GET",
                    query: {
                        created_at__in: filters_1.extractFilter(pageOptions.filter, "createdAt", "in"),
                        created_at__nin: filters_1.extractFilter(pageOptions.filter, "createdAt", "nin"),
                        created_at__lte: filters_1.extractFilter(pageOptions.filter, "createdAt", "lte"),
                        created_at__gte: filters_1.extractFilter(pageOptions.filter, "createdAt", "gte"),
                        description__eq: filters_1.extractFilter(pageOptions.filter, "description", "eq"),
                        description__neq: filters_1.extractFilter(pageOptions.filter, "description", "neq"),
                        description__in: filters_1.extractFilter(pageOptions.filter, "description", "in"),
                        description__nin: filters_1.extractFilter(pageOptions.filter, "description", "nin"),
                        device_filter__eq: filters_1.extractFilter(pageOptions.filter, "deviceFilter", "eq"),
                        device_filter__neq: filters_1.extractFilter(pageOptions.filter, "deviceFilter", "neq"),
                        device_filter__in: filters_1.extractFilter(pageOptions.filter, "deviceFilter", "in"),
                        device_filter__nin: filters_1.extractFilter(pageOptions.filter, "deviceFilter", "nin"),
                        finished__in: filters_1.extractFilter(pageOptions.filter, "finished", "in"),
                        finished__nin: filters_1.extractFilter(pageOptions.filter, "finished", "nin"),
                        finished__lte: filters_1.extractFilter(pageOptions.filter, "finished", "lte"),
                        finished__gte: filters_1.extractFilter(pageOptions.filter, "finished", "gte"),
                        id__eq: filters_1.extractFilter(pageOptions.filter, "id", "eq"),
                        id__neq: filters_1.extractFilter(pageOptions.filter, "id", "neq"),
                        id__in: filters_1.extractFilter(pageOptions.filter, "id", "in"),
                        id__nin: filters_1.extractFilter(pageOptions.filter, "id", "nin"),
                        name__eq: filters_1.extractFilter(pageOptions.filter, "name", "eq"),
                        name__neq: filters_1.extractFilter(pageOptions.filter, "name", "neq"),
                        name__in: filters_1.extractFilter(pageOptions.filter, "name", "in"),
                        name__nin: filters_1.extractFilter(pageOptions.filter, "name", "nin"),
                        root_manifest_id__eq: filters_1.extractFilter(pageOptions.filter, "rootManifestId", "eq"),
                        root_manifest_id__neq: filters_1.extractFilter(pageOptions.filter, "rootManifestId", "neq"),
                        root_manifest_id__in: filters_1.extractFilter(pageOptions.filter, "rootManifestId", "in"),
                        root_manifest_id__nin: filters_1.extractFilter(pageOptions.filter, "rootManifestId", "nin"),
                        started_at__in: filters_1.extractFilter(pageOptions.filter, "startedAt", "in"),
                        started_at__nin: filters_1.extractFilter(pageOptions.filter, "startedAt", "nin"),
                        started_at__lte: filters_1.extractFilter(pageOptions.filter, "startedAt", "lte"),
                        started_at__gte: filters_1.extractFilter(pageOptions.filter, "startedAt", "gte"),
                        state__eq: filters_1.extractFilter(pageOptions.filter, "state", "eq"),
                        state__neq: filters_1.extractFilter(pageOptions.filter, "state", "neq"),
                        state__in: filters_1.extractFilter(pageOptions.filter, "state", "in"),
                        state__nin: filters_1.extractFilter(pageOptions.filter, "state", "nin"),
                        updated_at__in: filters_1.extractFilter(pageOptions.filter, "updatedAt", "in"),
                        updated_at__nin: filters_1.extractFilter(pageOptions.filter, "updatedAt", "nin"),
                        updated_at__lte: filters_1.extractFilter(pageOptions.filter, "updatedAt", "lte"),
                        updated_at__gte: filters_1.extractFilter(pageOptions.filter, "updatedAt", "gte"),
                        when__in: filters_1.extractFilter(pageOptions.filter, "when", "in"),
                        when__nin: filters_1.extractFilter(pageOptions.filter, "when", "nin"),
                        when__lte: filters_1.extractFilter(pageOptions.filter, "when", "lte"),
                        when__gte: filters_1.extractFilter(pageOptions.filter, "when", "gte"),
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new listResponse_1.ListResponse(data, data.data, index_1.UpdateCampaignAdapter.fromApi));
            }, null);
        };
        return new pagination_1.Paginator(pageFunc, options);
    };
    /**
     * read
     * @param id - The campaign ID
     */
    UpdateCampaignRepository.prototype.read = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/update-campaigns/{campaign_id}/",
                method: "GET",
                pathParams: {
                    campaign_id: id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.UpdateCampaignAdapter.fromApi(data));
        });
    };
    /**
     * start
     * @param id - The campaign ID
     */
    UpdateCampaignRepository.prototype.start = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/update-campaigns/{campaign_id}/start",
                method: "POST",
                pathParams: {
                    campaign_id: id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.UpdateCampaignAdapter.fromApi(data));
        });
    };
    /**
     * stop
     * @param id - The campaign ID
     */
    UpdateCampaignRepository.prototype.stop = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/update-campaigns/{campaign_id}/stop",
                method: "POST",
                pathParams: {
                    campaign_id: id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.UpdateCampaignAdapter.fromApi(data));
        });
    };
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - The campaign ID
     */
    UpdateCampaignRepository.prototype.update = function (request, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/update-campaigns/{campaign_id}/",
                method: "PUT",
                pathParams: {
                    campaign_id: id,
                },
                body: {
                    description: request.description,
                    device_filter: request.deviceFilter,
                    name: request.name,
                    root_manifest_id: request.rootManifestId,
                    when: request.when,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.UpdateCampaignAdapter.fromApi(data, request));
        });
    };
    return UpdateCampaignRepository;
}(repository_1.Repository));
exports.UpdateCampaignRepository = UpdateCampaignRepository;
//# sourceMappingURL=updateCampaignRepository.js.map