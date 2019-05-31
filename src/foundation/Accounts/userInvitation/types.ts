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
     *Represents a user login profile in Device Management.
     */
    readonly loginProfiles?: Array<LoginProfile>;

    /**
     *Specifies how many days the invitation will be valid for.
     */
    readonly validForDays?: number;
}
/**
 *UserInvitationUserInvitationLoginProfilesFilter
 */
export interface UserInvitationUserInvitationLoginProfilesFilter {
    /**
     *loginProfiles equal to
     */
    eq?: Array<LoginProfile>;
}
/**
 *UserInvitationUserInvitationFilter
 */
export interface UserInvitationUserInvitationFilter {
    /**
     *Filter by loginProfiles on UserInvitation
     */
    loginProfiles?: Array<LoginProfile> | UserInvitationUserInvitationLoginProfilesFilter;
}
/**
 *UserInvitationUserInvitationListOptions
 */
export interface UserInvitationUserInvitationListOptions extends ListOptions {
    /**
     *Filter for UserInvitation
     */
    filter?: UserInvitationUserInvitationFilter;
}
