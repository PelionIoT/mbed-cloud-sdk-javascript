import { DeveloperCertificateType } from "./types";
import { DeveloperCertificate as apiDeveloperCertificate } from "../_api/developer_certificate";
export declare class DeveloperCertificate {
    constructor(options: DeveloperCertificateType);
    static map(from: apiDeveloperCertificate): DeveloperCertificate;
}
export interface DeveloperCertificate extends DeveloperCertificateType {
}
