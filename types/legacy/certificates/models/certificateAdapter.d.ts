import { CertificatesApi } from "../certificatesApi";
import { Certificate } from "./certificate";
import { AddCertificateObject, AddDeveloperCertificateObject, UpdateCertificateObject } from "../types";
import { TrustedCertificateReq as iamCertificateRequest, TrustedCertificateUpdateReq as iamCertificateUpdate, TrustedCertificateResp as iamCertificate } from "../../_api/iam";
import { DeveloperCertificateRequestData as caCertificateRequest, CredentialsResponseData as serverResponse, DeveloperCertificateResponseData as developerResponse } from "../../_api/connector_ca";
/**
 * Certificate Adapter
 */
export declare class CertificateAdapter {
    private static map;
    static mapCertificate(from: iamCertificate, api: CertificatesApi): Certificate;
    static mapServerCertificate(from: iamCertificate, api: CertificatesApi, extension: serverResponse): Certificate;
    static mapDeveloperCertificate(from: iamCertificate, api: CertificatesApi, extension: developerResponse): Certificate;
    static reverseMap(from: AddCertificateObject): iamCertificateRequest;
    static reverseUpdateMap(from: UpdateCertificateObject): iamCertificateUpdate;
    static reverseDeveloperMap(from: AddDeveloperCertificateObject): caCertificateRequest;
}
