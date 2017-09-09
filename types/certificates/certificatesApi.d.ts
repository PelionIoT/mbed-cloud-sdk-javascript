import { ConnectionOptions, CallbackFn } from "../common/interfaces";
import { ListResponse } from "../common/listResponse";
import { AddDeveloperCertificateObject, AddCertificateObject, UpdateCertificateObject, CertificateListOptions } from "./types";
import { Certificate } from "./models/certificate";
import { ApiMetadata } from "../common/apiMetadata";
/**
 * ## Certificates API
 *
 * This API is initialized with [ConnectionOptions](../interfaces/connectionoptions.html).
 *
 * To create an instance of this API in [Node.js](https://nodejs.org):
 *
 * ```JavaScript
 * var MbedCloudSDK = require("mbed-cloud-sdk");
 *
 * var certificates = new MbedCloudSDK.CertificatesApi({
 *     apiKey: "<Mbed Cloud API Key>"
 * });
 * ```
 *
 * To create an instance of this API in the browser:
 *
 * ```html
 * <script src="<mbed-cloud-sdk>/bundles/certificates.min.js"></script>
 *
 * <script>
 *     var certificates = new MbedCloudSDK.CertificatesApi({
 *         apiKey: "<Mbed Cloud API Key>"
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
     *
     * Example:
     * ```JavaScript
     * certificates.listCertificates({
     *     limit: 5,
     *     order: 'ASC',
     *     filter: {
     *         type: { $eq: 'bootstrap' }
     *     }
     * })
     * .then(certificates => {
     *     // Utilize certificates here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param options filter options
     * @returns Promise of listResponse
     */
    listCertificates(options?: CertificateListOptions): Promise<ListResponse<Certificate>>;
    /**
     * List certificates
     *
     * Example:
     * ```JavaScript
     * certificates.listCertificates({
     *     limit: 5,
     *     order: 'ASC',
     *     filter: {
     *         type: { $eq: 'bootstrap' }
     *     }
     * }, function(error, certificates) {
     *     if (error) throw error;
     *     // Utilize certificates here
     * });
     * ```
     *
     * @param options filter options
     * @param callback A function that is passed the arguments (error, listResponse)
     */
    listCertificates(options?: CertificateListOptions, callback?: CallbackFn<ListResponse<Certificate>>): void;
    /**
     * Get details of a certificate
     *
     * Example:
     * ```JavaScript
     * certificates.getCertificate('015c64f76a7b02420a01230a00000000')
     * .then(certificate => {
     *     // Utilize certificate here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param certificateId The certificate ID
     * @returns Promise containing the certificate
     */
    getCertificate(certificateId: string): Promise<Certificate>;
    /**
     * Get details of a certificate
     *
     * Example:
     * ```JavaScript
     * certificates.getCertificate('015c64f76a7b02420a01230a00000000', function(error, certificate) {
     *     if (error) throw error;
     *     // Utilize certificate here
     * });
     * ```
     *
     * @param certificateId The certificate ID
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    getCertificate(certificateId: string, callback: CallbackFn<Certificate>): void;
    /**
     * Adds a generated developer certificate
     *
     * Example:
     * ```JavaScript
     * certificates.addDeveloperCertificate({
     *     name: 'CertName',
     *     description: 'SDK generated cert',
     *     type: 'developer'
     * })
     * .then(certificate => {
     *     // Utilize certificate here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param certificate Certificate request
     * @returns Promise containing certificate
     */
    addDeveloperCertificate(certificate: AddDeveloperCertificateObject): Promise<Certificate>;
    /**
     * Adds a generated developer certificate
     *
     * Example:
     * ```JavaScript
     * certificates.addDeveloperCertificate({
     *     name: 'CertName',
     *     description: 'SDK generated cert',
     *     type: 'developer'
     * }, function(error, certificate) {
     *     if (error) throw error;
     *     // Utilize certificate here
     * });
     * ```
     *
     * @param certificate Certificate request
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    addDeveloperCertificate(certificate: AddDeveloperCertificateObject, callback: CallbackFn<Certificate>): void;
    /**
     * Adds a certificate
     *
     * Example:
     * ```JavaScript
     * // Signature is a Base64 encoded signature of the account ID hashed with SHA256
     * certificates.addCertificate({
     *     name: 'CertName',
     *     description: 'SDK generated cert',
     *     type: 'developer',
     *     signature: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
     *     certificateData: '-----BEGIN CERTIFICATE-----\nMIICFzCCAbygAwIBAgIQX ... EPSDKEF\n-----END CERTIFICATE-----'
     * })
     * .then(certificate => {
     *     // Utilize certificate here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param certificate Certificate request
     * @returns Promise containing certificate
     */
    addCertificate(certificate: AddCertificateObject): Promise<Certificate>;
    /**
     * Adds a certificate
     *
     * Example:
     * ```JavaScript
     * // Signature is a Base64 encoded signature of the account ID hashed with SHA256
     * certificates.addCertificate({
     *     name: 'CertName',
     *     description: 'SDK generated cert',
     *     type: 'developer',
     *     signature: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
     *     certificateData: '-----BEGIN CERTIFICATE-----\nMIICFzCCAbygAwIBAgIQX ... EPSDKEF\n-----END CERTIFICATE-----'
     * }, function(error, certificate) {
     *     if (error) throw error;
     *     // Utilize certificate here
     * });
     * ```
     *
     * @param certificate Certificate request
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    addCertificate(certificate: AddCertificateObject, callback: CallbackFn<Certificate>): void;
    /**
     * Updates a certificate
     *
     * Example:
     * ```JavaScript
     * // Signature is a Base64 encoded signature of the account ID hashed with SHA256
     * certificates.updateCertificate({
     *     name: 'CertName',
     *     description: 'SDK generated cert',
     *     type: 'developer',
     *     signature: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
     *     certificateData: '-----BEGIN CERTIFICATE-----\nMIICFzCCAbygAwIBAgIQX ... EPSDKEF\n-----END CERTIFICATE-----'
     * })
     * .then(certificate => {
     *     // Utilize certificate here
     * })
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param certificate Certificate data
     * @returns Promise containing certificate
     */
    updateCertificate(certificate: UpdateCertificateObject): Promise<Certificate>;
    /**
     * Updates a certificate
     *
     * Example:
     * ```JavaScript
     * // Signature is a Base64 encoded signature of the account ID hashed with SHA256
     * certificates.updateCertificate({
     *     name: 'CertName',
     *     description: 'SDK generated cert',
     *     type: 'developer',
     *     signature: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
     *     certificateData: '-----BEGIN CERTIFICATE-----\nMIICFzCCAbygAwIBAgIQX ... EPSDKEF\n-----END CERTIFICATE-----'
     * }, function(error, certificate) {
     *     if (error) throw error;
     *     // Utilize certificate here
     * });
     * ```
     *
     * @param certificate Certificate data
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    updateCertificate(certificate: UpdateCertificateObject, callback: CallbackFn<Certificate>): void;
    /**
     * Deletes a certificate
     *
     * Example:
     * ```JavaScript
     * certificates.deleteCertificate('015c64f76a7b02420a01230a00000000')
     * .catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * @param certificateId The certificate ID
     * @returns Promise containing any error
     */
    deleteCertificate(certificateId: string): Promise<void>;
    /**
     * Deletes a certificate
     *
     * Example:
     * ```JavaScript
     * certificates.deleteCertificate('015c64f76a7b02420a01230a00000000', function(error) {
     *     if (error) throw error;
     * });
     * ```
     *
     * @param certificateId The certificate ID
     * @param callback A function that is passed the return arguments (error, void)
     */
    deleteCertificate(certificateId: string, callback: CallbackFn<void>): void;
    /**
     * Get meta data for the last Mbed Cloud API call
     * @returns Promise of meta data
     */
    getLastApiMetadata(): Promise<ApiMetadata>;
    /**
     * Get meta data for the last Mbed Cloud API call
     * @param callback A function that is passed the arguments (error, meta data)
     */
    getLastApiMetadata(callback: CallbackFn<ApiMetadata>): void;
}
