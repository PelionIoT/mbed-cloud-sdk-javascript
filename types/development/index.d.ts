import { ConnectionOptions } from "../helpers/interfaces";
import { DeveloperCertificate } from "./developerCertificate";
/**
 * Root Development API
 */
export declare class DevelopmentApi {
    private _endpoints;
    /**
     * @param options connection options
     */
    constructor(options: ConnectionOptions);
    /**
     * Adds a developer certificate to the account (only one per account allowed)
     * @param options.publicKey The developer certificate public key in raw format (65 bytes), Base64 encoded, NIST P-256 curve
     * @returns Promise containing created certificate
     */
    addCertificate(options: {
        publicKey: string;
    }): Promise<DeveloperCertificate>;
    /**
     * Adds a developer certificate to the account (only one per account allowed).
     * @param options.publicKey The developer certificate public key in raw format (65 bytes), Base64 encoded, NIST P-256 curve.
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    addCertificate(options: {
        publicKey: string;
    }, callback: (err: any, data?: DeveloperCertificate) => any): any;
    /**
     * Gets the current developer certificate of the account
     * @returns Promise containing current certificate
     */
    getCertificate(): Promise<DeveloperCertificate>;
    /**
     * Gets the current developer certificate of the account
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    getCertificate(callback: (err: any, data?: DeveloperCertificate) => any): any;
    /**
     * Deletes the account's developer certificate (only one per account allowed)
     * @returns empty Promise
     */
    deleteCertificate(): Promise<void>;
    /**
     * Deletes the account's developer certificate (only one per account allowed)
     * @param callback A function that is passed the return arguments (error, void)
     */
    deleteCertificate(callback?: (err: any, data?: void) => any): any;
}
