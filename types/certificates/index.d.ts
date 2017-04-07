import { ConnectionOptions, CallbackFn, ListOptions, ListResponse } from "../common/interfaces";
import { CertificateTypeEnum, CertificateRequest, DeveloperCertificateRequest } from "./types";
import { Certificate } from "./certificate";
/**
 * ## Certificates API
 *
 * This API is initialized with [ConnectionOptions](../interfaces/connectionoptions.html).
 *
 * To create an instance of this API in [Node.js](https://nodejs.org):
 *
 * ```JavaScript
 * var mbed = require("mbed-cloud-sdk");
 *
 * var certificates = new mbed.CertificatesApi({
 *     apiKey: "<mbed Cloud API Key>"
 * });
 * ```
 *
 * To create an instance of this API in the browser:
 *
 * ```html
 * <script src="<mbed-cloud-sdk>/bundles/certificates.min.js"></script>
 *
 * <script>
 *     var certificates = new mbed.CertificatesApi({
 *         apiKey: "<mbed Cloud API Key>"
 *     });
 * </script>
 * ```
 */
export declare class CertificatesApi {
    private _endpoints;
    /**
     * @param options connection options
     */
    constructor(options: ConnectionOptions);
    private extendCertificate(iamCert, done);
    /**
     * List certificates
     * @param options filter options
     * @returns Promise of listResponse
     */
    listCertificates(options?: ListOptions): Promise<ListResponse<Certificate>>;
    /**
     * List certificates
     * @param options filter options
     * @param callback A function that is passed the arguments (error, listResponse)
     */
    listCertificates(options?: ListOptions, callback?: (err: any, data?: ListResponse<Certificate>) => any): any;
    /**
     * Get details of a certificate
     * @param options.id The certificate ID
     * @returns Promise containing the certificate
     */
    getCertificate(options: {
        id: string;
    }): Promise<Certificate>;
    /**
     * Get details of a certificate
     * @param options.id The certificate ID
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    getCertificate(options: {
        id: string;
    }, callback: CallbackFn<Certificate>): any;
    /**
     * Adds a generated developer certificate
     * @param options Certificate request
     * @returns Promise containing certificate
     */
    addCertificate(options: DeveloperCertificateRequest): Promise<Certificate>;
    /**
     * Adds a generated developer certificate
     * @param options Certificate request
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    addCertificate(options: DeveloperCertificateRequest, callback: CallbackFn<Certificate>): void;
    /**
     * Adds a certificate
     * @param options Certificate request
     * @returns Promise containing certificate
     */
    addCertificate(options: CertificateRequest): Promise<Certificate>;
    /**
     * Adds a certificate
     * @param options Certificate request
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    addCertificate(options: CertificateRequest, callback: CallbackFn<Certificate>): void;
    /**
     * Updates a certificate
     * @param options.id The certificate ID
     * @param options.name Certificate name
     * @param options.description Certificate description
     * @param options.type Certificate type
     * @param options.certificateData X509.v3 CA certificate in PEM or base64 encoded DER format
     * @param options.signature Base64 encoded signature of the account ID signed by the certificate to be uploaded. Signature must be hashed with SHA256
     * @returns Promise containing certificate
     */
    updateCertificate(options: {
        id: string;
        name: string;
        description: string;
        type: CertificateTypeEnum;
        certificateData: string;
        signature: string;
    }): Promise<Certificate>;
    /**
     * Updates a certificate
     * @param options.id The certificate ID
     * @param options.name Certificate name
     * @param options.description Certificate description
     * @param options.type Certificate type
     * @param options.certificateData X509.v3 CA certificate in PEM or base64 encoded DER format
     * @param options.signature Base64 encoded signature of the account ID signed by the certificate to be uploaded. Signature must be hashed with SHA256
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    updateCertificate(options: {
        id: string;
        name: string;
        description: string;
        type: CertificateTypeEnum;
        certificateData: string;
        signature: string;
    }, callback: (err: any, data?: Certificate) => any): any;
    /**
     * Deletes a certificate
     * @param options.id The certificate ID
     * @returns Promise containing any error
     */
    deleteCertificate(options: {
        id: string;
    }): Promise<void>;
    /**
     * Deletes a certificate
     * @param options.id The certificate ID
     * @param callback A function that is passed the return arguments (error, void)
     */
    deleteCertificate(options: {
        id: string;
    }, callback: (err: any, data?: void) => any): any;
}
