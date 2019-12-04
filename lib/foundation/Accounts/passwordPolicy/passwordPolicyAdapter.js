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
 *PasswordPolicy adapter
 */
var PasswordPolicyAdapter = /** @class */ (function (_super) {
    __extends(PasswordPolicyAdapter, _super);
    function PasswordPolicyAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    PasswordPolicyAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var mappedEntity = PasswordPolicyAdapter.assignDefined(instance || {}, {
            _discriminator: "PASSWORD_POLICY",
            minimumLength: data.minimum_length || 8,
        });
        return mappedEntity;
    };
    return PasswordPolicyAdapter;
}(adapter_1.Adapter));
exports.PasswordPolicyAdapter = PasswordPolicyAdapter;
//# sourceMappingURL=passwordPolicyAdapter.js.map