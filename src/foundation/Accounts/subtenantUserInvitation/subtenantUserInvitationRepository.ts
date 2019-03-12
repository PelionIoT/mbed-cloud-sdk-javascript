import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { SubtenantUserInvitation } from "./subtenantUserInvitation";
import { SubtenantUserInvitationAdapter } from "../../index";
import { SubtenantUserInvitationCreateRequest } from "./types";
/**
 *SubtenantUserInvitation repository
 */
export class SubtenantUserInvitationRepository extends Repository {
    /**
     * create
     * @returns Promise<SubtenantUserInvitation>
     * @param request *required*
     * @param accountId *required*
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
     * @returns Promise<void>
     * @param accountId *required*
     * @param id *required*
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
     * @returns Promise<SubtenantUserInvitation>
     * @param accountId *required*
     * @param id *required*
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
