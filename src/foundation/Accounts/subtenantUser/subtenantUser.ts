import { Entity } from "../../../common/entity";
import { ActiveSession } from "../activeSession/activeSession";
import { LoginHistory } from "../loginHistory/loginHistory";
import { LoginProfile } from "../loginProfile/loginProfile";
import { SubtenantUserStatus } from "./types";
/**
 *SubtenantUser
 */
export interface SubtenantUser extends Entity {
    /**
     *The ID of the account.
     *@example 01619571e2e90242ac12000600000000
     */
    accountId: string;

    /**
     *Represents an active user session.
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
     *User's account-specific custom properties. The value is a string.
     */
    readonly customFields?: { [key: string]: string };

    /**
     *The email address.
     *@example user@arm.com
     */
    email: string;

    /**
     *A flag indicating whether the user's email address has been verified or not.
     *@example true
     */
    readonly emailVerified?: boolean;

    /**
     *The full name of the user.
     *@example User Doe
     */
    fullName?: string;

    /**
     *groups
     */
    groups?: Array<string>;

    /**
     *A flag indicating that the user has accepted General Terms and Conditions.
     *@example true
     */
    isGtcAccepted?: boolean;

    /**
     *A flag indicating that the user has consented to receive marketing information.
     *@example true
     */
    isMarketingAccepted?: boolean;

    /**
     *A flag indicating whether two-factor authentication (TOTP) has been enabled.
     *@example true
     */
    isTotpEnabled?: boolean;

    /**
     *A timestamp of the latest login of the user, in milliseconds.
     *@example 1518630727688
     */
    readonly lastLoginTime?: number;

    /**
     *Represents an entry in login history.
     */
    readonly loginHistory?: Array<LoginHistory>;

    /**
     *Represents a user login profile in Device Management.
     */
    loginProfiles?: Array<LoginProfile>;

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
    status?: SubtenantUserStatus;

    /**
     *totpScratchCodes
     */
    readonly totpScratchCodes?: Array<string>;

    /**
     *Last update UTC time RFC3339.
     *@example 2018-02-14T15:24:14Z
     */
    readonly updatedAt?: Date;

    /**
     *A username.
     *@example admin
     */
    username?: string;
}
