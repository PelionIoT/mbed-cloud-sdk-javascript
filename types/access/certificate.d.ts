import { CertificateType } from "./types";
import { CACertificateResp as apiCertificate } from "../_api/iam";
import { AccessApi } from "./index";
export declare class Certificate {
    private _api;
    constructor(options: CertificateType, _api?: AccessApi);
    static map(from: apiCertificate, api: AccessApi): Certificate;
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
