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
/**
 *LoginHistory adapter
 */
var LoginHistoryAdapter = /** @class */ (function (_super) {
    __extends(LoginHistoryAdapter, _super);
    function LoginHistoryAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    LoginHistoryAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var mappedEntity = LoginHistoryAdapter.assignDefined(instance || {}, {
            _discriminator: "LOGIN_HISTORY",
            date: data.date,
            ipAddress: data.ip_address,
            success: data.success,
            userAgent: data.user_agent,
        });
        return mappedEntity;
    };
    return LoginHistoryAdapter;
}(adapter_1.Adapter));
exports.LoginHistoryAdapter = LoginHistoryAdapter;
//# sourceMappingURL=loginHistoryAdapter.js.map