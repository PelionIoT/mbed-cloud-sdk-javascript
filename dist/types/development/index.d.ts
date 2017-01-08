import { ConnectionOptions } from "../helpers/interfaces";
/**
* Root Account object
*/
export declare class Development {
    private _api;
    /**
    * @param options Options object
    */
    constructor(options: ConnectionOptions);
    postCertificate(options: {
        pubKey: string;
    }): Promise<Certificate>;
    postCertificate(options: {
        pubKey: string;
    }, callback: (err: any, data?: Certificate) => void): any;
    getCertificate(): Promise<Certificate>;
    getCertificate(callback?: (err: any, data?: Certificate) => void): any;
    deleteCertificate(): Promise<void>;
    deleteCertificate(callback?: (err: any, data?: void) => void): any;
}
export interface Certificate {
    /**
    * UTC time of the entity creation.
    */
    createdAt: string;
    /**
    * The developer certificate public key in PEM format (NIST P-256 curve).
    */
    pubKey: string;
    /**
    * entity ID
    */
    id: string;
}
