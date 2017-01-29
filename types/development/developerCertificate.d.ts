import { DeveloperCertificateType } from "./types";
import { Body as apiDeveloperCertificateRequest, DeveloperCertificate as apiDeveloperCertificate } from "../_api/developer_certificate";
export declare class DeveloperCertificate {
    constructor(options: DeveloperCertificateType);
    static map(from: apiDeveloperCertificate): DeveloperCertificate;
    static reverseMap(from: any): apiDeveloperCertificateRequest;
}
export interface DeveloperCertificate extends DeveloperCertificateType {
}
