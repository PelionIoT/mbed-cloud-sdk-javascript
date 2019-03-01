export type TrustedCertificateServiceEnum = "lwm2m" | "bootstrap";
export type TrustedCertificateStatusEnum = "ACTIVE" | "INACTIVE";
/**
 *TrustedCertificateCreateRequest
 */
export interface TrustedCertificateCreateRequest {
    /**
     *certificate
     */
    readonly certificate?: string;

    /**
     *description
     */
    readonly description?: string;

    /**
     *enrollmentMode
     */
    readonly enrollmentMode?: boolean;

    /**
     *name
     */
    readonly name?: string;

    /**
     *service
     */
    readonly service?: TrustedCertificateServiceEnum;

    /**
     *status
     */
    readonly status?: TrustedCertificateStatusEnum;
}
/**
 *TrustedCertificateUpdateRequest
 */
export interface TrustedCertificateUpdateRequest {
    /**
     *certificate
     */
    readonly certificate?: string;

    /**
     *description
     */
    readonly description?: string;

    /**
     *enrollmentMode
     */
    readonly enrollmentMode?: boolean;

    /**
     *name
     */
    readonly name?: string;

    /**
     *service
     */
    readonly service?: TrustedCertificateServiceEnum;

    /**
     *status
     */
    readonly status?: TrustedCertificateStatusEnum;
}
