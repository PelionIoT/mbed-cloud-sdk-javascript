import { CredentialsResponseData as serverResponse, DeveloperCertificateRequestData as caCertificateRequest, DeveloperCertificateResponseData as developerResponse } from "../../_api/connector_ca";
import { TrustedCertificateReq as iamCertificateRequest, TrustedCertificateResp as iamCertificate, TrustedCertificateUpdateReq as iamCertificateUpdate } from "../../_api/iam";
import { CertificatesApi } from "../certificatesApi";
import { AddCertificateObject, AddDeveloperCertificateObject, UpdateCertificateObject } from "../types";
import { Certificate } from "./certificate";
/**
 * Certificate Adapter
 */
export declare class CertificateAdapter {
    static mapCertificate(from: iamCertificate, api: CertificatesApi): Certificate;
    static mapServerCertificate(from: iamCertificate, api: CertificatesApi, extension: serverResponse): Certificate;
    static mapDeveloperCertificate(from: iamCertificate, api: CertificatesApi, extension: developerResponse): Certificate;
    static reverseMap(from: AddCertificateObject): iamCertificateRequest;
    static reverseUpdateMap(from: UpdateCertificateObject): iamCertificateUpdate;
    static reverseDeveloperMap(from: AddDeveloperCertificateObject): caCertificateRequest;
    private static map;
}
