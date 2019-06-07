import { AccountRepository } from ".";
import { ApiKeyRepository } from ".";
import { CampaignDeviceMetadataRepository } from ".";
import { CampaignStatisticsRepository } from ".";
import { CampaignStatisticsEventsRepository } from ".";
import { CertificateEnrollmentRepository } from ".";
import { CertificateIssuerRepository } from ".";
import { CertificateIssuerConfigRepository } from ".";
import { DarkThemeColorRepository } from ".";
import { DarkThemeImageRepository } from ".";
import { DeveloperCertificateRepository } from ".";
import { DeviceRepository } from ".";
import { DeviceEnrollmentRepository } from ".";
import { DeviceEnrollmentBulkCreateRepository } from ".";
import { DeviceEnrollmentBulkDeleteRepository } from ".";
import { DeviceEnrollmentDenialRepository } from ".";
import { DeviceEventsRepository } from ".";
import { DeviceGroupRepository } from ".";
import { FirmwareImageRepository } from ".";
import { FirmwareManifestRepository } from ".";
import { LightThemeColorRepository } from ".";
import { LightThemeImageRepository } from ".";
import { PreSharedKeyRepository } from ".";
import { ServerCredentialsRepository } from ".";
import { SubtenantApiKeyRepository } from ".";
import { SubtenantDarkThemeColorRepository } from ".";
import { SubtenantDarkThemeImageRepository } from ".";
import { SubtenantLightThemeColorRepository } from ".";
import { SubtenantLightThemeImageRepository } from ".";
import { SubtenantTrustedCertificateRepository } from ".";
import { SubtenantUserRepository } from ".";
import { SubtenantUserInvitationRepository } from ".";
import { TrustedCertificateRepository } from ".";
import { UpdateCampaignRepository } from ".";
import { UserRepository } from ".";
import { UserInvitationRepository } from ".";
export class Factory {
    constructor(config) {
        this._config = config;
    }
    accountRepository() {
        return new AccountRepository(this._config);
    }
    apiKeyRepository() {
        return new ApiKeyRepository(this._config);
    }
    campaignDeviceMetadataRepository() {
        return new CampaignDeviceMetadataRepository(this._config);
    }
    campaignStatisticsRepository() {
        return new CampaignStatisticsRepository(this._config);
    }
    campaignStatisticsEventsRepository() {
        return new CampaignStatisticsEventsRepository(this._config);
    }
    certificateEnrollmentRepository() {
        return new CertificateEnrollmentRepository(this._config);
    }
    certificateIssuerRepository() {
        return new CertificateIssuerRepository(this._config);
    }
    certificateIssuerConfigRepository() {
        return new CertificateIssuerConfigRepository(this._config);
    }
    darkThemeColorRepository() {
        return new DarkThemeColorRepository(this._config);
    }
    darkThemeImageRepository() {
        return new DarkThemeImageRepository(this._config);
    }
    developerCertificateRepository() {
        return new DeveloperCertificateRepository(this._config);
    }
    deviceRepository() {
        return new DeviceRepository(this._config);
    }
    deviceEnrollmentRepository() {
        return new DeviceEnrollmentRepository(this._config);
    }
    deviceEnrollmentBulkCreateRepository() {
        return new DeviceEnrollmentBulkCreateRepository(this._config);
    }
    deviceEnrollmentBulkDeleteRepository() {
        return new DeviceEnrollmentBulkDeleteRepository(this._config);
    }
    deviceEnrollmentDenialRepository() {
        return new DeviceEnrollmentDenialRepository(this._config);
    }
    deviceEventsRepository() {
        return new DeviceEventsRepository(this._config);
    }
    deviceGroupRepository() {
        return new DeviceGroupRepository(this._config);
    }
    firmwareImageRepository() {
        return new FirmwareImageRepository(this._config);
    }
    firmwareManifestRepository() {
        return new FirmwareManifestRepository(this._config);
    }
    lightThemeColorRepository() {
        return new LightThemeColorRepository(this._config);
    }
    lightThemeImageRepository() {
        return new LightThemeImageRepository(this._config);
    }
    preSharedKeyRepository() {
        return new PreSharedKeyRepository(this._config);
    }
    serverCredentialsRepository() {
        return new ServerCredentialsRepository(this._config);
    }
    subtenantApiKeyRepository() {
        return new SubtenantApiKeyRepository(this._config);
    }
    subtenantDarkThemeColorRepository() {
        return new SubtenantDarkThemeColorRepository(this._config);
    }
    subtenantDarkThemeImageRepository() {
        return new SubtenantDarkThemeImageRepository(this._config);
    }
    subtenantLightThemeColorRepository() {
        return new SubtenantLightThemeColorRepository(this._config);
    }
    subtenantLightThemeImageRepository() {
        return new SubtenantLightThemeImageRepository(this._config);
    }
    subtenantTrustedCertificateRepository() {
        return new SubtenantTrustedCertificateRepository(this._config);
    }
    subtenantUserRepository() {
        return new SubtenantUserRepository(this._config);
    }
    subtenantUserInvitationRepository() {
        return new SubtenantUserInvitationRepository(this._config);
    }
    trustedCertificateRepository() {
        return new TrustedCertificateRepository(this._config);
    }
    updateCampaignRepository() {
        return new UpdateCampaignRepository(this._config);
    }
    userRepository() {
        return new UserRepository(this._config);
    }
    userInvitationRepository() {
        return new UserInvitationRepository(this._config);
    }
}
//# sourceMappingURL=factory.js.map