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
 *ActiveSession adapter
 */
var ActiveSessionAdapter = /** @class */ (function (_super) {
    __extends(ActiveSessionAdapter, _super);
    function ActiveSessionAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    ActiveSessionAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var mappedEntity = ActiveSessionAdapter.assignDefined(instance || {}, {
            _discriminator: "ACTIVE_SESSION",
            accountId: data.account_id,
            ipAddress: data.ip_address,
            loginTime: data.login_time,
            referenceToken: data.reference_token,
            userAgent: data.user_agent,
        });
        return mappedEntity;
    };
    return ActiveSessionAdapter;
}(adapter_1.Adapter));
exports.ActiveSessionAdapter = ActiveSessionAdapter;
//# sourceMappingURL=activeSessionAdapter.js.map