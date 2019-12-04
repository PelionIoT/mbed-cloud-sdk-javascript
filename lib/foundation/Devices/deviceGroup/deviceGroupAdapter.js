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
 *DeviceGroup adapter
 */
var DeviceGroupAdapter = /** @class */ (function (_super) {
    __extends(DeviceGroupAdapter, _super);
    function DeviceGroupAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    DeviceGroupAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var mappedEntity = DeviceGroupAdapter.assignDefined(instance || {}, {
            _discriminator: "DEVICE_GROUP",
            createdAt: data.created_at,
            customAttributes: data.custom_attributes,
            description: data.description,
            devicesCount: data.devices_count || 0,
            id: data.id,
            name: data.name,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    };
    return DeviceGroupAdapter;
}(adapter_1.Adapter));
exports.DeviceGroupAdapter = DeviceGroupAdapter;
//# sourceMappingURL=deviceGroupAdapter.js.map