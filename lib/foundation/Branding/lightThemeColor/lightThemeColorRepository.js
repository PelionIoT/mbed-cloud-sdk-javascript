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
 *LightThemeColor repository
 */
var LightThemeColorRepository = /** @class */ (function (_super) {
    __extends(LightThemeColorRepository, _super);
    function LightThemeColorRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * delete
     * @param reference - Color name.
     */
    LightThemeColorRepository.prototype.delete = function (reference) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/branding-colors/light/{reference}",
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
    LightThemeColorRepository.prototype.list = function (options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/branding-colors/light",
                    method: "GET",
                }, resultsFn);
            }, function (data, done) {
                done(null, new listResponse_1.ListResponse(data, data.data, index_1.LightThemeColorAdapter.fromApi));
            }, null);
        };
        return new pagination_1.Paginator(pageFunc, options);
    };
    /**
     * read
     * @param reference - Color name.
     */
    LightThemeColorRepository.prototype.read = function (reference) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/branding-colors/light/{reference}",
                method: "GET",
                pathParams: {
                    reference: reference,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.LightThemeColorAdapter.fromApi(data));
        });
    };
    /**
     * update
     * @param request - The entity to perform action on.
     * @param reference - Color name.
     */
    LightThemeColorRepository.prototype.update = function (request, reference) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/branding-colors/light/{reference}",
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
            done(null, index_1.LightThemeColorAdapter.fromApi(data, request));
        });
    };
    return LightThemeColorRepository;
}(repository_1.Repository));
exports.LightThemeColorRepository = LightThemeColorRepository;
//# sourceMappingURL=lightThemeColorRepository.js.map