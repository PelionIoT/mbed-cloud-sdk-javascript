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
     *This object represents a user login profile in Device Management.
     */
    readonly loginProfiles?: Array<LoginProfile>;

    /**
     *A flag indicating that receiving marketing information has been accepted.
     *@example true
     */
    readonly marketingAccepted?: boolean;

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
     *A flag indicating that the General Terms and Conditions has been accepted.
     *@example true
     */
    readonly termsAccepted?: boolean;

    /**
     *A username containing alphanumerical letters and -,._@+= characters.
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
     *This object represents a user login profile in Device Management.
     */
    readonly loginProfiles?: Array<LoginProfile>;

    /**
     *A flag indicating that receiving marketing information has been accepted.
     *@example true
     */
    readonly marketingAccepted?: boolean;

    /**
     *Phone number.
     *@example +44 (1223) 400 400
     */
    readonly phoneNumber?: string;

    /**
     *A flag indicating that the General Terms and Conditions has been accepted.
     *@example true
     */
    readonly termsAccepted?: boolean;

    /**
     *A flag indicating whether 2-factor authentication (TOTP) has been enabled.
     *@example true
     */
    readonly twoFactorAuthentication?: boolean;

    /**
     *A username containing alphanumerical letters and -,._@+= characters.
     *@example admin
     */
    readonly username?: string;
}
/**
 *UserEmailFilter
 */
export interface UserEmailFilter {
    /**
     *eq
     */
    eq?: string;
}
/**
 *UserStatusFilter
 */
export interface UserStatusFilter {
    /**
     *eq
     */
    eq?: UserStatus;

    /**
     *in
     */
    in?: Array<UserStatus>;

    /**
     *nin
     */
    nin?: Array<UserStatus>;
}
/**
 *UserLoginProfileFilter
 */
export interface UserLoginProfileFilter {
    /**
     *eq
     */
    eq?: string;
}
/**
 *UserFilter
 */
export interface UserFilter {
    /**
     *email
     */
    email?: string | UserEmailFilter;

    /**
     *status
     */
    status?: UserStatus | UserStatusFilter;

    /**
     *loginProfile
     */
    loginProfile?: string | UserLoginProfileFilter;
}
/**
 *UserListOptions
 */
export interface UserListOptions extends ListOptions {
    /**
     *filter
     */
    filter?: UserFilter;
}
