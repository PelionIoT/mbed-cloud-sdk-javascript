import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { UserInvitationAdapter } from "../../index";
import { extractFilter } from "../../../common/filters";
import { Paginator } from "../../../common/pagination";
import { ListResponse } from "../../../legacy/common/listResponse";
/**
 *UserInvitation repository
 */
export class UserInvitationRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     */
    create(request) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/user-invitations",
                method: "POST",
                body: {
                    email: request.email,
                    login_profiles: request.loginProfiles,
                    valid_for_days: request.validForDays,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, UserInvitationAdapter.fromApi(data, request));
        });
    }
    /**
     * delete
     * @param id - The ID of the invitation to delete.
     */
    delete(id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/user-invitations/{invitation_id}",
                method: "DELETE",
                pathParams: {
                    invitation_id: id,
                },
            }, resultsFn);
        }, (_data, done) => {
            done(null, null);
        });
    }
    /**
     * list
     * @param options - Options to use for the List
     */
    list(options) {
        const pageFunc = (pageOptions) => {
            pageOptions = pageOptions || {};
            return apiWrapper(resultsFn => {
                this.client._CallApi({
                    url: "/v3/user-invitations",
                    method: "GET",
                    query: {
                        login_profiles__eq: extractFilter(pageOptions.filter, "loginProfiles", "eq"),
                        after: pageOptions.after,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                }, resultsFn);
            }, (data, done) => {
                done(null, new ListResponse(data, data.data, UserInvitationAdapter.fromApi));
            }, null);
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param id - The ID of the invitation.
     */
    read(id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/user-invitations/{invitation_id}",
                method: "GET",
                pathParams: {
                    invitation_id: id,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, UserInvitationAdapter.fromApi(data));
        });
    }
}
//# sourceMappingURL=userInvitationRepository.js.map