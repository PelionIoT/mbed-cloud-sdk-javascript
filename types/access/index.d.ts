import { ConnectionOptions, ListOptions, ListResponse } from "../common/interfaces";
import { AccountType, CertificateServiceEnum } from "./types";
import { Account } from "./account";
import { Certificate } from "./certificate";
import { User } from "./user";
import { ApiKey } from "./apiKey";
import { Group } from "./group";
/**
* Root Access API
*/
export declare class AccessApi {
    private _endpoints;
    /**
    * @param options connection options
    */
    constructor(options: ConnectionOptions);
    /**
     * Get details of account associated with current API key
     * @returns Promise of account
     */
    getAccountDetails(): Promise<Account>;
    /**
     * Get details of account associated with current API key
     * @param callback A function that is passed the return arguments (error, account)
     */
    getAccountDetails(callback: (err: any, data?: Account) => any): any;
    /**
     * Update details of account associated with current API key
     * @param options account details
     * @returns Promise of account
     */
    updateAccountDetails(options: AccountType): Promise<Account>;
    /**
     * Update details of account associated with current API key
     * @param options account details
     * @param callback A function that is passed the return arguments (error, account)
     */
    updateAccountDetails(options: AccountType, callback?: (err: any, data?: Account) => any): any;
    /**
     * List API keys
     * @param options filter options
     * @returns Promise of listResponse
     */
    listApiKeys(options?: ListOptions): Promise<ListResponse<ApiKey>>;
    /**
     * List certificates
     * @param options filter options
     * @param callback A function that is passed the arguments (error, listResponse)
     */
    listApiKeys(options?: ListOptions, callback?: (err: any, data?: ListResponse<ApiKey>) => any): any;
    /**
     * Get details of an API key
     * @param options.id The API key ID (if not specified, returns current API key)
     * @returns Promise containing the API key
     */
    getApiKey(options?: {
        id?: string;
    }): Promise<ApiKey>;
    /**
     * Get details of an API key
     * @param options.id The API key ID (if not specified, returns current API key)
     * @param callback A function that is passed the return arguments (error, API key)
     */
    getApiKey(options?: {
        id?: string;
    }, callback?: (err: any, data?: ApiKey) => any): any;
    /**
     * Adds an API key
     * @param options.name The display name for the API key
     * @param options.owner The owner of this API key
     * @param options.groups A list of group IDs this API key belongs to
     * @returns Promise containing API key
     */
    addApiKey(options: {
        name: string;
        owner?: string;
        groups?: string[];
    }): Promise<ApiKey>;
    /**
     * Adds an API key
     * @param options.name The display name for the API key
     * @param options.owner The owner of this API key
     * @param options.groups A list of group IDs this API key belongs to
     * @param callback A function that is passed the return arguments (error, API key)
     */
    addApiKey(options: {
        name: string;
        owner?: string;
        groups?: string[];
    }, callback: (err: any, data?: ApiKey) => any): any;
    /**
     * Updates an API key
     * @param options.id The API key ID (if not specified, updates current API key)
     * @param options.name The display name for the API key
     * @param options.owner The owner of this API key
     * @returns Promise containing API key
     */
    updateApiKey(options: {
        id?: string;
        name: string;
        owner?: string;
    }): Promise<ApiKey>;
    /**
     * Updates an API key
     * @param options.id The API key ID (if not specified, updates current API key)
     * @param options.name The display name for the API key
     * @param options.owner The owner of this API key
     * @param callback A function that is passed the return arguments (error, API key)
     */
    updateApiKey(options: {
        id?: string;
        name: string;
        owner?: string;
    }, callback: (err: any, data?: ApiKey) => any): any;
    /**
     * Deletes an API key
     * @param options.id The API key ID
     * @returns Promise containing any error
     */
    deleteApiKey(options: {
        id: string;
    }): Promise<void>;
    /**
     * Deletes an API key
     * @param options.id The API key ID
     * @param callback A function that is passed the return arguments (error, void)
     */
    deleteApiKey(options: {
        id: string;
    }, callback: (err: any, data?: void) => any): any;
    /**
     * List certificates
     * @param options filter options
     * @returns Promise of listResponse
     */
    listCertificates(options?: ListOptions): Promise<ListResponse<Certificate>>;
    /**
     * List certificates
     * @param options filter options
     * @param callback A function that is passed the arguments (error, listResponse)
     */
    listCertificates(options?: ListOptions, callback?: (err: any, data?: ListResponse<Certificate>) => any): any;
    /**
     * Get details of a certificate
     * @param options.id The certificate ID
     * @returns Promise containing the certificate
     */
    getCertificate(options: {
        id: string;
    }): Promise<Certificate>;
    /**
     * Get details of a certificate
     * @param options.id The certificate ID
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    getCertificate(options: {
        id: string;
    }, callback: (err: any, data?: Certificate) => any): any;
    /**
     * Adds a certificate
     * @param options.name Certificate name
     * @param options.service Service name where the certificate must be used
     * @param options.certificateData X509.v3 CA certificate in PEM or base64 encoded DER format
     * @param options.signature Base64 encoded signature of the account ID signed by the certificate to be uploaded. Signature must be hashed with SHA256
     * @returns Promise containing certificate
     */
    addCertificate(options: {
        name: string;
        service: CertificateServiceEnum;
        certificateData: string;
        signature: string;
    }): Promise<Certificate>;
    /**
     * Adds a certificate
     * @param options.name Certificate name
     * @param options.service Service name where the certificate must be used
     * @param options.certificateData X509.v3 CA certificate in PEM or base64 encoded DER format
     * @param options.signature Base64 encoded signature of the account ID signed by the certificate to be uploaded. Signature must be hashed with SHA256
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    addCertificate(options: {
        name: string;
        service: CertificateServiceEnum;
        certificateData: string;
        signature: string;
    }, callback: (err: any, data?: Certificate) => any): any;
    /**
     * Updates a certificate
     * @param options.id The certificate ID
     * @param options.name Certificate name
     * @param options.service Service name where the certificate must be used
     * @param options.certificateData X509.v3 CA certificate in PEM or base64 encoded DER format
     * @param options.signature Base64 encoded signature of the account ID signed by the certificate to be uploaded. Signature must be hashed with SHA256
     * @returns Promise containing certificate
     */
    updateCertificate(options: {
        id: string;
        name: string;
        service: CertificateServiceEnum;
        certificateData: string;
        signature: string;
    }): Promise<Certificate>;
    /**
     * Updates a certificate
     * @param options.id The certificate ID
     * @param options.name Certificate name
     * @param options.service Service name where the certificate must be used
     * @param options.certificateData X509.v3 CA certificate in PEM or base64 encoded DER format
     * @param options.signature Base64 encoded signature of the account ID signed by the certificate to be uploaded. Signature must be hashed with SHA256
     * @param callback A function that is passed the return arguments (error, certificate)
     */
    updateCertificate(options: {
        id: string;
        name: string;
        service: CertificateServiceEnum;
        certificateData: string;
        signature: string;
    }, callback: (err: any, data?: Certificate) => any): any;
    /**
     * Deletes a certificate
     * @param options.id The certificate ID
     * @returns Promise containing any error
     */
    deleteCertificate(options: {
        id: string;
    }): Promise<void>;
    /**
     * Deletes a certificate
     * @param options.id The certificate ID
     * @param callback A function that is passed the return arguments (error, void)
     */
    deleteCertificate(options: {
        id: string;
    }, callback: (err: any, data?: void) => any): any;
    /**
     * List users
     * @param options filter options
     * @returns Promise of listResponse
     */
    listUsers(options?: ListOptions): Promise<ListResponse<User>>;
    /**
     * List users
     * @param options filter options
     * @param callback A function that is passed the arguments (error, listResponse)
     */
    listUsers(options?: ListOptions, callback?: (err: any, data?: ListResponse<User>) => any): any;
    /**
     * Get details of a user
     * @param options.id The user ID
     * @returns Promise containing the user
     */
    getUser(options: {
        id: string;
    }): Promise<User>;
    /**
     * Get details of a user
     * @param options.id The user ID
     * @param callback A function that is passed the return arguments (error, user)
     */
    getUser(options: {
        id: string;
    }, callback: (err: any, data?: User) => any): any;
    /**
     * Adds a user
     * @param options.username A username containing alphanumerical letters and -,._@+= characters
     * @param options.phoneNumber Phone number
     * @param options.marketingAccepted A flag indicating that receiving marketing information has been accepted
     * @param options.termsAccepted A flag indicating that the General Terms and Conditions has been accepted
     * @param options.fullName The full name of the user
     * @param options.address Address
     * @param options.password The password when creating a new user. It will will generated when not present in the request
     * @param options.email The email address
     * @param options. A list of IDs of the groups this user belongs to
     * @returns Promise containing user
     */
    addUser(options: {
        username: string;
        phoneNumber?: string;
        marketingAccepted?: boolean;
        termsAccepted?: boolean;
        fullName?: string;
        address?: string;
        password?: string;
        email: string;
        groups?: string[];
    }): Promise<User>;
    /**
     * Adds a user
     * @param options.username A username containing alphanumerical letters and -,._@+= characters
     * @param options.phoneNumber Phone number
     * @param options.marketingAccepted A flag indicating that receiving marketing information has been accepted
     * @param options.termsAccepted A flag indicating that the General Terms and Conditions has been accepted
     * @param options.fullName The full name of the user
     * @param options.address Address
     * @param options.password The password when creating a new user. It will will generated when not present in the request
     * @param options.email The email address
     * @param options. A list of IDs of the groups this user belongs to
     * @param callback A function that is passed the return arguments (error, user)
     */
    addUser(options: {
        username: string;
        phoneNumber?: string;
        marketingAccepted?: boolean;
        termsAccepted?: boolean;
        fullName?: string;
        address?: string;
        password?: string;
        email: string;
        groups?: string[];
    }, callback: (err: any, data?: User) => any): any;
    /**
     * Updates a user
     * @param options.id User ID
     * @param options.username A username containing alphanumerical letters and -,._@+= characters
     * @param options.phoneNumber Phone number
     * @param options.marketingAccepted A flag indicating that receiving marketing information has been accepted
     * @param options.termsAccepted A flag indicating that the General Terms and Conditions has been accepted
     * @param options.fullName The full name of the user
     * @param options.address Address
     * @param options.password The password when creating a new user. It will will generated when not present in the request
     * @param options.email The email address
     * @returns Promise containing user
     */
    updateUser(options: {
        id: string;
        username: string;
        phoneNumber?: string;
        marketingAccepted?: boolean;
        termsAccepted?: boolean;
        fullName?: string;
        address?: string;
        password?: string;
        email: string;
    }): Promise<User>;
    /**
     * Updates a user
     * @param options.id User ID
     * @param options.username A username containing alphanumerical letters and -,._@+= characters
     * @param options.phoneNumber Phone number
     * @param options.marketingAccepted A flag indicating that receiving marketing information has been accepted
     * @param options.termsAccepted A flag indicating that the General Terms and Conditions has been accepted
     * @param options.fullName The full name of the user
     * @param options.address Address
     * @param options.password The password when creating a new user. It will will generated when not present in the request
     * @param options.email The email address
     * @param callback A function that is passed the return arguments (error, user)
     */
    updateUser(options: {
        id: string;
        username: string;
        phoneNumber?: string;
        marketingAccepted?: boolean;
        termsAccepted?: boolean;
        fullName?: string;
        address?: string;
        password?: string;
        email: string;
    }, callback: (err: any, data?: User) => any): any;
    /**
     * Deletes a user
     * @param options.id The user ID
     * @param options.force A flag indicating that the user is forced to be deleted
     * @returns Promise containing any error
     */
    deleteUser(options: {
        id: string;
        force?: string;
    }): Promise<void>;
    /**
     * Deletes a user
     * @param options.id The user ID
     * @param options.force A flag indicating that the user is forced to be deleted
     * @param callback A function that is passed the return arguments (error, void)
     */
    deleteUser(options: {
        id: string;
        force?: string;
    }, callback: (err: any, data?: void) => any): any;
    /**
     * List groups
     * @param options filter options
     * @returns Promise of listResponse
     */
    listGroups(options?: ListOptions): Promise<ListResponse<Group>>;
    /**
     * List groups
     * @param options filter options
     * @param callback A function that is passed the arguments (error, listResponse)
     */
    listGroups(options?: ListOptions, callback?: (err: any, data?: ListResponse<Group>) => any): any;
}
