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
 *SubtenantUserInvitation repository
 */
var SubtenantUserInvitationRepository = /** @class */ (function (_super) {
    __extends(SubtenantUserInvitationRepository, _super);
    function SubtenantUserInvitationRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * create
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account the user is invited to.
     */
    SubtenantUserInvitationRepository.prototype.create = function (request, accountId) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/user-invitations",
                method: "POST",
                pathParams: {
                    account_id: accountId,
                },
                body: {
                    email: request.email,
                    login_profiles: request.loginProfiles,
                    valid_for_days: request.validForDays,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.SubtenantUserInvitationAdapter.fromApi(data, request));
        });
    };
    /**
     * delete
     * @param accountId - Account ID.
     * @param id - The ID of the invitation to delete.
     */
    SubtenantUserInvitationRepository.prototype.delete = function (accountId, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/user-invitations/{invitation_id}",
                method: "DELETE",
                pathParams: {
                    account_id: accountId,
                    invitation_id: id,
                },
            }, resultsFn);
        }, function (_data, done) {
            done(null, null);
        });
    };
    /**
     * read
     * @param accountId - The ID of the account the user is invited to.
     * @param id - The ID of the invitation.
     */
    SubtenantUserInvitationRepository.prototype.read = function (accountId, id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/accounts/{account_id}/user-invitations/{invitation_id}",
                method: "GET",
                pathParams: {
                    account_id: accountId,
                    invitation_id: id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.SubtenantUserInvitationAdapter.fromApi(data));
        });
    };
    return SubtenantUserInvitationRepository;
}(repository_1.Repository));
exports.SubtenantUserInvitationRepository = SubtenantUserInvitationRepository;
//# sourceMappingURL=subtenantUserInvitationRepository.js.map