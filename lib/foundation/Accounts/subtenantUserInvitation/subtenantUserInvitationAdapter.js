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
var adapter_1 = require("../../../common/adapter");
var __1 = require("../..");
/**
 *SubtenantUserInvitation adapter
 */
var SubtenantUserInvitationAdapter = /** @class */ (function (_super) {
    __extends(SubtenantUserInvitationAdapter, _super);
    function SubtenantUserInvitationAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    SubtenantUserInvitationAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var loginProfiles = [];
        if (data.login_profiles) {
            loginProfiles = data.login_profiles.map(function (i) { return __1.LoginProfileAdapter.fromApi(i); });
        }
        var mappedEntity = SubtenantUserInvitationAdapter.assignDefined(instance || {}, {
            _discriminator: "SUBTENANT_USER_INVITATION",
            accountId: data.account_id,
            createdAt: data.created_at,
            email: data.email,
            expiration: data.expiration,
            id: data.id,
            loginProfiles: loginProfiles,
            updatedAt: data.updated_at,
            userId: data.user_id,
        });
        return mappedEntity;
    };
    return SubtenantUserInvitationAdapter;
}(adapter_1.Adapter));
exports.SubtenantUserInvitationAdapter = SubtenantUserInvitationAdapter;
//# sourceMappingURL=subtenantUserInvitationAdapter.js.map