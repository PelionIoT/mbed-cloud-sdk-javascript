import { CertificateType, CertificateTypeEnum, DeveloperCertificateRequest, CertificateRequest } from "./types";
import { TrustedCertificateReq as iamCertificateRequest, TrustedCertificateResp as iamCertificate } from "../_api/iam";
import { Body as caCertificateRequest, InlineResponse200 as bootstrapResponse, InlineResponse201 as developerResponse, InlineResponse2001 as lwm2mResponse } from "../_api/connector_ca";
import { CertificatesApi } from "./index";
export declare class Certificate {
    private _api;
    constructor(options: CertificateType, _api?: CertificatesApi);
    static map(from: iamCertificate, api: CertificatesApi): Certificate;
    static mapExtension(base: Certificate, extension: bootstrapResponse | lwm2mResponse): Certificate;
    static mapDeveloperExtension(base: Certificate, extension: developerResponse): Certificate;
    static reverseIamMap(from: CertificateRequest): iamCertificateRequest;
    static reverseCaMap(from: DeveloperCertificateRequest): caCertificateRequest;
    /**
     * Updates the certificate
     * @param options.name Certificate name
     * @param options.description Certificate description
     * @param options.type Certificate type
     * @param options.certificateData X509.v3 CA certificate in PEM or base64 encoded DER format
     * @param options.signature Base64 encoded signature of the account ID signed by the certificate to be uploaded. Signature must be hashed with SHA256
     * @returns Promise containing certificate
     */
    update(options: {
        name: string;
        description: string;
        type: CertificateTypeEnum;
        certificateData: string;
        signature: string;
    }): Promise<Certificate>;
    /**
     * Updates the certificate
     * @param options.name Certificate name
     * @param options.description Certificate description
     * @param options.type Certificate type
     * @param options.certificateData X509.v3 CA certificate in PEM or base64 encoded DER format
     * @param options.signature Base64 encoded signature of the account ID signed by the certificate to be uploaded. Signature must be hashed with SHA256
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    update(options: {
        name: string;
        description: string;
        type: CertificateTypeEnum;
        certificateData: string;
        signature: string;
    }, callback: (err: any, data?: Certificate) => any): any;
    /**
     * Delete the certificate
     * @returns Promise containing any error
     */
    delete(): Promise<void>;
    /**
     * Delete the certificate
     * @param callback A function that is passed any error
     */
    delete(callback?: (err: any, data?: void) => any): any;
}
export interface Certificate extends CertificateType {
}
