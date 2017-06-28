import { CertificatesApi } from "../certificatesApi";
import { Certificate } from "./certificate";
import { AddCertificateObject, AddDeveloperCertificateObject } from "../types";
import { TrustedCertificateReq as iamCertificateRequest, TrustedCertificateResp as iamCertificate } from "../../_api/iam";
import { DeveloperCertificateRequestData as caCertificateRequest, ServerCredentialsResponseData as serverResponse, DeveloperCertificateResponseData as developerResponse } from "../../_api/connector_ca";
/**
 * Certificate Adapter
 */
export declare class CertificateAdapter {
    private static map(from);
    static mapCertificate(from: iamCertificate, api: CertificatesApi): Certificate;
    static mapServerCertificate(from: iamCertificate, api: CertificatesApi, extension: serverResponse): Certificate;
    static mapDeveloperCertificate(from: iamCertificate, api: CertificatesApi, extension: developerResponse): Certificate;
    static reverseMap(from: AddCertificateObject): iamCertificateRequest;
    static reverseDeveloperMap(from: AddDeveloperCertificateObject): caCertificateRequest;
}
