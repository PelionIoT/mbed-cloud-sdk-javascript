import { Entity } from "../../../common/entity";
import { SubtenantTrustedCertificateService, SubtenantTrustedCertificateStatus } from "./types";
/**
 *SubtenantTrustedCertificate
 */
export interface SubtenantTrustedCertificate extends Entity {
    /**
     *The ID of the account.
     *@example 01619571e2e90242ac12000600000000
     */
    accountId: string;
    /**
     *X509.v3 trusted certificate in PEM format.
     *@example -----BEGIN CERTIFICATE----- ... -----END CERTIFICATE-----
     */
    certificate: string;
    /**
     *A SHA-256 fingerprint of the certificate.
     *@example a10fb2c8ba90e6de927bd0ae391dcc38f6115685de2d7024712af37ead0608f1
     */
    readonly certificateFingerprint?: string;
    /**
     *Creation UTC time RFC3339.
     *@example 2018-02-13T09:35:20Z
     */
    readonly createdAt?: Date;
    /**
     *Human readable description of this certificate.
     *@example Certificate created by me.
     */
    description?: string;
    /**
     *Device execution mode where 1 means a developer certificate.
     *@example 1
     */
    readonly deviceExecutionMode?: number;
    /**
     *If true, signature is not required. Default value false.
     */
    enrollmentMode?: boolean;
    /**
     *Whether or not this certificate is a developer certificate.
     *@example true
     */
    readonly isDeveloperCertificate?: boolean;
    /**
     *Issuer of the certificate.
     *@example CN=issuer
     */
    readonly issuer?: string;
    /**
     *Certificate name.
     *@example My certificate
     */
    name: string;
    /**
     *The ID of the owner.
     *@example 01619571dad80242ac12000600000000
     */
    readonly ownerId?: string;
    /**
     *Service name where the certificate is used.
     */
    service: SubtenantTrustedCertificateService;
    /**
     *Status of the certificate.
     *@example ACTIVE
     */
    status?: SubtenantTrustedCertificateStatus;
    /**
     *Subject of the certificate.
     *@example CN=subject
     */
    readonly subject?: string;
    /**
     *Last update UTC time RFC3339.
     *@example 2018-02-14T15:24:14Z
     */
    readonly updatedAt?: Date;
    /**
     *This read-only flag indicates whether the certificate is valid or not.
     *@example true
     */
    readonly valid?: boolean;
    /**
     *Expiration time in UTC formatted as RFC3339.
     *@example 2038-02-14T15:24:14Z
     */
    readonly validity?: Date;
}
