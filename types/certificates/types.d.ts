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
    /**
     * Certificate type
     */
    type?: CertificateTypeEnum;
    /**
     * Status of the certificate
     */
    status?: CertificateStatusEnum;
}
/**
 * This object represents a certificate
 */
export interface CertificateObject extends AddDeveloperCertificateObject {
    /**
     * Certificate type
     */
    type: CertificateTypeEnum;
    /**
     * X509.v3 CA certificate in PEM or base64 encoded DER format
     */
    certificateData: string;
}
/**
 * This object represents a certificate
 */
export interface AddCertificateObject extends CertificateObject {
    /**
     * Base64 encoded signature of the account ID signed by the certificate to be uploaded. Signature must be hashed with SHA256
     */
    signature: string;
}
/**
 * This object represents a certificate
 */
export interface UpdateCertificateObject extends AddCertificateObject {
    /**
     * Certificate ID
     */
    id: string;
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
         * Expire filter in days
         */
        expires: ComparisonObject<number>;
        /**
         * Owner filter
         */
        ownerId: ComparisonObject<string>;
    };
}
