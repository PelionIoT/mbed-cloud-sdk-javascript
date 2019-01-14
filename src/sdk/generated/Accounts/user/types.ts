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
    readonly loginProfiles?: Array<any>;

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
    readonly loginProfiles?: Array<any>;

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
