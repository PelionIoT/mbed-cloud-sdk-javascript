import { ListOptions, ComparisonObject } from "../common/interfaces";
export declare type CertificateTypeEnum = "developer" | "lwm2m" | "bootstrap";
export declare type CertificateStatusEnum = "ACTIVE" | "INACTIVE";
/**
 * This object represents a developer certificate
 */
export interface AddDeveloperCertificateObject {
    /**
     * Certificate name
     */
    name: string;
    /**
     * Certificate description
     */
    description?: string;
}
/**
 * This object represents a certificate
 */
export interface AddCertificateObject extends AddDeveloperCertificateObject {
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
    /**
     * Status of the certificate
     */
    status?: CertificateStatusEnum;
    /**
     * If true, signature parameter is not required. Default value is false.
     */
    enrollmentMode?: boolean;
}
/**
 * This object represents a certificate
 */
export interface UpdateCertificateObject {
    /**
     * Certificate ID
     */
    id: string;
    /**
     * Certificate name
     */
    name?: string;
    /**
     * Certificate description
     */
    description?: string;
    /**
     * Certificate type
     */
    type?: CertificateTypeEnum;
    /**
     * X509.v3 CA certificate in PEM or base64 encoded DER format
     */
    certificateData?: string;
    /**
     * Base64 encoded signature of the account ID signed by the certificate to be uploaded. Signature must be hashed with SHA256
     */
    signature?: string;
    /**
     * Status of the certificate
     */
    status?: CertificateStatusEnum;
    /**
     * If true, signature parameter is not required. Default value is false.
     */
    enrollmentMode?: boolean;
}
/**
 * Options to use when listing certificates
 */
export interface CertificateListOptions extends ListOptions {
    /**
     * The certificate filter
     *
     * Constructed like so:
     *  ```JavaScript
     *  filter: {
     *    type: { $eq: "developer" }
     *  }
     *  ```
     */
    filter?: {
        /**
         * Certificate type filter
         */
        type: ComparisonObject<CertificateTypeEnum>;
        /**
         * Certificate type not equals filter
         */
        typeNeq: ComparisonObject<CertificateTypeEnum>;
        /**
         * Expire filter in days
         */
        expires: ComparisonObject<number>;
        /**
         * Owner filter
         */
        ownerId: ComparisonObject<string>;
        /**
         * Name filter
         */
        name: ComparisonObject<string>;
        /**
         * Enrollment mode filter
         */
        enrollmentMode: ComparisonObject<boolean>;
        /**
         * Issuer filter
         */
        issuer: ComparisonObject<string>;
        /**
         * Subject filter
         */
        subject: ComparisonObject<string>;
    };
}
