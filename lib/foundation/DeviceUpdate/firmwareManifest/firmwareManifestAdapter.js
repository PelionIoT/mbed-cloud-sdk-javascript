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
 *FirmwareManifest adapter
 */
var FirmwareManifestAdapter = /** @class */ (function (_super) {
    __extends(FirmwareManifestAdapter, _super);
    function FirmwareManifestAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    FirmwareManifestAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var mappedEntity = FirmwareManifestAdapter.assignDefined(instance || {}, {
            _discriminator: "FIRMWARE_MANIFEST",
            createdAt: data.created_at,
            datafileSize: data.datafile_size || 0,
            datafileUrl: data.datafile,
            description: data.description,
            deviceClass: data.device_class,
            id: data.id,
            keyTableUrl: data.key_table,
            name: data.name,
            timestamp: data.timestamp,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    };
    return FirmwareManifestAdapter;
}(adapter_1.Adapter));
exports.FirmwareManifestAdapter = FirmwareManifestAdapter;
//# sourceMappingURL=firmwareManifestAdapter.js.map