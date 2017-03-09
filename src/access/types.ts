/* 
* mbed Cloud JavaScript SDK
* Copyright ARM Limited 2017
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/**
 * This object represents a policy. Either the feature or the resource must be specified.
 */
export interface Policy {
    /**
     * Comma separated list of actions, empty string represents all actions.
     */
    action?: string;
    /**
     * Resource that is protected by this policy.
     */
    resource?: string;
    /**
     * Feature name corresponding to this policy.
     */
    feature?: string;
    /**
     * True or false controlling whether an action is allowed or not.
     */
    allow?: boolean;
}

/**
 * This object represents an account in requests and responses.
 */
export interface AccountType {
    /**
     * List of sub accounts.
     */
    //subAccounts?: Array<AccountType>;
    /**
     * List of policies if requested.
     */
    policies?: Array<Policy>;
    /**
     * The status of the account.
     */
    status?: string;
    /**
     * The postal code part of the postal address.
     */
    postcode?: string;
    /**
     * The ID of the parent account, if it has any.
     */
    parentId?: string;
    /**
     * Account ID.
     */
    id: string;
    /**
     * An array of aliases.
     */
    aliases: string[];
    /**
     * Postal address line 2.
     */
    addressLine2?: string;
    /**
     * The city part of the postal address.
     */
    city?: string;
    /**
     * Postal address line 1.
     */
    addressLine1?: string;
    /**
     * The display name for the account.
     */
    displayName?: string;
    /**
     * The state part of the postal address.
     */
    state?: string;
    /**
     * Flag (true/false) indicating whether Factory Tool is allowed to download or not.
     */
    provisioningAllowed: boolean;
    /**
     * The company email address for this account.
     */
    email?: string;
    /**
     * The phone number of the company.
     */
    phoneNumber?: string;
    /**
     * The name of the company.
     */
    company?: string;
    /**
     * Time when upgraded to commercial account in UTC format RFC3339.
     */
    upgradedAt?: string;
    /**
     * The tier level of the account; '0': free tier, '1': commercial account. Other values are reserved for the future.
     */
    tier: string;
    /**
     * List of limits as key-value pairs if requested.
     */
    limits?: { [key: string]: string; };
    /**
     * The country part of the postal address.
     */
    country?: string;
    /**
     * Creation UTC time RFC3339.
     */
    createdAt?: string;
    /**
     * The name of the contact person for this account.
     */
    contact?: string;
    /**
     * Account template ID.
     */
    templateId?: string;
}

export type UserStatusEnum = "ENROLLING" | "INVITED" | "ACTIVE" | "RESET" | "INACTIVE";
/**
 * This object represents a user in mbed Cloud.
 */
export interface UserType {
    /**
     * A username containing alphanumerical letters and -,._@+= characters.
     */
    username: string;
    /**
     * Phone number.
     */
    phoneNumber?: string;
    /**
     * A flag indicating that receiving marketing information has been accepted.
     */
    marketingAccepted?: boolean;
    /**
     * A flag indicating that the General Terms and Conditions has been accepted.
     */
    termsAccepted?: boolean;
    /**
     * The full name of the user.
     */
    fullName?: string;
    /**
     * Address.
     */
    address?: string;
    /**
     * The password when creating a new user. It will will generated when not present in the request.
     */
    password?: string;
    /**
     * The email address.
     */
    email: string;
    /**
     * The status of the user. INVITED means that the user has not accepted the invitation request. RESET means that the password must be changed immediately.
     */
    readonly status: UserStatusEnum;
    /**
     * A flag indicating whether the user's email address has been verified or not.
     */
    emailVerified?: boolean;
    /**
     * The UUID of the account.
     */
    accountId: string;
    /**
     * A timestamp of the latest change of the user password, in milliseconds.
     */
    passwordChangedTime?: number;
    /**
     * Creation UTC time RFC3339.
     */
    createdAt?: string;
    /**
     * A timestamp of the user creation in the storage, in milliseconds.
     */
    creationTime?: number;
    /**
     * The UUID of the user.
     */
    id: string;
    /**
     * A timestamp of the latest login of the user, in milliseconds.
     */
    lastLoginTime?: number;
}

export type KeyStatusEnum = "ACTIVE" | "INACTIVE";
/**
 * This object represents an API key in mbed Cloud.
 */
export interface ApiKeyType {
    /**
     * The status of the API key.
     */
    status?: KeyStatusEnum;
    /**
     * The display name for the API key.
     */
    name: string;
    /**
     * Creation UTC time RFC3339.
     */
    createdAt?: string;
    /**
     * The API key.
     */
    key: string;
    /**
     * The owner of this API key, who is the creator by default.
     */
    owner?: string;
    /**
     * The UUID of the API key.
     */
    id: string;
    /**
     * The timestamp of the latest API key usage, in milliseconds.
     */
    lastLoginTime?: number;
}
