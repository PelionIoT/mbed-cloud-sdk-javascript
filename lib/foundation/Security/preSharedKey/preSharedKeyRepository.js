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
var pagination_1 = require("../../../common/pagination");
var listResponse_1 = require("../../../legacy/common/listResponse");
/**
 *PreSharedKey repository
 */
var PreSharedKeyRepository = /** @class */ (function (_super) {
    __extends(PreSharedKeyRepository, _super);
    function PreSharedKeyRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * create
     * @param request - The entity to perform action on.
     */
    PreSharedKeyRepository.prototype.create = function (request) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v2/device-shared-keys",
                method: "POST",
                body: {
                    endpoint_name: request.endpointName,
                    secret_hex: request.secretHex,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.PreSharedKeyAdapter.fromApi(data, request));
        });
    };
    /**
     * delete
     * @param id - The Id of the pre_shared_key, shadows the endpoint_name
     */
    PreSharedKeyRepository.prototype.delete = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v2/device-shared-keys/{endpoint_name}",
                method: "DELETE",
                pathParams: {
                    endpoint_name: id,
                },
            }, resultsFn);
        }, function (_data, done) {
            done(null, null);
        });
    };
    /**
     * list
     * @param options - options
     */
    PreSharedKeyRepository.prototype.list = function (options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v2/device-shared-keys",
                    method: "GET",
                    query: {
                        after: pageOptions.after,
                        limit: pageOptions.limit,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new listResponse_1.ListResponse(data, data.data, index_1.PreSharedKeyAdapter.fromApi));
            }, null);
        };
        return new pagination_1.Paginator(pageFunc, options);
    };
    /**
     * read
     * @param id - The Id of the pre_shared_key, shadows the endpoint_name
     */
    PreSharedKeyRepository.prototype.read = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v2/device-shared-keys/{endpoint_name}",
                method: "GET",
                pathParams: {
                    endpoint_name: id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.PreSharedKeyAdapter.fromApi(data));
        });
    };
    return PreSharedKeyRepository;
}(repository_1.Repository));
exports.PreSharedKeyRepository = PreSharedKeyRepository;
//# sourceMappingURL=preSharedKeyRepository.js.map