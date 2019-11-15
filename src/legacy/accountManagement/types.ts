/*
 * Pelion Device Management JavaScript SDK
 * Copyright Arm Limited 2017
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

import { ComparisonObject, ListOptions } from "../common/interfaces";

export type AccountStatusEnum = "ENROLLING" | "ACTIVE" | "RESTRICTED" | "SUSPENDED";

export type MultifactorAuthenticationStatusEnum = "enforced" | "optional";
/**
 * This object represents an account in requests and responses.
 */
export interface UpdateAccountObject {
    /**
     * The display name for the account.
     */
    displayName?: string;
    /**
     * An array of aliases.
     */
    aliases?: Array<string>;
    /**
     * The name of the company.
     */
    company?: string;
    /**
     * The name of the contact person for this account.
     */
    contact?: string;
    /**
     * The company email address for this account.
     */
    email?: string;
    /**
     * The phone number of the company.
     */
    phoneNumber?: string;
    /**
     * Postal address line 1.
     */
    addressLine1?: string;
    /**
     * Postal address line 2.
     */
    addressLine2?: string;
    /**
     * The city part of the postal address.
     */
    city?: string;
    /**
     * The state part of the postal address.
     */
    state?: string;
    /**
     * The postal code part of the postal address.
     */
    postcode?: string;
    /**
     * The country part of the postal address.
     */
    country?: string;
    /**
     * The number of days before account expiration notification email should be sent
     */
    expiryWarning?: string;
    /**
     * The enforcement status of the multi-factor authentication
     */
    multifactorAuthenticationStatus?: MultifactorAuthenticationStatusEnum;
    /**
     * The list of notification email addresses
     */
    notificationEmails?: Array<string>;
    /**
     * Email address of the sales contact.
     */
    salesContactEmail?: string;
}

export type ApiKeyStatusEnum = "ACTIVE" | "INACTIVE";
/**
 * This object represents the common properties between Add and Update ApiKey.
 */
export interface ApiKeyObject {
    /**
     * The display name for the API key.
     */
    name: string;
    /**
     * The owner of this API key, who is the creator by default.
     */
    ownerId?: string;
    /**
     * The status of the API key.
     */
    status?: ApiKeyStatusEnum;
}
export interface AddApiKeyObject extends ApiKeyObject {
    /**
     * A list of group IDs this API key belongs to.
     */
    groups?: Array<string>;
}

export interface UpdateApiKeyObject extends ApiKeyObject {
    /**
     * The UUID of the API key.
     */
    id: string;
}

export type UserStatusEnum = "ENROLLING" | "INVITED" | "ACTIVE" | "RESET" | "INACTIVE";
/**
 * This object represents a user in Pelion Device Management.
 */
export interface UserObject {
    /**
     * The full name of the user.
     */
    fullName?: string;
    /**
     * A username containing alphanumerical letters and -,._@+= characters.
     */
    username?: string;
    /**
     * The password when creating a new user. It will be generated when not present in the request.
     */
    password?: string;
    /**
     * Phone number.
     */
    phoneNumber?: string;
    /**
     * Address.
     */
    address?: string;
    /**
     * A flag indicating that the General Terms and Conditions has been accepted.
     */
    termsAccepted?: boolean;
    /**
     * A flag indicating that receiving marketing information has been accepted.
     */
    marketingAccepted?: boolean;
    /**
     * Groups
     */
    groups?: Array<string>;
}

export interface AddUserObject extends UserObject {
    /**
     * The email address.
     */
    email: string;
}

export interface UpdateUserObject extends UserObject {
    /**
     * The UUID of the user.
     */
    id: string;
    /**
     * The email address.
     */
    email?: string;
}

/**
 * Options to use when listing api keys
 */
export interface ApiKeyListOptions extends ListOptions {
    /**
     * The api key filter
     *
     * Constructed like so:
     *  ```JavaScript
     *  filter: {
     *    ownerId: { $eq: "1234" },
     *    apiKey: { $eq: "abc123" }
     *  }
     *  ```
     */
    filter?: {
        /**
         * Owner filter
         */
        ownerId: ComparisonObject<string>;
        /**
         * ApiKey filter
         */
        apiKey: ComparisonObject<string>;
    };
}

/**
 * Options to use when listing users
 */
export interface UserListOptions extends ListOptions {
    /**
     * The user filter
     *
     * Constructed like so:
     *  ```JavaScript
     *  filter: {
     *    status: { $eq: "INVITED" },
     *    email: { $eq: "email@email.com" },
     *  }
     *  ```
     */
    filter?: {
        /**
         * User status filter
         */
        status: ComparisonObject<UserStatusEnum>;
        /**
         * User email filter
         */
        email: ComparisonObject<string>;
    };
}

/**
 * Options to use when listing groups
 */
export interface GroupListOptions extends ListOptions {
    /**
     * The group filter
     *
     * Constructed like so:
     *  ```JavaScript
     *  filter: {
     *    name: { $eq: "myGroup" }
     *  }
     *  ```
     */
    filter?: {
        /**
         * Group name filter
         */
        name: ComparisonObject<string>;
    };
}
