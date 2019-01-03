import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../common/functions";
import { SubtenantUserInvitation } from "./subtenantUserInvitation";
import { SubtenantUserInvitationCreateRequest } from "./types";
/**
 *SubtenantUserInvitation repository
 */
export class SubtenantUserInvitationRepository extends Repository {
    public create(request: SubtenantUserInvitationCreateRequest, accountId: string): Promise<SubtenantUserInvitation> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/user-invitations",
                        method: "POST",
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
    public delete(accountId: string, id: string): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/user-invitations/{invitation_id}",
                        method: "DELETE",
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
    public get(accountId: string, id: string): Promise<SubtenantUserInvitation> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/user-invitations/{invitation_id}",
                        method: "GET",
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
}
