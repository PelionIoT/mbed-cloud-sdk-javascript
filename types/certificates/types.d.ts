export declare type CertificateTypeEnum = "developer" | "lwm2m" | "bootstrap" | "provisioning";
/**
 * This object represents an CA Certificate in responses.
 */
export interface CertificateType {
    /**
     * The UUID of the account.
     */
    accountId: string;
    /**
     * Certificate type
     */
    type: CertificateTypeEnum;
    /**
     * Human readable description of this certificate.
     */
    description?: string;
    /**
     * Creation UTC time RFC3339.
     */
    createdAt?: string;
    /**
     * Subject of the certificate.
     */
    subject: string;
    /**
     * Expiration time in UTC formatted as RFC3339.
     */
    validity: string;
    /**
     * Issuer of the certificate.
     */
    issuer: string;
    /**
     * X509.v3 CA certificate in PEM or base64 encoded DER format.
     */
    data: string;
    /**
     * Entity ID.
     */
    id: string;
    /**
     * Certificate name.
     */
    name: string;
    /**
     * Bootstrap server URI to which the client needs to connect to.
     */
    serverUri?: string;
    /**
     * PEM format X.509 server certificate that will be used to validate the server certificate that will be received during the TLS/DTLS handshake.
     */
    serverCertificate?: string;
    /**
     * Content of the security.c file that will be flashed into the device to provide the security credentials
     */
    headerFile?: string;
    /**
     * PEM format X.509 developer certificate.
     */
    developerCertificate?: string;
    /**
     * PEM format developer private key associated to the certificate.
     */
    developerPrivateKey?: string;
}
export interface DeveloperCertificateRequest {
    /**
     * Certificate name
     */
    name: string;
    /**
     * Certificate description
     */
    description: string;
}
export interface CertificateRequest extends DeveloperCertificateRequest {
    /**
     * Certificate type
     */
    type: CertificateTypeEnum;
    /**
     * X509.v3 CA certificate in PEM or base64 encoded DER format
     */
    certificateData: string;
    /**
     * Base64 encoded signature of the account ID signed by the certificate to be uploaded. Signature must be hashed with SHA256
     */
    signature: string;
}
