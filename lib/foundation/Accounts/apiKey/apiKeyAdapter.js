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
 *ApiKey adapter
 */
var ApiKeyAdapter = /** @class */ (function (_super) {
    __extends(ApiKeyAdapter, _super);
    function ApiKeyAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    ApiKeyAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var mappedEntity = ApiKeyAdapter.assignDefined(instance || {}, {
            _discriminator: "API_KEY",
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
    return ApiKeyAdapter;
}(adapter_1.Adapter));
exports.ApiKeyAdapter = ApiKeyAdapter;
//# sourceMappingURL=apiKeyAdapter.js.map