import { ListOptions } from "../../../common";
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
     *groups
     */
    readonly groups?: Array<string>;

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
 *UserInvitationLoginProfilesFilter
 */
export interface UserInvitationLoginProfilesFilter {
    /**
     *loginProfiles equal to
     */
    eq?: Array<LoginProfile>;
}
/**
 *UserInvitationFilter
 */
export interface UserInvitationFilter {
    /**
     *Filter by loginProfiles on UserInvitation
     */
    loginProfiles?: Array<LoginProfile> | UserInvitationLoginProfilesFilter;
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
