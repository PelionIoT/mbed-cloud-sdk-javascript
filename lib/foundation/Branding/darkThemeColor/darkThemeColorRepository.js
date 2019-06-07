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
 *DarkThemeColor repository
 */
var DarkThemeColorRepository = /** @class */ (function (_super) {
    __extends(DarkThemeColorRepository, _super);
    function DarkThemeColorRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * delete
     * @param reference - Color name.
     */
    DarkThemeColorRepository.prototype.delete = function (reference) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/branding-colors/dark/{reference}",
                method: "DELETE",
                pathParams: {
                    reference: reference,
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
    DarkThemeColorRepository.prototype.list = function (options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/branding-colors/dark",
                    method: "GET",
                }, resultsFn);
            }, function (data, done) {
                done(null, new listResponse_1.ListResponse(data, data.data, index_1.DarkThemeColorAdapter.fromApi));
            }, null);
        };
        return new pagination_1.Paginator(pageFunc, options);
    };
    /**
     * read
     * @param reference - Color name.
     */
    DarkThemeColorRepository.prototype.read = function (reference) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/branding-colors/dark/{reference}",
                method: "GET",
                pathParams: {
                    reference: reference,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.DarkThemeColorAdapter.fromApi(data));
        });
    };
    /**
     * update
     * @param request - The entity to perform action on.
     * @param reference - Color name.
     */
    DarkThemeColorRepository.prototype.update = function (request, reference) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/branding-colors/dark/{reference}",
                method: "PUT",
                pathParams: {
                    reference: reference,
                },
                body: {
                    color: request.color,
                    updated_at: request.updatedAt,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.DarkThemeColorAdapter.fromApi(data, request));
        });
    };
    return DarkThemeColorRepository;
}(repository_1.Repository));
exports.DarkThemeColorRepository = DarkThemeColorRepository;
//# sourceMappingURL=darkThemeColorRepository.js.map