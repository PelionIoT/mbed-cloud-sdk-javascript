import { CertificateType, CertificateServiceEnum } from "./types";
import { CACertificateReq as apiCertificateRequest, CACertificateResp as apiCertificate } from "../_api/iam";
import { AccessApi } from "./index";
export declare class Certificate {
    private _api;
    constructor(options: CertificateType, _api?: AccessApi);
    static map(from: apiCertificate, api: AccessApi): Certificate;
    static reverseMap(from: any): apiCertificateRequest;
    /**
     * Updates the certificate
     * @param options.name Certificate name
     * @param options.service Service name where the certificate must be used
     * @param options.certificateData X509.v3 CA certificate in PEM or base64 encoded DER format
     * @param options.signature Base64 encoded signature of the account ID signed by the certificate to be uploaded. Signature must be hashed with SHA256
     * @returns Promise containing certificate
     */
    update(options: {
        name: string;
        service: CertificateServiceEnum;
        certificateData: string;
        signature: string;
    }): Promise<Certificate>;
    /**
     * Updates the certificate
     * @param options.name Certificate name
     * @param options.service Service name where the certificate must be used
     * @param options.certificateData X509.v3 CA certificate in PEM or base64 encoded DER format
     * @param options.signature Base64 encoded signature of the account ID signed by the certificate to be uploaded. Signature must be hashed with SHA256
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    update(options: {
        name: string;
        service: CertificateServiceEnum;
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
