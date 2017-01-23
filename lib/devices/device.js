"use strict";
/**
 * Device
 */
var Device = (function () {
    function Device(options, _api) {
        this._api = _api;
        for (var key in options) {
            this[key] = options[key];
        }
    }
    Device.map = function (from, api) {
        var type = {
            accountId: from.account_id,
            autoUpdate: from.auto_update,
            bootstrappedTimestamp: from.bootstrapped_timestamp,
            createdAt: from.created_at,
            customAttributes: from.custom_attributes,
            deployedState: from.deployed_state,
            deployment: from.deployment,
            description: from.description,
            deviceClass: from.device_class,
            id: from.id,
            manifest: from.manifest,
            mechanism: from.mechanism,
            mechanismUrl: from.mechanism_url,
            name: from.name,
            provisionKey: from.provision_key,
            serialNumber: from.serial_number,
            state: from.state,
            trustClass: from.trust_class,
            trustLevel: from.trust_level,
            updatedAt: from.updated_at,
            vendorId: from.vendor_id
        };
        return new Device(type, api);
    };
    Device.prototype.getDetails = function (callback) {
        return this._api.getDevice({
            id: this.id
        }, callback);
    };
    Device.prototype.listResources = function (callback) {
        return this._api.listDeviceResources({
            id: this.id
        }, callback);
    };
    Device.prototype.deleteResource = function (options, callback) {
        var path = options.path, noResponse = options.noResponse;
        return this._api.deleteDeviceResource({
            id: this.id,
            path: path,
            noResponse: noResponse
        }, callback);
    };
    Device.prototype.listSubscriptions = function (callback) {
        return this._api.listDeviceSubscriptions({
            id: this.id
        }, callback);
    };
    Device.prototype.deleteSubscriptions = function (callback) {
        return this._api.deleteDeviceSubscriptions({
            id: this.id
        }, callback);
    };
    return Device;
}());
exports.Device = Device;
