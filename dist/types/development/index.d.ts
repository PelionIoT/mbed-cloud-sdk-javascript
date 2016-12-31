/**
* Root Account object
*/
export declare class Development {
    private _api;
    /**
    * @param options Options object
    */
    constructor(options: Development.DevelopmentOptions);
    /**
    * Gets a list of currently registered endpoints
    * @param type Filters endpoints by endpoint-type
    * @param callback A function that is passed the arguments (error, endpoints)
    * @returns Optional Promise of currently registered endpoints
    */
    postCertificate(options: Development.CertificateOptions, callback?: (err: any, data?: any) => void): Promise<any>;
    getCertificate(options?: Development.CertificateOptions, callback?: (err: any, data?: any) => void): Promise<any>;
    deleteCertificate(options: Development.CertificateOptions, callback?: (err: any, data?: void) => void): Promise<void>;
}
export declare namespace Development {
    interface DevelopmentOptions {
        /**
        * Access Key for your mbed Device Connector account
        */
        accessKey: string;
        /**
        * URL for mbed Device Connector API
        */
        host?: string;
    }
    interface CertificateBody {
        /**
        * The developer certificate public key in PEM format (NIST P-256 curve).
        */
        'pubKey': string;
    }
    interface CertificateOptions {
        authorization: string;
        body?: CertificateBody;
    }
}
