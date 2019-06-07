import { LoginProfile } from "../loginProfile/loginProfile";
/**
 *SubtenantUserInvitationCreateRequest
 */
export interface SubtenantUserInvitationCreateRequest {
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
