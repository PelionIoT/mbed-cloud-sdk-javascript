import { ListOptions } from "../../../legacy/common/interfaces";
import { LoginProfile } from "../loginProfile/loginProfile";
export type UserStatusEnum = "ENROLLING" | "INVITED" | "ACTIVE" | "RESET" | "INACTIVE";
/**
 *UserCreateRequest
 */
export interface UserCreateRequest {
    /**
     *address
     */
    readonly address?: string;

    /**
     *email
     */
    readonly email?: string;

    /**
     *fullName
     */
    readonly fullName?: string;

    /**
     *loginProfiles
     */
    readonly loginProfiles?: Array<LoginProfile>;

    /**
     *marketingAccepted
     */
    readonly marketingAccepted?: boolean;

    /**
     *password
     */
    readonly password?: string;

    /**
     *phoneNumber
     */
    readonly phoneNumber?: string;

    /**
     *termsAccepted
     */
    readonly termsAccepted?: boolean;

    /**
     *username
     */
    readonly username?: string;
}
/**
 *UserUpdateRequest
 */
export interface UserUpdateRequest {
    /**
     *address
     */
    readonly address?: string;

    /**
     *fullName
     */
    readonly fullName?: string;

    /**
     *loginProfiles
     */
    readonly loginProfiles?: Array<LoginProfile>;

    /**
     *marketingAccepted
     */
    readonly marketingAccepted?: boolean;

    /**
     *phoneNumber
     */
    readonly phoneNumber?: string;

    /**
     *termsAccepted
     */
    readonly termsAccepted?: boolean;

    /**
     *twoFactorAuthentication
     */
    readonly twoFactorAuthentication?: boolean;

    /**
     *username
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
    eq?: UserStatusEnum;

    /**
     *in
     */
    in?: Array<UserStatusEnum>;

    /**
     *nin
     */
    nin?: Array<UserStatusEnum>;
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
    email?: UserEmailFilter;

    /**
     *status
     */
    status?: UserStatusFilter;

    /**
     *login_profile
     */
    login_profile?: UserLoginProfileFilter;
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
