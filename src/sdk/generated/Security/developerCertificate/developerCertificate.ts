import { EntityBase } from "../../../common/entityBase";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";
import { TrustedCertificate } from "../../index";

/**
 * DeveloperCertificate
 */
export class DeveloperCertificate extends EntityBase {
    public readonly _renames: { [key: string]: string } = {
        developer_certificate: "certificate",
        developer_private_key: "privateKey",
    };

    /**
     * account to which the developer certificate belongs
     */
    public accountId?: string;

    /**
     * PEM format X.509 developer certificate.
     */
    public certificate?: string;

    /**
     * Creation UTC time RFC3339.
     */
    public createdAt?: Date;

    /**
     * Description for the developer certificate.
     */
    public description?: string;

    /**
     * Name of the developer certificate.
     */
    public name?: string;

    /**
     * Content of the security.c file that will be flashed into the device to provide the security credentials
     */
    public securityFileContent?: string;

    constructor(config?: Config) {
        super(config);
    }

    /**
     * creates a DeveloperCertificate.
     * @returns Promise containing DeveloperCertificate.
     */
    public create(): Promise<DeveloperCertificate> {
        const body = {
            description: this.description,
            name: this.name,
        };
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<DeveloperCertificate>(
                    {
                        url: "/v3/developer-certificates",
                        method: "POST",
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
     * deletes a DeveloperCertificate.
     * @returns Promise containing DeveloperCertificate.
     */
    public delete(): Promise<DeveloperCertificate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<DeveloperCertificate>(
                    {
                        url: "/v3/trusted-certificates/{cert-id}",
                        method: "DELETE",
                        pathParams: {
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
     * gets a DeveloperCertificate.
     * @returns Promise containing DeveloperCertificate.
     */
    public get(): Promise<DeveloperCertificate> {
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
     * trustedCertificateInfos a TrustedCertificate.
     * @returns Promise containing TrustedCertificate.
     */
    public trustedCertificateInfo(): Promise<TrustedCertificate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<TrustedCertificate>(
                    {
                        url: "/v3/trusted-certificates/{cert-id}",
                        method: "GET",
                        pathParams: {
                            "cert-id": this.id,
                        },
                    },
                    TrustedCertificate,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }
}
