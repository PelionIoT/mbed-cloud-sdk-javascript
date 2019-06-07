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
 *User repository
 */
var UserRepository = /** @class */ (function (_super) {
    __extends(UserRepository, _super);
    function UserRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * create
     * @param request - The entity to perform action on.
     * @param action - Action, either `create` or `invite`.
     */
    UserRepository.prototype.create = function (request, action) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/users",
                method: "POST",
                query: {
                    action: action,
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
            done(null, index_1.UserAdapter.fromApi(data, request));
        });
    };
    /**
     * delete
     * @param id - The ID of the user to delete.
     */
    UserRepository.prototype.delete = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/users/{user_id}",
                method: "DELETE",
                pathParams: {
                    user_id: id,
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
    UserRepository.prototype.list = function (options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/users",
                    method: "GET",
                    query: {
                        email__eq: filters_1.extractFilter(pageOptions.filter, "email", "eq"),
                        status__eq: filters_1.extractFilter(pageOptions.filter, "status", "eq"),
                        status__in: filters_1.extractFilter(pageOptions.filter, "status", "in"),
                        status__nin: filters_1.extractFilter(pageOptions.filter, "status", "nin"),
                        login_profiles__eq: filters_1.extractFilter(pageOptions.filter, "loginProfiles", "eq"),
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new listResponse_1.ListResponse(data, data.data, index_1.UserAdapter.fromApi));
            }, null);
        };
        return new pagination_1.Paginator(pageFunc, options);
    };
    /**
     * read
     * @param id - The ID of the user.
     */
    UserRepository.prototype.read = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/users/{user_id}",
                method: "GET",
                pathParams: {
                    user_id: id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.UserAdapter.fromApi(data));
        });
    };
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - The ID of the user.
     */
    UserRepository.prototype.update = function (request, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/users/{user_id}",
                method: "PUT",
                pathParams: {
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
            done(null, index_1.UserAdapter.fromApi(data, request));
        });
    };
    return UserRepository;
}(repository_1.Repository));
exports.UserRepository = UserRepository;
//# sourceMappingURL=userRepository.js.map