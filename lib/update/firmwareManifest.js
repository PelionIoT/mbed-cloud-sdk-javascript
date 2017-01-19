"use strict";
/*
 * Firmware Manifest
 */
var FirmwareManifest = (function () {
    function FirmwareManifest(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }
    FirmwareManifest.map = function (from) {
        var type = {
            createdAt: from.created_at,
            description: from.description,
            deviceClass: from.device_class,
            id: from.id,
            manifestContents: from.manifest_contents,
            name: from.name,
            timestamp: from.timestamp,
            updatedAt: from.updated_at
        };
        return new FirmwareManifest(type);
    };
    return FirmwareManifest;
}());
exports.FirmwareManifest = FirmwareManifest;
