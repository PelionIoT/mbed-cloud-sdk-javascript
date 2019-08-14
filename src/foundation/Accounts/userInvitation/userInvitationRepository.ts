import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { UserInvitation } from "./userInvitation";
import { UserInvitationAdapter } from "../../index";
import { UserInvitationCreateRequest } from "./types";
import { extractFilter } from "../../../common/filters";
import { UserInvitationListOptions } from "./types";
import { Paginator, Page } from "../../../index";
import { ListOptions } from "../../../common";
/**
 *UserInvitation repository
 */
export class UserInvitationRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     */
    public create(request: UserInvitationCreateRequest): Promise<UserInvitation> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/user-invitations",
                        method: "POST",
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
                done(null, UserInvitationAdapter.fromApi(data, request));
            }
        );
    }
    /**
     * delete
     * @param id - The ID of the invitation to delete.
     */
    public delete(id: string): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/user-invitations/{invitation_id}",
                        method: "DELETE",
                        pathParams: {
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
     * list
     * @param options - Options to use for the List
     */
    public list(options?: UserInvitationListOptions): Paginator<UserInvitation, ListOptions> {
        const pageFunc = (pageOptions: UserInvitationListOptions): Promise<Page<UserInvitation>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/user-invitations",
                            method: "GET",
                            query: {
                                login_profiles__eq: extractFilter(pageOptions.filter, "loginProfiles", "eq"),
                                after: pageOptions.after,
                                limit: pageOptions.limit,
                                order: pageOptions.order,
                            },
                        },
                        resultsFn
                    );
                },
                (data: Page<UserInvitation>, done) => {
                    done(null, new Page(data, data.data, UserInvitationAdapter.fromApi, pageOptions));
                },
                null
            );
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param id - The ID of the invitation.
     */
    public read(id: string): Promise<UserInvitation> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/user-invitations/{invitation_id}",
                        method: "GET",
                        pathParams: {
                            invitation_id: id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, UserInvitationAdapter.fromApi(data));
            }
        );
    }
}
