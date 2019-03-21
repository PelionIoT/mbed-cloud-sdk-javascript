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
     *Specifies how many days the invitation will be valid for. The default is 30 days. Value should be between 1 and 100 days.
     */
    readonly validForDays?: number;
}
/**
 *UserInvitationLoginProfileFilter
 */
export interface UserInvitationLoginProfileFilter {
    /**
     *eq
     */
    eq?: string;
}
/**
 *UserInvitationFilter
 */
export interface UserInvitationFilter {
    /**
     *loginProfile
     */
    loginProfile?: string | UserInvitationLoginProfileFilter;
}
/**
 *UserInvitationListOptions
 */
export interface UserInvitationListOptions extends ListOptions {
    /**
     *filter
     */
    filter?: UserInvitationFilter;
}
