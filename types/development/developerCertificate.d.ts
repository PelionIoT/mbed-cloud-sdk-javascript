import { DeveloperCertificateType } from "./types";
import { Body as apiDeveloperCertificateRequest, DeveloperCertificate as apiDeveloperCertificate } from "../_api/developer_certificate";
import { DevelopmentApi } from "./index";
export declare class DeveloperCertificate {
    private _api;
    constructor(options: DeveloperCertificateType, _api: DevelopmentApi);
    static map(from: apiDeveloperCertificate, api: DevelopmentApi): DeveloperCertificate;
    static reverseMap(from: any): apiDeveloperCertificateRequest;
    /**
     * Deletes the developer certificate
     * @returns empty Promise
     */
    delete(): Promise<void>;
    /**
     * Deletes the developer certificate
     * @param callback A function that is passed the return arguments (error, void)
     */
    delete(callback?: (err: any, data?: void) => any): any;
}
export interface DeveloperCertificate extends DeveloperCertificateType {
}
