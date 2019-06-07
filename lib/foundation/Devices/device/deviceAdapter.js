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
 *Device adapter
 */
var DeviceAdapter = /** @class */ (function (_super) {
    __extends(DeviceAdapter, _super);
    function DeviceAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    DeviceAdapter.fromApi = function (data, instance) {
        if (!data) {
            return null;
        }
        var mappedEntity = DeviceAdapter.assignDefined(instance || {}, {
            _discriminator: "DEVICE",
            accountId: data.account_id,
            autoUpdate: data.auto_update,
            bootstrapExpirationDate: data.bootstrap_expiration_date,
            bootstrappedTimestamp: data.bootstrapped_timestamp,
            caId: data.ca_id,
            connectorExpirationDate: data.connector_expiration_date,
            createdAt: data.created_at,
            customAttributes: data.custom_attributes,
            deployedState: data.deployed_state,
            deployment: data.deployment,
            description: data.description,
            deviceClass: data.device_class,
            deviceExecutionMode: data.device_execution_mode || 0,
            deviceKey: data.device_key,
            endpointName: data.endpoint_name,
            endpointType: data.endpoint_type,
            enrolmentListTimestamp: data.enrolment_list_timestamp,
            firmwareChecksum: data.firmware_checksum,
            hostGateway: data.host_gateway,
            id: data.id,
            issuerFingerprint: data.issuer_fingerprint,
            manifest: data.manifest,
            manifestTimestamp: data.manifest_timestamp,
            mechanism: data.mechanism,
            mechanismUrl: data.mechanism_url,
            name: data.name,
            serialNumber: data.serial_number,
            state: data.state,
            updatedAt: data.updated_at,
            vendorId: data.vendor_id,
        });
        return mappedEntity;
    };
    return DeviceAdapter;
}(adapter_1.Adapter));
exports.DeviceAdapter = DeviceAdapter;
//# sourceMappingURL=deviceAdapter.js.map