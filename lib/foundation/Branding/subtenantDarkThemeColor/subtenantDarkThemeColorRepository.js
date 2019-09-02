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
/**
 *SubtenantDarkThemeColor repository
 */
var SubtenantDarkThemeColorRepository = /** @class */ (function (_super) {
    __extends(SubtenantDarkThemeColorRepository, _super);
    function SubtenantDarkThemeColorRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * delete
     * @param accountId - Account ID.
     * @param reference - The name of the branding color.
     */
    SubtenantDarkThemeColorRepository.prototype.delete = function (accountId, reference) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/branding-colors/dark/{reference}",
                method: "DELETE",
                pathParams: {
                    account_id: accountId,
                    reference: reference,
                },
            }, resultsFn);
        }, function (_data, done) {
            done(null, null);
        });
    };
    /**
     * read
     * @param accountId - Account ID.
     * @param reference - Color name.
     */
    SubtenantDarkThemeColorRepository.prototype.read = function (accountId, reference) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/branding-colors/dark/{reference}",
                method: "GET",
                pathParams: {
                    account_id: accountId,
                    reference: reference,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.SubtenantDarkThemeColorAdapter.fromApi(data));
        });
    };
    /**
     * update
     * @param request - The entity to perform action on.
     * @param accountId - Account ID.
     * @param reference - Color name.
     */
    SubtenantDarkThemeColorRepository.prototype.update = function (request, accountId, reference) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/branding-colors/dark/{reference}",
                method: "PUT",
                pathParams: {
                    account_id: accountId,
                    reference: reference,
                },
                body: {
                    color: request.color,
                    updated_at: request.updatedAt,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.SubtenantDarkThemeColorAdapter.fromApi(data, request));
        });
    };
    return SubtenantDarkThemeColorRepository;
}(repository_1.Repository));
exports.SubtenantDarkThemeColorRepository = SubtenantDarkThemeColorRepository;
//# sourceMappingURL=subtenantDarkThemeColorRepository.js.map