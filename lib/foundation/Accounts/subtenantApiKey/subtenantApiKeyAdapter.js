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
 *SubtenantApiKey adapter
 */
var SubtenantApiKeyAdapter = /** @class */ (function (_super) {
    __extends(SubtenantApiKeyAdapter, _super);
    function SubtenantApiKeyAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    SubtenantApiKeyAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var mappedEntity = SubtenantApiKeyAdapter.assignDefined(instance || {}, {
            _discriminator: "SUBTENANT_API_KEY",
            accountId: data.account_id,
            createdAt: data.created_at,
            creationTime: data.creation_time || 0,
            id: data.id,
            key: data.key,
            lastLoginTime: data.last_login_time || 0,
            name: data.name,
            owner: data.owner,
            status: data.status,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    };
    return SubtenantApiKeyAdapter;
}(adapter_1.Adapter));
exports.SubtenantApiKeyAdapter = SubtenantApiKeyAdapter;
//# sourceMappingURL=subtenantApiKeyAdapter.js.map