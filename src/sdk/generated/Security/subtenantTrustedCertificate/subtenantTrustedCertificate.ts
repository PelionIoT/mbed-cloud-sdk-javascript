import { EntityBase } from "../../../common/entityBase";
import * as privateFunctions from "../../../common/privateFunctions";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";
import { DeveloperCertificate } from "../../index";
import { SubtenantTrustedCertificateServiceEnum } from "../../enums";
import { SubtenantTrustedCertificateStatusEnum } from "../../enums";

/**
 * SubtenantTrustedCertificate
 */
export class SubtenantTrustedCertificate extends EntityBase {
    /**
     * The UUID of the account.
     */
    public accountId?: string;

    /**
     * X509.v3 trusted certificate in PEM format.
     */
    public certificate?: string;

    /**
     * Creation UTC time RFC3339.
     */
    public createdAt?: Date;

    /**
     * Human readable description of this certificate.
     */
    public description?: string;

    /**
     * Device execution mode where 1 means a developer certificate.
     */
    public deviceExecutionMode?: number;

    /**
     * If true, signature is not required. Default value false.
     */
    public enrollmentMode?: boolean;

    /**
     * Whether or not this certificate is a developer certificate.
     */
    get isDeveloperCertificate(): boolean {
        return privateFunctions.isDeveloperCertificateGetter(this);
    }
    set isDeveloperCertificate(value: boolean) {
        privateFunctions.isDeveloperCertificateSetter(this, value);
    }

    /**
     * Issuer of the certificate.
     */
    public issuer?: string;

    /**
     * Certificate name.
     */
    public name?: string;

    /**
     * The UUID of the owner.
     */
    public ownerId?: string;

    /**
     * Private key of the certificate in PEM or base64 encoded DER format.
     */
    public privateKey?: string;

    /**
     * Service name where the certificate is to be used.
     */
    public service?: SubtenantTrustedCertificateServiceEnum;

    /**
     * Status of the certificate.
     */
    public status?: SubtenantTrustedCertificateStatusEnum;

    /**
     * Subject of the certificate.
     */
    public subject?: string;

    /**
     * Last update UTC time RFC3339.
     */
    public updatedAt?: Date;

    /**
     * Expiration time in UTC formatted as RFC3339.
     */
    public validity?: Date;

    constructor(config?: Config) {
        super(config);
    }

    /**
     * creates a SubtenantTrustedCertificate.
     * @returns Promise containing SubtenantTrustedCertificate.
     */
    public create(accountID: string): Promise<SubtenantTrustedCertificate> {
        const body = {
            certificate: this.certificate,
            description: this.description,
            enrollment_mode: this.enrollmentMode,
            name: this.name,
            service: this.service,
            status: this.status,
        };
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<SubtenantTrustedCertificate>(
                    {
                        url: "/v3/accounts/{accountID}/trusted-certificates",
                        method: "POST",
                        pathParams: {
                            accountID: accountID,
                        },
                        body: body,
                    },
                    this,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * deletes a SubtenantTrustedCertificate.
     * @returns Promise containing SubtenantTrustedCertificate.
     */
    public delete(accountID: string): Promise<SubtenantTrustedCertificate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<SubtenantTrustedCertificate>(
                    {
                        url: "/v3/accounts/{accountID}/trusted-certificates/{cert-id}",
                        method: "DELETE",
                        pathParams: {
                            "accountID": accountID,
                            "cert-id": this.id,
                        },
                    },
                    this,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * developerCertificateInfos a DeveloperCertificate.
     * @returns Promise containing DeveloperCertificate.
     */
    public developerCertificateInfo(): Promise<DeveloperCertificate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<DeveloperCertificate>(
                    {
                        url: "/v3/developer-certificates/{developerCertificateId}",
                        method: "GET",
                        pathParams: {
                            developerCertificateId: this.id,
                        },
                    },
                    DeveloperCertificate,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * gets a SubtenantTrustedCertificate.
     * @returns Promise containing SubtenantTrustedCertificate.
     */
    public get(accountID: string): Promise<SubtenantTrustedCertificate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<SubtenantTrustedCertificate>(
                    {
                        url: "/v3/accounts/{accountID}/trusted-certificates/{cert-id}",
                        method: "GET",
                        pathParams: {
                            "accountID": accountID,
                            "cert-id": this.id,
                        },
                    },
                    this,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * updates a SubtenantTrustedCertificate.
     * @returns Promise containing SubtenantTrustedCertificate.
     */
    public update(accountID: string): Promise<SubtenantTrustedCertificate> {
        const body = {
            certificate: this.certificate,
            description: this.description,
            enrollment_mode: this.enrollmentMode,
            name: this.name,
            service: this.service,
            status: this.status,
        };
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<SubtenantTrustedCertificate>(
                    {
                        url: "/v3/accounts/{accountID}/trusted-certificates/{cert-id}",
                        method: "PUT",
                        pathParams: {
                            "accountID": accountID,
                            "cert-id": this.id,
                        },
                        body: body,
                    },
                    this,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }
}
