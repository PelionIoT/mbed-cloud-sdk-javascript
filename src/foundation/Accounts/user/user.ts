import { Entity } from "../../../common/entity";
import { ActiveSession } from "../activeSession/activeSession";
import { LoginHistory } from "../loginHistory/loginHistory";
import { LoginProfile } from "../loginProfile/loginProfile";
import { UserStatus } from "./types";
/**
 *User
 */
export interface User extends Entity {
    /**
     *The ID of the account.
     *@example 01619571e2e90242ac12000600000000
     */
    readonly accountId?: string;

    /**
     *This object represents an active user session.
     */
    readonly activeSessions?: Array<ActiveSession>;

    /**
     *Address.
     *@example 110 Fulbourn Rd, Cambridge, United Kingdom
     */
    address?: string;

    /**
     *Creation UTC time RFC3339.
     *@example 2018-02-13T09:35:20Z
     */
    readonly createdAt?: Date;

    /**
     *A timestamp of the user creation in the storage, in milliseconds.
     *@example 1518630727683
     */
    readonly creationTime?: number;

    /**
     *User&#39;s account specific custom properties. The value is a string.
     */
    readonly customFields?: { [key: string]: string };

    /**
     *The email address.
     *@example user@arm.com
     */
    email: string;

    /**
     *A flag indicating whether the user&#39;s email address has been verified or not.
     *@example true
     */
    readonly emailVerified?: boolean;

    /**
     *The full name of the user.
     *@example User Doe
     */
    fullName?: string;

    /**
     *A timestamp of the latest login of the user, in milliseconds.
     *@example 1518630727688
     */
    readonly lastLoginTime?: number;

    /**
     *This object represents an entry in login history.
     */
    readonly loginHistory?: Array<LoginHistory>;

    /**
     *This object represents a user login profile in Device Management.
     */
    loginProfiles?: Array<LoginProfile>;

    /**
     *A flag indicating that receiving marketing information has been accepted.
     *@example true
     */
    marketingAccepted?: boolean;

    /**
     *The password when creating a new user. It will be generated when not present in the request.
     *@example PZf9eEUH43DAPE9ULINFeuj
     */
    password?: string;

    /**
     *A timestamp of the latest change of the user password, in milliseconds.
     *@example 1518630727688
     */
    readonly passwordChangedTime?: number;

    /**
     *Phone number.
     *@example +44 (1223) 400 400
     */
    phoneNumber?: string;

    /**
     *The status of the user. ENROLLING state indicates that the user is in the middle of the enrollment process. INVITED means that the user has not accepted the invitation request. RESET means that the password must be changed immediately. INACTIVE users are locked out and not permitted to use the system.
     *@example ACTIVE
     */
    status?: UserStatus;

    /**
     *A flag indicating that the General Terms and Conditions has been accepted.
     *@example true
     */
    termsAccepted?: boolean;

    /**
     *totpScratchCodes
     */
    readonly totpScratchCodes?: Array<string>;

    /**
     *A flag indicating whether 2-factor authentication (TOTP) has been enabled.
     *@example true
     */
    twoFactorAuthentication?: boolean;

    /**
     *Last update UTC time RFC3339.
     *@example 2018-02-14T15:24:14Z
     */
    readonly updatedAt?: Date;

    /**
     *A username containing alphanumerical letters and -,._@+= characters.
     *@example admin
     */
    username?: string;
}
