import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { SubtenantUserInvitationAdapter } from "../../index";
import { SubtenantUserInvitation } from "./subtenantUserInvitation";
import { SubtenantUserInvitationCreateRequest } from "./types";
/**
 *SubtenantUserInvitation repository
 */
export class SubtenantUserInvitationRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account the user is invited to.
     */
    public create(request: SubtenantUserInvitationCreateRequest, accountId: string): Promise<SubtenantUserInvitation> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/user-invitations",
                        method: "POST",
                        pathParams: {
                            account_id: accountId,
                        },
                        body: {
                            email: request.email,
                            groups: request.groups,
                            login_profiles: request.loginProfiles,
                            valid_for_days: request.validForDays,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, SubtenantUserInvitationAdapter.fromApi(data, request));
            }
        );
    }
    /**
     * delete
     * @param accountId - Account ID.
     * @param id - The ID of the invitation to delete.
     */
    public delete(accountId: string, id: string): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/user-invitations/{invitation_id}",
                        method: "DELETE",
                        pathParams: {
                            account_id: accountId,
                            invitation_id: id,
                        },
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
    /**
     * read
     * @param accountId - The ID of the account the user is invited to.
     * @param id - The ID of the invitation.
     */
    public read(accountId: string, id: string): Promise<SubtenantUserInvitation> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/user-invitations/{invitation_id}",
                        method: "GET",
                        pathParams: {
                            account_id: accountId,
                            invitation_id: id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, SubtenantUserInvitationAdapter.fromApi(data));
            }
        );
    }
}
