import { Entity } from "../../../common/entity";
/**
 *DeveloperCertificate
 */
export interface DeveloperCertificate extends Entity {
    /**
     *Account to which the developer certificate belongs.
     */
    readonly accountId?: string;
    /**
     *PEM-format X.509 developer certificate.
     */
    readonly certificate?: string;
    /**
     *Creation UTC time RFC3339.
     */
    readonly createdAt?: Date;
    /**
     *Description for the developer certificate.
     */
    description?: string;
    /**
     *PEM-format developer private key associated with the certificate.
     */
    readonly developerPrivateKey?: string;
    /**
     *Name of the developer certificate.
     */
    name: string;
    /**
     *Content of the `security.c` file flashed to the device to provide security credentials.
     */
    readonly securityFileContent?: string;
}
