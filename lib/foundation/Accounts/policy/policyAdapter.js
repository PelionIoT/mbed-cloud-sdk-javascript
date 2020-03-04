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
 *Policy adapter
 */
var PolicyAdapter = /** @class */ (function (_super) {
    __extends(PolicyAdapter, _super);
    function PolicyAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    PolicyAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var mappedEntity = PolicyAdapter.assignDefined(instance || {}, {
            _discriminator: "POLICY",
            action: data.action,
            allow: data.allow,
            feature: data.feature,
            inherited: data.inherited,
            inheritedFrom: data.inherited_from,
            inheritedType: data.inherited_type,
            resource: data.resource,
        });
        return mappedEntity;
    };
    return PolicyAdapter;
}(adapter_1.Adapter));
exports.PolicyAdapter = PolicyAdapter;
//# sourceMappingURL=policyAdapter.js.map