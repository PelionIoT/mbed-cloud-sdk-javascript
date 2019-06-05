import { ListOptions } from "../../../legacy/common/interfaces";
import { LoginProfile } from "../loginProfile/loginProfile";
export type UserStatus = "ENROLLING" | "INVITED" | "ACTIVE" | "RESET" | "INACTIVE";
/**
 *UserCreateRequest
 */
export interface UserCreateRequest {
    /**
     *Address.
     *@example 110 Fulbourn Rd, Cambridge, United Kingdom
     */
    readonly address?: string;

    /**
     *The email address.
     *@example user@arm.com
     */
    readonly email?: string;

    /**
     *The full name of the user.
     *@example User Doe
     */
    readonly fullName?: string;

    /**
     *A flag indicating that the user has accepted General Terms and Conditions.
     *@example true
     */
    readonly isGtcAccepted?: boolean;

    /**
     *A flag indicating that the user has consented to receive marketing information.
     *@example true
     */
    readonly isMarketingAccepted?: boolean;

    /**
     *Represents a user login profile in Device Management.
     */
    readonly loginProfiles?: Array<LoginProfile>;

    /**
     *The password when creating a new user. It will be generated when not present in the request.
     *@example PZf9eEUH43DAPE9ULINFeuj
     */
    readonly password?: string;

    /**
     *Phone number.
     *@example +44 (1223) 400 400
     */
    readonly phoneNumber?: string;

    /**
     *A username.
     *@example admin
     */
    readonly username?: string;
}
/**
 *UserUpdateRequest
 */
export interface UserUpdateRequest {
    /**
     *Address.
     *@example 110 Fulbourn Rd, Cambridge, United Kingdom
     */
    readonly address?: string;

    /**
     *The full name of the user.
     *@example User Doe
     */
    readonly fullName?: string;

    /**
     *A flag indicating that the user has accepted General Terms and Conditions.
     *@example true
     */
    readonly isGtcAccepted?: boolean;

    /**
     *A flag indicating that the user has consented to receive marketing information.
     *@example true
     */
    readonly isMarketingAccepted?: boolean;

    /**
     *A flag indicating whether two-factor authentication (TOTP) has been enabled.
     *@example true
     */
    readonly isTotpEnabled?: boolean;

    /**
     *Represents a user login profile in Device Management.
     */
    readonly loginProfiles?: Array<LoginProfile>;

    /**
     *Phone number.
     *@example +44 (1223) 400 400
     */
    readonly phoneNumber?: string;

    /**
     *A username.
     *@example admin
     */
    readonly username?: string;
}
/**
 *UserUserEmailFilter
 */
export interface UserUserEmailFilter {
    /**
     *email equal to
     */
    eq?: string;
}
/**
 *UserUserStatusFilter
 */
export interface UserUserStatusFilter {
    /**
     *status equal to
     */
    eq?: UserStatus;

    /**
     *status in
     */
    in?: Array<UserStatus>;

    /**
     *status not in
     */
    nin?: Array<UserStatus>;
}
/**
 *UserUserLoginProfilesFilter
 */
export interface UserUserLoginProfilesFilter {
    /**
     *loginProfiles equal to
     */
    eq?: Array<LoginProfile>;
}
/**
 *UserUserFilter
 */
export interface UserUserFilter {
    /**
     *Filter by email on User
     */
    email?: string | UserUserEmailFilter;

    /**
     *Filter by status on User
     */
    status?: UserStatus | UserUserStatusFilter;

    /**
     *Filter by loginProfiles on User
     */
    loginProfiles?: Array<LoginProfile> | UserUserLoginProfilesFilter;
}
/**
 *UserUserListOptions
 */
export interface UserUserListOptions extends ListOptions {
    /**
     *Filter for User
     */
    filter?: UserUserFilter;
}
