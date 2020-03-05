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
 *PolicyGroup adapter
 */
var PolicyGroupAdapter = /** @class */ (function (_super) {
    __extends(PolicyGroupAdapter, _super);
    function PolicyGroupAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    PolicyGroupAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var mappedEntity = PolicyGroupAdapter.assignDefined(instance || {}, {
            _discriminator: "POLICY_GROUP",
            accountId: data.account_id,
            apikeyCount: data.apikey_count,
            createdAt: data.created_at,
            id: data.id,
            name: data.name,
            updatedAt: data.updated_at,
            userCount: data.user_count,
        });
        return mappedEntity;
    };
    return PolicyGroupAdapter;
}(adapter_1.Adapter));
exports.PolicyGroupAdapter = PolicyGroupAdapter;
//# sourceMappingURL=policyGroupAdapter.js.map