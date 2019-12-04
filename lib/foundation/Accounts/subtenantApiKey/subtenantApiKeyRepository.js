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
var index_1 = require("../../../index");
var functions_1 = require("../../../legacy/common/functions");
var index_2 = require("../../index");
var index_3 = require("../../index");
/**
 *SubtenantApiKey repository
 */
var SubtenantApiKeyRepository = /** @class */ (function (_super) {
    __extends(SubtenantApiKeyRepository, _super);
    function SubtenantApiKeyRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * create
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account.
     */
    SubtenantApiKeyRepository.prototype.create = function (request, accountId) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/api-keys",
                method: "POST",
                pathParams: {
                    account_id: accountId,
                },
                body: {
                    groups: request.groups,
                    name: request.name,
                    owner: request.owner,
                    status: request.status,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_2.SubtenantApiKeyAdapter.fromApi(data, request));
        });
    };
    /**
     * delete
     * @param accountId - Account ID.
     * @param id - The ID of the API key to delete.
     */
    SubtenantApiKeyRepository.prototype.delete = function (accountId, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/api-keys/{apikey_id}",
                method: "DELETE",
                pathParams: {
                    account_id: accountId,
                    apikey_id: id,
                },
            }, resultsFn);
        }, function (_data, done) {
            done(null, null);
        });
    };
    /**
     * policyGroups
     * @param accountId - Account ID.
     * @param id - The ID of the API key.
     * @param options - options
     */
    SubtenantApiKeyRepository.prototype.policyGroups = function (accountId, id, options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/accounts/{account_id}/api-keys/{apikey_id}/groups",
                    method: "GET",
                    query: {
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                    pathParams: {
                        account_id: accountId,
                        apikey_id: id,
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
     * @param accountId - The ID of the account.
     * @param id - The ID of the API key.
     */
    SubtenantApiKeyRepository.prototype.read = function (accountId, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/api-keys/{apikey_id}",
                method: "GET",
                pathParams: {
                    account_id: accountId,
                    apikey_id: id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_2.SubtenantApiKeyAdapter.fromApi(data));
        });
    };
    /**
     * update
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account.
     * @param id - The ID of the API key.
     */
    SubtenantApiKeyRepository.prototype.update = function (request, accountId, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/api-keys/{apikey_id}",
                method: "PUT",
                pathParams: {
                    account_id: accountId,
                    apikey_id: id,
                },
                body: {
                    groups: request.groups,
                    name: request.name,
                    owner: request.owner,
                    status: request.status,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_2.SubtenantApiKeyAdapter.fromApi(data, request));
        });
    };
    return SubtenantApiKeyRepository;
}(repository_1.Repository));
exports.SubtenantApiKeyRepository = SubtenantApiKeyRepository;
//# sourceMappingURL=subtenantApiKeyRepository.js.map