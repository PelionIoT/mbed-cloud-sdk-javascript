export type SubtenantTrustedCertificateServiceEnum = "lwm2m" | "bootstrap";
export type SubtenantTrustedCertificateStatusEnum = "ACTIVE" | "INACTIVE";
/**
 *SubtenantTrustedCertificateCreateRequest
 */
export interface SubtenantTrustedCertificateCreateRequest {
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
    readonly service?: SubtenantTrustedCertificateServiceEnum;

    /**
     *status
     */
    readonly status?: SubtenantTrustedCertificateStatusEnum;
}
/**
 *SubtenantTrustedCertificateUpdateRequest
 */
export interface SubtenantTrustedCertificateUpdateRequest {
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
    readonly service?: SubtenantTrustedCertificateServiceEnum;

    /**
     *status
     */
    readonly status?: SubtenantTrustedCertificateStatusEnum;
}
