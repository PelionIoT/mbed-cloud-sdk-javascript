import { ListOptions } from "../../../legacy/common/interfaces";
import { LoginProfile } from "../loginProfile/loginProfile";
/**
 *UserInvitationCreateRequest
 */
export interface UserInvitationCreateRequest {
    /**
     *Email address of the invited user.
     *@example friend@arm.com
     */
    readonly email: string;

    /**
     *This object represents a user login profile in Device Management.
     */
    readonly loginProfiles?: Array<LoginProfile>;

    /**
     *Specifies how many days the invitation will be valid for.
     */
    readonly validForDays?: number;
}
/**
 *UserInvitationLoginProfileFilter
 */
export interface UserInvitationLoginProfileFilter {
    /**
     *loginProfile equal to
     */
    eq?: string;
}
/**
 *UserInvitationFilter
 */
export interface UserInvitationFilter {
    /**
     *Filter by loginProfile on UserInvitation
     */
    loginProfile?: string | UserInvitationLoginProfileFilter;
}
/**
 *UserInvitationListOptions
 */
export interface UserInvitationListOptions extends ListOptions {
    /**
     *Filter for UserInvitation
     */
    filter?: UserInvitationFilter;
}
