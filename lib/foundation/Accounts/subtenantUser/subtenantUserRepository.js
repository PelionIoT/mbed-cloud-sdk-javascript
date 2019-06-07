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
 *SubtenantUser repository
 */
var SubtenantUserRepository = /** @class */ (function (_super) {
    __extends(SubtenantUserRepository, _super);
    function SubtenantUserRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * create
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account.
     * @param action - Create or invite user.
     */
    SubtenantUserRepository.prototype.create = function (request, accountId, action) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/users",
                method: "POST",
                query: {
                    action: action,
                },
                pathParams: {
                    account_id: accountId,
                },
                body: {
                    address: request.address,
                    email: request.email,
                    full_name: request.fullName,
                    is_gtc_accepted: request.isGtcAccepted,
                    is_marketing_accepted: request.isMarketingAccepted,
                    login_profiles: request.loginProfiles,
                    password: request.password,
                    phone_number: request.phoneNumber,
                    username: request.username,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.SubtenantUserAdapter.fromApi(data, request));
        });
    };
    /**
     * delete
     * @param accountId - Account ID.
     * @param id - The ID of the user to delete.
     */
    SubtenantUserRepository.prototype.delete = function (accountId, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/users/{user_id}",
                method: "DELETE",
                pathParams: {
                    account_id: accountId,
                    user_id: id,
                },
            }, resultsFn);
        }, function (_data, done) {
            done(null, null);
        });
    };
    /**
     * read
     * @param accountId - The ID of the account.
     * @param id - The ID of the user.
     */
    SubtenantUserRepository.prototype.read = function (accountId, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/users/{user_id}",
                method: "GET",
                pathParams: {
                    account_id: accountId,
                    user_id: id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.SubtenantUserAdapter.fromApi(data));
        });
    };
    /**
     * update
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account.
     * @param id - The ID of the user.
     */
    SubtenantUserRepository.prototype.update = function (request, accountId, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/users/{user_id}",
                method: "PUT",
                pathParams: {
                    account_id: accountId,
                    user_id: id,
                },
                body: {
                    address: request.address,
                    full_name: request.fullName,
                    is_gtc_accepted: request.isGtcAccepted,
                    is_marketing_accepted: request.isMarketingAccepted,
                    is_totp_enabled: request.isTotpEnabled,
                    login_profiles: request.loginProfiles,
                    phone_number: request.phoneNumber,
                    username: request.username,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.SubtenantUserAdapter.fromApi(data, request));
        });
    };
    /**
     * validateEmail
     * @param accountId - Account ID.
     * @param id - The ID of the user.
     */
    SubtenantUserRepository.prototype.validateEmail = function (accountId, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/users/{user_id}/validate-email",
                method: "POST",
                pathParams: {
                    account_id: accountId,
                    user_id: id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.SubtenantUserAdapter.fromApi(data));
        });
    };
    return SubtenantUserRepository;
}(repository_1.Repository));
exports.SubtenantUserRepository = SubtenantUserRepository;
//# sourceMappingURL=subtenantUserRepository.js.map