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
var privateFunctions_1 = require("../../../common/privateFunctions");
/**
 *PreSharedKey adapter
 */
var PreSharedKeyAdapter = /** @class */ (function (_super) {
    __extends(PreSharedKeyAdapter, _super);
    function PreSharedKeyAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    PreSharedKeyAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var mappedEntity = PreSharedKeyAdapter.assignDefined(instance || {}, {
            _discriminator: "PRE_SHARED_KEY",
            createdAt: data.created_at,
            endpointName: data.endpoint_name,
            id: data.id,
        });
        privateFunctions_1.preSharedKeyIdSetter(mappedEntity);
        privateFunctions_1.preSharedKeyIdSetter(mappedEntity);
        return mappedEntity;
    };
    return PreSharedKeyAdapter;
}(adapter_1.Adapter));
exports.PreSharedKeyAdapter = PreSharedKeyAdapter;
//# sourceMappingURL=preSharedKeyAdapter.js.map