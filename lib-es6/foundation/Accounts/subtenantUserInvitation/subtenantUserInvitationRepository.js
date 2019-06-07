import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { SubtenantUserInvitationAdapter } from "../../index";
/**
 *SubtenantUserInvitation repository
 */
export class SubtenantUserInvitationRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account the user is invited to.
     */
    create(request, accountId) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
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
            }, resultsFn);
        }, (data, done) => {
            done(null, SubtenantUserInvitationAdapter.fromApi(data, request));
        });
    }
    /**
     * delete
     * @param accountId - Account ID.
     * @param id - The ID of the invitation to delete.
     */
    delete(accountId, id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/accounts/{account_id}/user-invitations/{invitation_id}",
                method: "DELETE",
                pathParams: {
                    account_id: accountId,
                    invitation_id: id,
                },
            }, resultsFn);
        }, (_data, done) => {
            done(null, null);
        });
    }
    /**
     * read
     * @param accountId - The ID of the account the user is invited to.
     * @param id - The ID of the invitation.
     */
    read(accountId, id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/accounts/{account_id}/user-invitations/{invitation_id}",
                method: "GET",
                pathParams: {
                    account_id: accountId,
                    invitation_id: id,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, SubtenantUserInvitationAdapter.fromApi(data));
        });
    }
}
//# sourceMappingURL=subtenantUserInvitationRepository.js.map