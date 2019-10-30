export declare type SubtenantTrustedCertificateService = "lwm2m" | "bootstrap";
export declare type SubtenantTrustedCertificateStatus = "ACTIVE" | "INACTIVE";
/**
 *SubtenantTrustedCertificateCreateRequest
 */
export interface SubtenantTrustedCertificateCreateRequest {
    /**
     *X509.v3 trusted certificate in PEM format.
     *@example -----BEGIN CERTIFICATE----- ... -----END CERTIFICATE-----
     */
    readonly certificate?: string;
    /**
     *Human readable description of this certificate.
     *@example Certificate created by me.
     */
    readonly description?: string;
    /**
     *If true, signature is not required. Default value false.
     */
    readonly enrollmentMode?: boolean;
    /**
     *Certificate name.
     *@example My certificate
     */
    readonly name?: string;
    /**
     *Service name where the certificate is used.
     */
    readonly service?: SubtenantTrustedCertificateService;
    /**
     *Status of the certificate.
     *@example ACTIVE
     */
    readonly status?: SubtenantTrustedCertificateStatus;
}
/**
 *SubtenantTrustedCertificateUpdateRequest
 */
export interface SubtenantTrustedCertificateUpdateRequest {
    /**
     *X509.v3 trusted certificate in PEM format.
     *@example -----BEGIN CERTIFICATE----- ... -----END CERTIFICATE-----
     */
    readonly certificate?: string;
    /**
     *Human readable description of this certificate.
     *@example Certificate created by me.
     */
    readonly description?: string;
    /**
     *If true, signature is not required. Default value false.
     */
    readonly enrollmentMode?: boolean;
    /**
     *Certificate name.
     *@example My certificate
     */
    readonly name?: string;
    /**
     *Service name where the certificate is used.
     */
    readonly service?: SubtenantTrustedCertificateService;
    /**
     *Status of the certificate.
     *@example ACTIVE
     */
    readonly status?: SubtenantTrustedCertificateStatus;
}
