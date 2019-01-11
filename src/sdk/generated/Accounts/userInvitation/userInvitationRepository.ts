import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../common/functions";
import { UserInvitation } from "./userInvitation";
import { UserInvitationAdapter } from "../../index";
import { UserInvitationCreateRequest } from "./types";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { ListOptions } from "../../../../common/interfaces";
/**
 *UserInvitation Repository
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
    public get(id: string): Promise<UserInvitation> {
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
    public list(options?: ListOptions): Paginator<UserInvitation, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<UserInvitation>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/user-invitations",
                            method: "GET",
                            query: {
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
}
