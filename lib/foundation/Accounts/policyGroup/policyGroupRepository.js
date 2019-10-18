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
var index_3 = require("../../index");
var index_4 = require("../../../index");
/**
 *PolicyGroup repository
 */
var PolicyGroupRepository = /** @class */ (function (_super) {
    __extends(PolicyGroupRepository, _super);
    function PolicyGroupRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * apiKeys
     * @param id - The ID of the group.
     * @param options - options
     */
    PolicyGroupRepository.prototype.apiKeys = function (id, options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/policy-groups/{group_id}/api-keys",
                    method: "GET",
                    query: {
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                    pathParams: {
                        group_id: id,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new index_4.Page(data, data.data, index_1.ApiKeyAdapter.fromApi, pageOptions));
            }, null);
        };
        return new index_4.Paginator(pageFunc, options);
    };
    /**
     * create
     * @param request - The entity to perform action on.
     */
    PolicyGroupRepository.prototype.create = function (request) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/policy-groups",
                method: "POST",
                body: {
                    members: request.members,
                    name: request.name,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_2.PolicyGroupAdapter.fromApi(data, request));
        });
    };
    /**
     * delete
     * @param id - The ID of the group to delete.
     */
    PolicyGroupRepository.prototype.delete = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/policy-groups/{group_id}",
                method: "DELETE",
                pathParams: {
                    group_id: id,
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
    PolicyGroupRepository.prototype.list = function (options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/policy-groups",
                    method: "GET",
                    query: {
                        name__eq: filters_1.extractFilter(pageOptions.filter, "name", "eq"),
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new index_4.Page(data, data.data, index_2.PolicyGroupAdapter.fromApi, pageOptions));
            }, null);
        };
        return new index_4.Paginator(pageFunc, options);
    };
    /**
     * read
     * @param id - The ID of the group.
     */
    PolicyGroupRepository.prototype.read = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/policy-groups/{group_id}",
                method: "GET",
                pathParams: {
                    group_id: id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_2.PolicyGroupAdapter.fromApi(data));
        });
    };
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - The ID of the group.
     */
    PolicyGroupRepository.prototype.update = function (request, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/policy-groups/{group_id}",
                method: "PUT",
                pathParams: {
                    group_id: id,
                },
                body: {
                    name: request.name,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_2.PolicyGroupAdapter.fromApi(data, request));
        });
    };
    /**
     * users
     * @param id - The ID of the group.
     * @param options - Options to use for the List
     */
    PolicyGroupRepository.prototype.users = function (id, options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/policy-groups/{group_id}/users",
                    method: "GET",
                    query: {
                        status__eq: filters_1.extractFilter(pageOptions.filter, "status", "eq"),
                        status__in: filters_1.extractFilter(pageOptions.filter, "status", "in"),
                        status__nin: filters_1.extractFilter(pageOptions.filter, "status", "nin"),
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                    pathParams: {
                        group_id: id,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new index_4.Page(data, data.data, index_3.UserAdapter.fromApi, pageOptions));
            }, null);
        };
        return new index_4.Paginator(pageFunc, options);
    };
    return PolicyGroupRepository;
}(repository_1.Repository));
exports.PolicyGroupRepository = PolicyGroupRepository;
//# sourceMappingURL=policyGroupRepository.js.map