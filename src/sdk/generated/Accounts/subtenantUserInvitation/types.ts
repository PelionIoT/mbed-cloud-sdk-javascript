/**
 *SubtenantUserInvitationCreateRequest
 */
export interface SubtenantUserInvitationCreateRequest {
    /**
     *email
     */
    readonly email?: string;

    /**
     *loginProfiles
     */
    readonly loginProfiles?: Array<any>;

    /**
     *validForDays
     */
    readonly validForDays?: number;
}
