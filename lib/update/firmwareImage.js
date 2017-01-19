"use strict";
/*
 * Firmware Image
 */
var FirmwareImage = (function () {
    function FirmwareImage(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }
    FirmwareImage.map = function (from) {
        var type = {
            createdAt: from.created_at,
            datafile: from.datafile,
            datafileChecksum: from.datafile_checksum,
            description: from.description,
            id: from.id,
            name: from.name,
            updatedAt: from.updated_at
        };
        return new FirmwareImage(type);
    };
    return FirmwareImage;
}());
exports.FirmwareImage = FirmwareImage;
