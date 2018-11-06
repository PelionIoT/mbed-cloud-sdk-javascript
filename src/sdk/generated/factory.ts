import { Config } from "../client/config";
import { Account } from "./index";
import { ApiKey } from "./index";
import { CertificateEnrollment } from "./index";
import { CertificateIssuer } from "./index";
import { CertificateIssuerConfig } from "./index";
import { DeveloperCertificate } from "./index";
import { Device } from "./index";
import { DeviceEnrollment } from "./index";
import { DeviceEnrollmentBulkCreate } from "./index";
import { DeviceEnrollmentBulkDelete } from "./index";
import { DeviceEvents } from "./index";
import { ServerCredentials } from "./index";
import { TrustedCertificate } from "./index";
import { User } from "./index";
import { UserInvitation } from "./index";
export class Factory {
    private readonly _config: Config;
    constructor(config: Config) {
        this._config = config;
    }
    public Account(): Account {
        return new Account(this._config);
    }
    public ApiKey(): ApiKey {
        return new ApiKey(this._config);
    }
    public CertificateEnrollment(): CertificateEnrollment {
        return new CertificateEnrollment(this._config);
    }
    public CertificateIssuer(): CertificateIssuer {
        return new CertificateIssuer(this._config);
    }
    public CertificateIssuerConfig(): CertificateIssuerConfig {
        return new CertificateIssuerConfig(this._config);
    }
    public DeveloperCertificate(): DeveloperCertificate {
        return new DeveloperCertificate(this._config);
    }
    public Device(): Device {
        return new Device(this._config);
    }
    public DeviceEnrollment(): DeviceEnrollment {
        return new DeviceEnrollment(this._config);
    }
    public DeviceEnrollmentBulkCreate(): DeviceEnrollmentBulkCreate {
        return new DeviceEnrollmentBulkCreate(this._config);
    }
    public DeviceEnrollmentBulkDelete(): DeviceEnrollmentBulkDelete {
        return new DeviceEnrollmentBulkDelete(this._config);
    }
    public DeviceEvents(): DeviceEvents {
        return new DeviceEvents(this._config);
    }
    public ServerCredentials(): ServerCredentials {
        return new ServerCredentials(this._config);
    }
    public TrustedCertificate(): TrustedCertificate {
        return new TrustedCertificate(this._config);
    }
    public User(): User {
        return new User(this._config);
    }
    public UserInvitation(): UserInvitation {
        return new UserInvitation(this._config);
    }
}
