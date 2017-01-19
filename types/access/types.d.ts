export declare type AccountStatusEnum = "ENROLLING" | "ACTIVE" | "SUSPENDED" | "DISABLED";
/**
 * This object represents an account in requests and responses.
 */
export interface AccountType {
    /**
     * The status of the account.
     */
    "status": AccountStatusEnum;
    /**
     * The postal code part of the postal address.
     */
    "postcode"?: string;
    /**
     * The ID of the parent account, if it has any.
     */
    "parentId"?: string;
    /**
     * Account ID.
     */
    "id": string;
    /**
     * An array of aliases.
     */
    "aliases": Array<string>;
    /**
     * Postal address line 2.
     */
    "addressLine2"?: string;
    /**
     * The city part of the postal address.
     */
    "city"?: string;
    /**
     * Postal address line 1.
     */
    "addressLine1"?: string;
    /**
     * The display name for the account.
     */
    "displayName"?: string;
    /**
     * The state part of the postal address.
     */
    "state"?: string;
    /**
     * Flag (true/false) indicating whether Factory Tool is allowed to download or not.
     */
    "provisioningAllowed": boolean;
    /**
     * The company email address for this account.
     */
    "email"?: string;
    /**
     * The phone number of the company.
     */
    "phoneNumber"?: string;
    /**
     * The name of the company.
     */
    "company"?: string;
    /**
     * Time when upgraded to commercial account in UTC format RFC3339.
     */
    "upgradedAt"?: string;
    /**
     * The tier level of the account; '0': free tier, '1': commercial account. Other values are reserved for the future.
     */
    "tier": string;
    /**
     * List of limits as key-value pairs if requested.
     */
    "limits"?: {
        [key: string]: string;
    };
    /**
     * The country part of the postal address.
     */
    "country"?: string;
    /**
     * Creation UTC time RFC3339.
     */
    "createdAt"?: string;
    /**
     * The name of the contact person for this account.
     */
    "contact"?: string;
    /**
     * Account template ID.
     */
    "templateId"?: string;
}
export declare type UserStatusEnum = "INVITED" | "ACTIVE" | "RESET" | "INACTIVE";
/**
 * This object represents a user in mbed Cloud.
 */
export interface UserType {
    /**
     * The status of the user. INVITED means that the user has not accepted the invitation request. RESET means that the password must be changed immediately.
     */
    "status": UserStatusEnum;
    /**
     * A username containing alphanumerical letters and -,._@+= characters.
     */
    "username": string;
    /**
     * A flag indicating whether the user's email address has been verified or not.
     */
    "emailVerified"?: boolean;
    /**
     * The UUID of the account.
     */
    "accountId": string;
    /**
     * A timestamp of the latest change of the user password, in milliseconds.
     */
    "passwordChangedTime"?: number;
    /**
     * A list of IDs of the groups this user belongs to.
     */
    "groups"?: string[];
    /**
     * Creation UTC time RFC3339.
     */
    "createdAt"?: string;
    /**
     * A flag indicating that the General Terms and Conditions has been accepted.
     */
    "gtcAccepted"?: boolean;
    /**
     * The email address.
     */
    "email": string;
    /**
     * A flag indicating that receiving marketing information has been accepted.
     */
    "marketingAccepted"?: boolean;
    /**
     * The full name of the user.
     */
    "fullName"?: string;
    /**
     * Address.
     */
    "address"?: string;
    /**
     * A timestamp of the user creation in the storage, in milliseconds.
     */
    "creationTime"?: number;
    /**
     * The password when creating a new user. It will will generated when not present in the request.
     */
    "password"?: string;
    /**
     * Phone number.
     */
    "phoneNumber"?: string;
    /**
     * The UUID of the user.
     */
    "id": string;
    /**
     * A timestamp of the latest login of the user, in milliseconds.
     */
    "lastLoginTime"?: number;
}
export declare type CertificateServiceEnum = "lwm2m" | "bootstrap" | "provisioning";
/**
 * This object represents an CA Certificate in responses.
 */
export interface CertificateType {
    /**
     * The UUID of the account.
     */
    "accountId": string;
    /**
     * Service name where the certificate is to be used.
     */
    "service": CertificateServiceEnum;
    /**
     * Creation UTC time RFC3339.
     */
    "createdAt"?: string;
    /**
     * Subject of the certificate.
     */
    "subject": string;
    /**
     * Expiration time in UTC formatted as RFC3339.
     */
    "validity": string;
    /**
     * Issuer of the certificate.
     */
    "issuer": string;
    /**
     * X509.v3 CA certificate in PEM or base64 encoded DER format.
     */
    "data": string;
    /**
     * Entity ID.
     */
    "id": string;
    /**
     * Certificate name.
     */
    "name": string;
}
