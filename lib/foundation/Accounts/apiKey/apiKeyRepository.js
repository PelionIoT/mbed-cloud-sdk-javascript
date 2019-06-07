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
 *ApiKey repository
 */
var ApiKeyRepository = /** @class */ (function (_super) {
    __extends(ApiKeyRepository, _super);
    function ApiKeyRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * create
     * @param request - The entity to perform action on.
     */
    ApiKeyRepository.prototype.create = function (request) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/api-keys",
                method: "POST",
                body: {
                    name: request.name,
                    owner: request.owner,
                    status: request.status,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.ApiKeyAdapter.fromApi(data, request));
        });
    };
    /**
     * delete
     * @param id - The ID of the API key to delete.
     */
    ApiKeyRepository.prototype.delete = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/api-keys/{apikey_id}",
                method: "DELETE",
                pathParams: {
                    apikey_id: id,
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
    ApiKeyRepository.prototype.list = function (options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/api-keys",
                    method: "GET",
                    query: {
                        key__eq: filters_1.extractFilter(pageOptions.filter, "key", "eq"),
                        owner__eq: filters_1.extractFilter(pageOptions.filter, "owner", "eq"),
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new listResponse_1.ListResponse(data, data.data, index_1.ApiKeyAdapter.fromApi));
            }, null);
        };
        return new pagination_1.Paginator(pageFunc, options);
    };
    /**
     * me
     */
    ApiKeyRepository.prototype.me = function () {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/api-keys/me",
                method: "GET",
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.ApiKeyAdapter.fromApi(data));
        });
    };
    /**
     * read
     * @param id - The ID of the API key.
     */
    ApiKeyRepository.prototype.read = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/api-keys/{apikey_id}",
                method: "GET",
                pathParams: {
                    apikey_id: id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.ApiKeyAdapter.fromApi(data));
        });
    };
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - The ID of the API key.
     */
    ApiKeyRepository.prototype.update = function (request, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/api-keys/{apikey_id}",
                method: "PUT",
                pathParams: {
                    apikey_id: id,
                },
                body: {
                    name: request.name,
                    owner: request.owner,
                    status: request.status,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.ApiKeyAdapter.fromApi(data, request));
        });
    };
    return ApiKeyRepository;
}(repository_1.Repository));
exports.ApiKeyRepository = ApiKeyRepository;
//# sourceMappingURL=apiKeyRepository.js.map