import { CallbackFn } from "../../common/interfaces";
import { AddDeveloperCertificateObject, CertificateTypeEnum, CertificateStatusEnum } from "../types";
import { CertificatesApi } from "../certificatesApi";
/**
 * Certificate
 */
export declare class Certificate {
    private _api?;
    /**
     * Entity ID.
     */
    readonly id: string;
    /**
     * Certificate type
     */
    type: CertificateTypeEnum;
    /**
     * Status of the certificate
     */
    status?: CertificateStatusEnum;
    /**
     * X509.v3 CA certificate in PEM or base64 encoded DER format
     */
    certificateData: string;
    /**
     * If true, signature parameter is not required. Default value is false.
     */
    enrollmentMode?: boolean;
    /**
     * The UUID of the account.
     */
    readonly accountId: string;
    /**
     * Subject of the certificate.
     */
    readonly subject: string;
    /**
     * Expiration Date.
     */
    readonly validity: Date;
    /**
     * Issuer of the certificate.
     */
    readonly issuer: string;
    /**
     * The timestamp when this certfcate was created.
     */
    readonly createdAt?: Date;
    /**
     * The UUID of the certificate owner (user or ApiKey).
     */
    readonly ownerId?: string;
    /**
     * Bootstrap server URI to which the client needs to connect to.
     */
    readonly serverUri?: string;
    /**
     * PEM format X.509 server certificate that will be used to validate the server certificate and will be received during the TLS/DTLS handshake.
     */
    readonly serverCertificate?: string;
    /**
     * Content of the security.c file that will be flashed into the device to provide the security credentials.
     */
    readonly headerFile?: string;
    /**
     * PEM format X.509 developer certificate.
     */
    readonly developerCertificate?: string;
    /**
     * PEM format developer private key associated to the certificate.
     */
    readonly developerPrivateKey?: string;
    constructor(init: Partial<Certificate>, _api?: CertificatesApi);
    /**
     * Updates the certificate
     * @param signature Base64 encoded signature of the account ID signed by the certificate to be uploaded. Signature must be hashed with SHA256
     * @returns Promise containing certificate
     */
    update(signature: string): Promise<Certificate>;
    /**
     * Updates the certificate
     * @param signature Base64 encoded signature of the account ID signed by the certificate to be uploaded. Signature must be hashed with SHA256
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    update(signature: string, callback: CallbackFn<Certificate>): void;
    /**
     * Delete the certificate
     * @returns Promise containing any error
     */
    delete(): Promise<void>;
    /**
     * Delete the certificate
     * @param callback A function that is passed any error
     */
    delete(callback?: CallbackFn<void>): void;
}
export interface Certificate extends AddDeveloperCertificateObject {
}
