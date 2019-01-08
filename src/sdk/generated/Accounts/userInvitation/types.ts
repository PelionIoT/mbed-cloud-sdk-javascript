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
    readonly loginProfiles?: Array<any>;

    /**
     *validForDays
     */
    readonly validForDays?: number;
}
