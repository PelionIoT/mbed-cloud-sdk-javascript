export type SubtenantTrustedCertificateService = "lwm2m" | "bootstrap";
export type SubtenantTrustedCertificateStatus = "ACTIVE" | "INACTIVE";
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
    readonly service?: SubtenantTrustedCertificateService;

    /**
     *status
     */
    readonly status?: SubtenantTrustedCertificateStatus;
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
    readonly service?: SubtenantTrustedCertificateService;

    /**
     *status
     */
    readonly status?: SubtenantTrustedCertificateStatus;
}
