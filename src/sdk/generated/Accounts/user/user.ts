import { Entity } from "../../../common/entity";
import { LoginHistory } from "../loginHistory/loginHistory";
import { UserStatusEnum } from "./types";

/**
 * User
 */
export interface User extends Entity {
    /**
     * The ID of the account.
     */
    readonly accountId?: string;

    /**
     * Address.
     */
    readonly address?: string;

    /**
     * Creation UTC time RFC3339.
     */
    readonly createdAt?: Date;

    /**
     * A timestamp of the user creation in the storage, in milliseconds.
     */
    readonly creationTime?: number;

    /**
     * The email address.
     */
    readonly email?: string;

    /**
     * A flag indicating whether the user&#39;s email address has been verified or not.
     */
    readonly emailVerified?: boolean;

    /**
     * The full name of the user.
     */
    readonly fullName?: string;

    /**
     * A list of IDs of the groups this user belongs to.
     */
    readonly groups?: Array<string>;

    /**
     * A timestamp of the latest login of the user, in milliseconds.
     */
    readonly lastLoginTime?: number;

    /**
     * Timestamps, succeedings, IP addresses and user agent information of the last five logins of the user, with timestamps in RFC3339 format.
     */
    readonly loginHistory?: Array<LoginHistory>;

    /**
     * A list of login profiles for the user. Specified as the identity providers the user is associated with.
     */
    readonly loginProfiles?: Array<any>;

    /**
     * A flag indicating that receiving marketing information has been accepted.
     */
    readonly marketingAccepted?: boolean;

    /**
     * The password when creating a new user. It will be generated when not present in the request.
     */
    readonly password?: string;

    /**
     * A timestamp of the latest change of the user password, in milliseconds.
     */
    readonly passwordChangedTime?: number;

    /**
     * Phone number.
     */
    readonly phoneNumber?: string;

    /**
     * The status of the user. ENROLLING state indicates that the user is in the middle of the enrollment process. INVITED means that the user has not accepted the invitation request. RESET means that the password must be changed immediately. INACTIVE users are locked out and not permitted to use the system.
     */
    readonly status?: UserStatusEnum;

    /**
     * A flag indicating that the General Terms and Conditions has been accepted.
     */
    readonly termsAccepted?: boolean;

    /**
     * A flag indicating whether 2-factor authentication (TOTP) has been enabled.
     */
    readonly twoFactorAuthentication?: boolean;

    /**
     * Last update UTC time RFC3339.
     */
    readonly updatedAt?: Date;

    /**
     * A username containing alphanumerical letters and -,._@+= characters.
     */
    readonly username?: string;
}
