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
 *UserInvitation repository
 */
var UserInvitationRepository = /** @class */ (function (_super) {
    __extends(UserInvitationRepository, _super);
    function UserInvitationRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * create
     * @param request - The entity to perform action on.
     */
    UserInvitationRepository.prototype.create = function (request) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/user-invitations",
                method: "POST",
                body: {
                    email: request.email,
                    login_profiles: request.loginProfiles,
                    valid_for_days: request.validForDays,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.UserInvitationAdapter.fromApi(data, request));
        });
    };
    /**
     * delete
     * @param id - The ID of the invitation to delete.
     */
    UserInvitationRepository.prototype.delete = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/user-invitations/{invitation_id}",
                method: "DELETE",
                pathParams: {
                    invitation_id: id,
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
    UserInvitationRepository.prototype.list = function (options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/user-invitations",
                    method: "GET",
                    query: {
                        login_profiles__eq: filters_1.extractFilter(pageOptions.filter, "loginProfiles", "eq"),
                        after: pageOptions.after,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new listResponse_1.ListResponse(data, data.data, index_1.UserInvitationAdapter.fromApi));
            }, null);
        };
        return new pagination_1.Paginator(pageFunc, options);
    };
    /**
     * read
     * @param id - The ID of the invitation.
     */
    UserInvitationRepository.prototype.read = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/user-invitations/{invitation_id}",
                method: "GET",
                pathParams: {
                    invitation_id: id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.UserInvitationAdapter.fromApi(data));
        });
    };
    return UserInvitationRepository;
}(repository_1.Repository));
exports.UserInvitationRepository = UserInvitationRepository;
//# sourceMappingURL=userInvitationRepository.js.map