import { Config } from "../client/config";
import { ApiKey } from "./index";
import { CertificateEnrollment } from "./index";
import { CertificateIssuer } from "./index";
import { CertificateIssuerConfig } from "./index";
import { DeveloperCertificate } from "./index";
import { EnrollmentBulkCreateTask } from "./index";
import { EnrollmentBulkDeleteTask } from "./index";
import { EnrollmentClaim } from "./index";
import { MyAccount } from "./index";
import { MyApiKey } from "./index";
import { PolicyGroup } from "./index";
import { ServerCredentials } from "./index";
import { SubtenantAccount } from "./index";
import { TrustedCertificate } from "./index";
import { User } from "./index";
export class Factory {
    private readonly _config: Config;
    constructor(config: Config) {
        this._config = config;
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
    public EnrollmentBulkCreateTask(): EnrollmentBulkCreateTask {
        return new EnrollmentBulkCreateTask(this._config);
    }
    public EnrollmentBulkDeleteTask(): EnrollmentBulkDeleteTask {
        return new EnrollmentBulkDeleteTask(this._config);
    }
    public EnrollmentClaim(): EnrollmentClaim {
        return new EnrollmentClaim(this._config);
    }
    public MyAccount(): MyAccount {
        return new MyAccount(this._config);
    }
    public MyApiKey(): MyApiKey {
        return new MyApiKey(this._config);
    }
    public PolicyGroup(): PolicyGroup {
        return new PolicyGroup(this._config);
    }
    public ServerCredentials(): ServerCredentials {
        return new ServerCredentials(this._config);
    }
    public SubtenantAccount(): SubtenantAccount {
        return new SubtenantAccount(this._config);
    }
    public TrustedCertificate(): TrustedCertificate {
        return new TrustedCertificate(this._config);
    }
    public User(): User {
        return new User(this._config);
    }
}
