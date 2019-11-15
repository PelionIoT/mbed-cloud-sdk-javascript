import { FirmwareManifestRepository } from ".";
import { UserInvitationRepository } from ".";
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
import { AccountRepository } from ".";
import { IdentityProviderRepository } from ".";
import { LightThemeColorRepository } from ".";
import { LightThemeImageRepository } from ".";
import { PolicyGroupRepository } from ".";
import { PreSharedKeyRepository } from ".";
import { ServerCredentialsRepository } from ".";
import { SubtenantApiKeyRepository } from ".";
import { SubtenantDarkThemeColorRepository } from ".";
import { SubtenantDarkThemeImageRepository } from ".";
import { SubtenantIdentityProviderRepository } from ".";
import { SubtenantLightThemeColorRepository } from ".";
import { SubtenantLightThemeImageRepository } from ".";
import { SubtenantPolicyGroupRepository } from ".";
import { SubtenantTrustedCertificateRepository } from ".";
import { SubtenantUserRepository } from ".";
import { SubtenantUserInvitationRepository } from ".";
import { TrustedCertificateRepository } from ".";
import { UpdateCampaignRepository } from ".";
import { UserRepository } from ".";
import { Config } from "../common/config";

export class Factory {
    private readonly _config: Config;
    constructor(config: Config) {
        this._config = config;
    }
    public accountRepository(): AccountRepository {
        return new AccountRepository(this._config);
    }
    public apiKeyRepository(): ApiKeyRepository {
        return new ApiKeyRepository(this._config);
    }
    public campaignDeviceMetadataRepository(): CampaignDeviceMetadataRepository {
        return new CampaignDeviceMetadataRepository(this._config);
    }
    public campaignStatisticsRepository(): CampaignStatisticsRepository {
        return new CampaignStatisticsRepository(this._config);
    }
    public campaignStatisticsEventsRepository(): CampaignStatisticsEventsRepository {
        return new CampaignStatisticsEventsRepository(this._config);
    }
    public certificateEnrollmentRepository(): CertificateEnrollmentRepository {
        return new CertificateEnrollmentRepository(this._config);
    }
    public certificateIssuerRepository(): CertificateIssuerRepository {
        return new CertificateIssuerRepository(this._config);
    }
    public certificateIssuerConfigRepository(): CertificateIssuerConfigRepository {
        return new CertificateIssuerConfigRepository(this._config);
    }
    public darkThemeColorRepository(): DarkThemeColorRepository {
        return new DarkThemeColorRepository(this._config);
    }
    public darkThemeImageRepository(): DarkThemeImageRepository {
        return new DarkThemeImageRepository(this._config);
    }
    public developerCertificateRepository(): DeveloperCertificateRepository {
        return new DeveloperCertificateRepository(this._config);
    }
    public deviceRepository(): DeviceRepository {
        return new DeviceRepository(this._config);
    }
    public deviceEnrollmentRepository(): DeviceEnrollmentRepository {
        return new DeviceEnrollmentRepository(this._config);
    }
    public deviceEnrollmentBulkCreateRepository(): DeviceEnrollmentBulkCreateRepository {
        return new DeviceEnrollmentBulkCreateRepository(this._config);
    }
    public deviceEnrollmentBulkDeleteRepository(): DeviceEnrollmentBulkDeleteRepository {
        return new DeviceEnrollmentBulkDeleteRepository(this._config);
    }
    public deviceEnrollmentDenialRepository(): DeviceEnrollmentDenialRepository {
        return new DeviceEnrollmentDenialRepository(this._config);
    }
    public deviceEventsRepository(): DeviceEventsRepository {
        return new DeviceEventsRepository(this._config);
    }
    public deviceGroupRepository(): DeviceGroupRepository {
        return new DeviceGroupRepository(this._config);
    }
    public firmwareImageRepository(): FirmwareImageRepository {
        return new FirmwareImageRepository(this._config);
    }
    public firmwareManifestRepository(): FirmwareManifestRepository {
        return new FirmwareManifestRepository(this._config);
    }
    public identityProviderRepository(): IdentityProviderRepository {
        return new IdentityProviderRepository(this._config);
    }
    public lightThemeColorRepository(): LightThemeColorRepository {
        return new LightThemeColorRepository(this._config);
    }
    public lightThemeImageRepository(): LightThemeImageRepository {
        return new LightThemeImageRepository(this._config);
    }
    public policyGroupRepository(): PolicyGroupRepository {
        return new PolicyGroupRepository(this._config);
    }
    public preSharedKeyRepository(): PreSharedKeyRepository {
        return new PreSharedKeyRepository(this._config);
    }
    public serverCredentialsRepository(): ServerCredentialsRepository {
        return new ServerCredentialsRepository(this._config);
    }
    public subtenantApiKeyRepository(): SubtenantApiKeyRepository {
        return new SubtenantApiKeyRepository(this._config);
    }
    public subtenantDarkThemeColorRepository(): SubtenantDarkThemeColorRepository {
        return new SubtenantDarkThemeColorRepository(this._config);
    }
    public subtenantDarkThemeImageRepository(): SubtenantDarkThemeImageRepository {
        return new SubtenantDarkThemeImageRepository(this._config);
    }
    public subtenantIdentityProviderRepository(): SubtenantIdentityProviderRepository {
        return new SubtenantIdentityProviderRepository(this._config);
    }
    public subtenantLightThemeColorRepository(): SubtenantLightThemeColorRepository {
        return new SubtenantLightThemeColorRepository(this._config);
    }
    public subtenantLightThemeImageRepository(): SubtenantLightThemeImageRepository {
        return new SubtenantLightThemeImageRepository(this._config);
    }
    public subtenantPolicyGroupRepository(): SubtenantPolicyGroupRepository {
        return new SubtenantPolicyGroupRepository(this._config);
    }
    public subtenantTrustedCertificateRepository(): SubtenantTrustedCertificateRepository {
        return new SubtenantTrustedCertificateRepository(this._config);
    }
    public subtenantUserRepository(): SubtenantUserRepository {
        return new SubtenantUserRepository(this._config);
    }
    public subtenantUserInvitationRepository(): SubtenantUserInvitationRepository {
        return new SubtenantUserInvitationRepository(this._config);
    }
    public trustedCertificateRepository(): TrustedCertificateRepository {
        return new TrustedCertificateRepository(this._config);
    }
    public updateCampaignRepository(): UpdateCampaignRepository {
        return new UpdateCampaignRepository(this._config);
    }
    public userRepository(): UserRepository {
        return new UserRepository(this._config);
    }
    public userInvitationRepository(): UserInvitationRepository {
        return new UserInvitationRepository(this._config);
    }
}
