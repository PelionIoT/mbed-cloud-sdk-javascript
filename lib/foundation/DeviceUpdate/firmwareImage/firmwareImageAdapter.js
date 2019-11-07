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
 *FirmwareImage adapter
 */
var FirmwareImageAdapter = /** @class */ (function (_super) {
    __extends(FirmwareImageAdapter, _super);
    function FirmwareImageAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    FirmwareImageAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var mappedEntity = FirmwareImageAdapter.assignDefined(instance || {}, {
            _discriminator: "FIRMWARE_IMAGE",
            createdAt: data.created_at,
            datafileChecksum: data.datafile_checksum,
            datafileSize: data.datafile_size || 0,
            datafileUrl: data.datafile,
            description: data.description,
            id: data.id,
            name: data.name,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    };
    return FirmwareImageAdapter;
}(adapter_1.Adapter));
exports.FirmwareImageAdapter = FirmwareImageAdapter;
//# sourceMappingURL=firmwareImageAdapter.js.map