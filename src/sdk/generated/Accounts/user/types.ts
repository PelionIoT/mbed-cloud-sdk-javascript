import { ListOptions } from "../../../../common/interfaces";

export type UserStatusEnum = "ACTIVE" | "ENROLLING" | "INACTIVE" | "INVITED" | "RESET";

export interface UserCreateRequest {
    readonly address?: string;
    readonly email?: string;
    readonly fullName?: string;
    readonly groups?: Array<string>;
    readonly loginProfiles?: Array<any>;
    readonly marketingAccepted?: boolean;
    readonly password?: string;
    readonly phoneNumber?: string;
    readonly termsAccepted?: boolean;
    readonly username?: string;
}

export interface UserUpdateRequest {
    readonly address?: string;
    readonly fullName?: string;
    readonly groups?: Array<string>;
    readonly loginProfiles?: Array<any>;
    readonly marketingAccepted?: boolean;
    readonly phoneNumber?: string;
    readonly termsAccepted?: boolean;
    readonly twoFactorAuthentication?: boolean;
    readonly username?: string;
}

export interface UserListOptions extends ListOptions {
    statusEq?: string;
}
