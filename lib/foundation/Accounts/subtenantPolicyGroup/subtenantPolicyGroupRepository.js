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
var filters_1 = require("../../../common/filters");
var repository_1 = require("../../../common/repository");
var index_1 = require("../../../index");
var functions_1 = require("../../../legacy/common/functions");
var index_2 = require("../../index");
var index_3 = require("../../index");
var index_4 = require("../../index");
/**
 *SubtenantPolicyGroup repository
 */
var SubtenantPolicyGroupRepository = /** @class */ (function (_super) {
    __extends(SubtenantPolicyGroupRepository, _super);
    function SubtenantPolicyGroupRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * apiKeys
     * @param accountId - Account ID.
     * @param id - The ID of the group to retrieve API keys for.
     * @param options - options
     */
    SubtenantPolicyGroupRepository.prototype.apiKeys = function (accountId, id, options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/accounts/{account_id}/policy-groups/{group_id}/api-keys",
                    method: "GET",
                    query: {
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                    pathParams: {
                        account_id: accountId,
                        group_id: id,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new index_1.Page(data, data.data, index_2.SubtenantApiKeyAdapter.fromApi, pageOptions));
            }, null);
        };
        return new index_1.Paginator(pageFunc, options);
    };
    /**
     * create
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account this group belongs to.
     */
    SubtenantPolicyGroupRepository.prototype.create = function (request, accountId) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/policy-groups",
                method: "POST",
                pathParams: {
                    account_id: accountId,
                },
                body: {
                    members: request.members,
                    name: request.name,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_3.SubtenantPolicyGroupAdapter.fromApi(data, request));
        });
    };
    /**
     * delete
     * @param accountId - Account ID.
     * @param id - The ID of the group to delete.
     */
    SubtenantPolicyGroupRepository.prototype.delete = function (accountId, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/policy-groups/{group_id}",
                method: "DELETE",
                pathParams: {
                    account_id: accountId,
                    group_id: id,
                },
            }, resultsFn);
        }, function (_data, done) {
            done(null, null);
        });
    };
    /**
     * list
     * @param accountId - Account ID.
     * @param options - Options to use for the List
     */
    SubtenantPolicyGroupRepository.prototype.list = function (accountId, options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/accounts/{account_id}/policy-groups",
                    method: "GET",
                    query: {
                        name__eq: filters_1.extractFilter(pageOptions.filter, "name", "eq"),
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                    pathParams: {
                        account_id: accountId,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new index_1.Page(data, data.data, index_3.SubtenantPolicyGroupAdapter.fromApi, pageOptions));
            }, null);
        };
        return new index_1.Paginator(pageFunc, options);
    };
    /**
     * read
     * @param accountId - The ID of the account this group belongs to.
     * @param id - The ID of the group.
     */
    SubtenantPolicyGroupRepository.prototype.read = function (accountId, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/policy-groups/{group_id}",
                method: "GET",
                pathParams: {
                    account_id: accountId,
                    group_id: id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_3.SubtenantPolicyGroupAdapter.fromApi(data));
        });
    };
    /**
     * update
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account this group belongs to.
     * @param id - The ID of the group.
     */
    SubtenantPolicyGroupRepository.prototype.update = function (request, accountId, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/policy-groups/{group_id}",
                method: "PUT",
                pathParams: {
                    account_id: accountId,
                    group_id: id,
                },
                body: {
                    name: request.name,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_3.SubtenantPolicyGroupAdapter.fromApi(data, request));
        });
    };
    /**
     * users
     * @param accountId - Account ID.
     * @param id - The ID of the group to retrieve users for.
     * @param options - Options to use for the List
     */
    SubtenantPolicyGroupRepository.prototype.users = function (accountId, id, options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/accounts/{account_id}/policy-groups/{group_id}/users",
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
                        account_id: accountId,
                        group_id: id,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new index_1.Page(data, data.data, index_4.SubtenantUserAdapter.fromApi, pageOptions));
            }, null);
        };
        return new index_1.Paginator(pageFunc, options);
    };
    return SubtenantPolicyGroupRepository;
}(repository_1.Repository));
exports.SubtenantPolicyGroupRepository = SubtenantPolicyGroupRepository;
//# sourceMappingURL=subtenantPolicyGroupRepository.js.map