import { CertificateType } from "./types";
import { CACertificateResp as apiCertificate } from "../_api/iam";
export declare class Certificate {
    constructor(options: CertificateType);
    static map(from: apiCertificate): Certificate;
}
export interface Certificate extends CertificateType {
}
