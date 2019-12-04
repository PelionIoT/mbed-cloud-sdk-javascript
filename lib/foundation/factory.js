"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var _2 = require(".");
var _3 = require(".");
var _4 = require(".");
var _5 = require(".");
var _6 = require(".");
var _7 = require(".");
var _8 = require(".");
var _9 = require(".");
var _10 = require(".");
var _11 = require(".");
var _12 = require(".");
var _13 = require(".");
var _14 = require(".");
var _15 = require(".");
var _16 = require(".");
var _17 = require(".");
var _18 = require(".");
var _19 = require(".");
var _20 = require(".");
var _21 = require(".");
var _22 = require(".");
var _23 = require(".");
var _24 = require(".");
var _25 = require(".");
var _26 = require(".");
var _27 = require(".");
var _28 = require(".");
var _29 = require(".");
var _30 = require(".");
var _31 = require(".");
var _32 = require(".");
var _33 = require(".");
var _34 = require(".");
var _35 = require(".");
var _36 = require(".");
var _37 = require(".");
var _38 = require(".");
var _39 = require(".");
var _40 = require(".");
var Factory = /** @class */ (function () {
    function Factory(config) {
        this._config = config;
    }
    Factory.prototype.accountRepository = function () {
        return new _21.AccountRepository(this._config);
    };
    Factory.prototype.apiKeyRepository = function () {
        return new _3.ApiKeyRepository(this._config);
    };
    Factory.prototype.campaignDeviceMetadataRepository = function () {
        return new _4.CampaignDeviceMetadataRepository(this._config);
    };
    Factory.prototype.campaignStatisticsRepository = function () {
        return new _5.CampaignStatisticsRepository(this._config);
    };
    Factory.prototype.campaignStatisticsEventsRepository = function () {
        return new _6.CampaignStatisticsEventsRepository(this._config);
    };
    Factory.prototype.certificateEnrollmentRepository = function () {
        return new _7.CertificateEnrollmentRepository(this._config);
    };
    Factory.prototype.certificateIssuerRepository = function () {
        return new _8.CertificateIssuerRepository(this._config);
    };
    Factory.prototype.certificateIssuerConfigRepository = function () {
        return new _9.CertificateIssuerConfigRepository(this._config);
    };
    Factory.prototype.darkThemeColorRepository = function () {
        return new _10.DarkThemeColorRepository(this._config);
    };
    Factory.prototype.darkThemeImageRepository = function () {
        return new _11.DarkThemeImageRepository(this._config);
    };
    Factory.prototype.developerCertificateRepository = function () {
        return new _12.DeveloperCertificateRepository(this._config);
    };
    Factory.prototype.deviceRepository = function () {
        return new _13.DeviceRepository(this._config);
    };
    Factory.prototype.deviceEnrollmentRepository = function () {
        return new _14.DeviceEnrollmentRepository(this._config);
    };
    Factory.prototype.deviceEnrollmentBulkCreateRepository = function () {
        return new _15.DeviceEnrollmentBulkCreateRepository(this._config);
    };
    Factory.prototype.deviceEnrollmentBulkDeleteRepository = function () {
        return new _16.DeviceEnrollmentBulkDeleteRepository(this._config);
    };
    Factory.prototype.deviceEnrollmentDenialRepository = function () {
        return new _17.DeviceEnrollmentDenialRepository(this._config);
    };
    Factory.prototype.deviceEventsRepository = function () {
        return new _18.DeviceEventsRepository(this._config);
    };
    Factory.prototype.deviceGroupRepository = function () {
        return new _19.DeviceGroupRepository(this._config);
    };
    Factory.prototype.firmwareImageRepository = function () {
        return new _20.FirmwareImageRepository(this._config);
    };
    Factory.prototype.firmwareManifestRepository = function () {
        return new _1.FirmwareManifestRepository(this._config);
    };
    Factory.prototype.identityProviderRepository = function () {
        return new _22.IdentityProviderRepository(this._config);
    };
    Factory.prototype.lightThemeColorRepository = function () {
        return new _23.LightThemeColorRepository(this._config);
    };
    Factory.prototype.lightThemeImageRepository = function () {
        return new _24.LightThemeImageRepository(this._config);
    };
    Factory.prototype.policyGroupRepository = function () {
        return new _25.PolicyGroupRepository(this._config);
    };
    Factory.prototype.preSharedKeyRepository = function () {
        return new _26.PreSharedKeyRepository(this._config);
    };
    Factory.prototype.serverCredentialsRepository = function () {
        return new _27.ServerCredentialsRepository(this._config);
    };
    Factory.prototype.subtenantApiKeyRepository = function () {
        return new _28.SubtenantApiKeyRepository(this._config);
    };
    Factory.prototype.subtenantDarkThemeColorRepository = function () {
        return new _29.SubtenantDarkThemeColorRepository(this._config);
    };
    Factory.prototype.subtenantDarkThemeImageRepository = function () {
        return new _30.SubtenantDarkThemeImageRepository(this._config);
    };
    Factory.prototype.subtenantIdentityProviderRepository = function () {
        return new _31.SubtenantIdentityProviderRepository(this._config);
    };
    Factory.prototype.subtenantLightThemeColorRepository = function () {
        return new _32.SubtenantLightThemeColorRepository(this._config);
    };
    Factory.prototype.subtenantLightThemeImageRepository = function () {
        return new _33.SubtenantLightThemeImageRepository(this._config);
    };
    Factory.prototype.subtenantPolicyGroupRepository = function () {
        return new _34.SubtenantPolicyGroupRepository(this._config);
    };
    Factory.prototype.subtenantTrustedCertificateRepository = function () {
        return new _35.SubtenantTrustedCertificateRepository(this._config);
    };
    Factory.prototype.subtenantUserRepository = function () {
        return new _36.SubtenantUserRepository(this._config);
    };
    Factory.prototype.subtenantUserInvitationRepository = function () {
        return new _37.SubtenantUserInvitationRepository(this._config);
    };
    Factory.prototype.trustedCertificateRepository = function () {
        return new _38.TrustedCertificateRepository(this._config);
    };
    Factory.prototype.updateCampaignRepository = function () {
        return new _39.UpdateCampaignRepository(this._config);
    };
    Factory.prototype.userRepository = function () {
        return new _40.UserRepository(this._config);
    };
    Factory.prototype.userInvitationRepository = function () {
        return new _2.UserInvitationRepository(this._config);
    };
    return Factory;
}());
exports.Factory = Factory;
//# sourceMappingURL=factory.js.map