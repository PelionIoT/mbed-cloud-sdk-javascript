import { LoginProfile } from "../loginProfile/loginProfile";
/**
 *SubtenantUserInvitationCreateRequest
 */
export interface SubtenantUserInvitationCreateRequest {
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
