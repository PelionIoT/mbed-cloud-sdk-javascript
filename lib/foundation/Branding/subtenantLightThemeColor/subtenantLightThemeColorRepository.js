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
 *SubtenantLightThemeColor repository
 */
var SubtenantLightThemeColorRepository = /** @class */ (function (_super) {
    __extends(SubtenantLightThemeColorRepository, _super);
    function SubtenantLightThemeColorRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * delete
     * @param accountId - Account ID.
     * @param reference - Color name.
     */
    SubtenantLightThemeColorRepository.prototype.delete = function (accountId, reference) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/branding-colors/light/{reference}",
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
    SubtenantLightThemeColorRepository.prototype.read = function (accountId, reference) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/branding-colors/light/{reference}",
                method: "GET",
                pathParams: {
                    account_id: accountId,
                    reference: reference,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.SubtenantLightThemeColorAdapter.fromApi(data));
        });
    };
    /**
     * update
     * @param request - The entity to perform action on.
     * @param accountId - Account ID.
     * @param reference - Color name.
     */
    SubtenantLightThemeColorRepository.prototype.update = function (request, accountId, reference) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/branding-colors/light/{reference}",
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
            done(null, index_1.SubtenantLightThemeColorAdapter.fromApi(data, request));
        });
    };
    return SubtenantLightThemeColorRepository;
}(repository_1.Repository));
exports.SubtenantLightThemeColorRepository = SubtenantLightThemeColorRepository;
//# sourceMappingURL=subtenantLightThemeColorRepository.js.map