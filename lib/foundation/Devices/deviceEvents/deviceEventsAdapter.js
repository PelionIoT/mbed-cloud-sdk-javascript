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
 *DeviceEvents adapter
 */
var DeviceEventsAdapter = /** @class */ (function (_super) {
    __extends(DeviceEventsAdapter, _super);
    function DeviceEventsAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    DeviceEventsAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var mappedEntity = DeviceEventsAdapter.assignDefined(instance || {}, {
            _discriminator: "DEVICE_EVENTS",
            changes: data.changes,
            createdAt: data.created_at,
            data: data.data,
            dateTime: data.date_time,
            description: data.description,
            deviceId: data.device_id,
            eventType: data.event_type,
            eventTypeCategory: data.event_type_category,
            eventTypeDescription: data.event_type_description,
            id: data.id,
            stateChange: data.state_change,
        });
        return mappedEntity;
    };
    return DeviceEventsAdapter;
}(adapter_1.Adapter));
exports.DeviceEventsAdapter = DeviceEventsAdapter;
//# sourceMappingURL=deviceEventsAdapter.js.map