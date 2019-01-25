import { LoginProfile } from "../loginProfile/loginProfile";
export type SubtenantUserStatusEnum = "ENROLLING" | "INVITED" | "ACTIVE" | "RESET" | "INACTIVE";
/**
 *SubtenantUserCreateRequest
 */
export interface SubtenantUserCreateRequest {
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
 *SubtenantUserUpdateRequest
 */
export interface SubtenantUserUpdateRequest {
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
