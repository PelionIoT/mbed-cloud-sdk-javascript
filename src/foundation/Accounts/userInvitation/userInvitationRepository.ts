import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { UserInvitation } from "./userInvitation";
import { UserInvitationAdapter } from "../../index";
import { UserInvitationCreateRequest } from "./types";
import { extractFilter } from "../../../common/filters";
import { UserInvitationListOptions } from "./types";
import { Paginator } from "../../../common/pagination";
import { ListResponse } from "../../../legacy/common/listResponse";
import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *UserInvitation repository
 */
export class UserInvitationRepository extends Repository {
    public create(request: UserInvitationCreateRequest): Promise<UserInvitation> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/user-invitations",
                        method: "POST",
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
                done(null, UserInvitationAdapter.fromApi(data, request));
            }
        );
    }
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
    public list(options?: UserInvitationListOptions): Paginator<UserInvitation, ListOptions> {
        const pageFunc = (pageOptions: UserInvitationListOptions): Promise<ListResponse<UserInvitation>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/user-invitations",
                            method: "GET",
                            query: {
                                login_profile__eq: extractFilter(pageOptions.filter, "login_profile", "eq"),
                                after: pageOptions.after,
                                limit: pageOptions.limit,
                                order: pageOptions.order,
                            },
                        },
                        resultsFn
                    );
                },
                (data: ListResponse<UserInvitation>, done) => {
                    done(null, new ListResponse(data, data.data, UserInvitationAdapter.fromApi));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }
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
