import { ListOptions } from "../../../legacy/common/interfaces";
import { LoginProfile } from "../loginProfile/loginProfile";
/**
 *UserInvitationCreateRequest
 */
export interface UserInvitationCreateRequest {
    /**
     *email
     */
    readonly email: string;

    /**
     *loginProfiles
     */
    readonly loginProfiles?: Array<LoginProfile>;

    /**
     *validForDays
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
