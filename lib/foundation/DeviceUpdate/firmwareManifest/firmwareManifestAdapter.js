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
            datafileSize: data.datafile_size || undefined,
            datafileUrl: data.datafile,
            deliveredPayloadDigest: data.delivered_payload_digest,
            deliveredPayloadSize: data.delivered_payload_size || undefined,
            deliveredPayloadType: data.delivered_payload_type,
            deliveredPayloadUrl: data.delivered_payload_url,
            description: data.description,
            deviceClass: data.device_class,
            deviceVendor: data.device_vendor,
            id: data.id,
            keyTableUrl: data.key_table,
            manifestSchemaVersion: data.manifest_schema_version,
            name: data.name,
            parsedRawManifest: data.parsed_raw_manifest,
            precursorPayloadDigest: data.precursor_payload_digest,
            timestamp: data.timestamp,
            updatePriority: data.update_priority || undefined,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    };
    return FirmwareManifestAdapter;
}(adapter_1.Adapter));
exports.FirmwareManifestAdapter = FirmwareManifestAdapter;
//# sourceMappingURL=firmwareManifestAdapter.js.map