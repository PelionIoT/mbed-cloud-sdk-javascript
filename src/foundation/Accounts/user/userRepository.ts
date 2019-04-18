import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { User } from "./user";
import { UserAdapter } from "../../index";
import { UserCreateRequest } from "./types";
import { extractFilter } from "../../../common/filters";
import { UserListOptions } from "./types";
import { UserUpdateRequest } from "./types";
import { Paginator } from "../../../common/pagination";
import { ListResponse } from "../../../legacy/common/listResponse";
import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *User repository
 */
export class UserRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     * @param action - Action, either `create` or `invite`.
     */
    public create(request: UserCreateRequest, action?: string): Promise<User> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/users",
                        method: "POST",
                        query: {
                            action: action,
                        },
                        body: {
                            address: request.address,
                            email: request.email,
                            full_name: request.fullName,
                            login_profiles: request.loginProfiles,
                            is_marketing_accepted: request.marketingAccepted,
                            password: request.password,
                            phone_number: request.phoneNumber,
                            is_gtc_accepted: request.termsAccepted,
                            username: request.username,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, UserAdapter.fromApi(data, request));
            }
        );
    }
    /**
     * delete
     * @param id - The ID of the user to delete.
     */
    public delete(id: string): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/users/{user_id}",
                        method: "DELETE",
                        pathParams: {
                            user_id: id,
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
    public list(options?: UserListOptions): Paginator<User, ListOptions> {
        const pageFunc = (pageOptions: UserListOptions): Promise<ListResponse<User>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/users",
                            method: "GET",
                            query: {
                                email__eq: extractFilter(pageOptions.filter, "email", "eq"),
                                status__eq: extractFilter(pageOptions.filter, "status", "eq"),
                                status__in: extractFilter(pageOptions.filter, "status", "in"),
                                status__nin: extractFilter(pageOptions.filter, "status", "nin"),
                                login_profile__eq: extractFilter(pageOptions.filter, "loginProfile", "eq"),
                                after: pageOptions.after,
                                include: pageOptions.include,
                                limit: pageOptions.limit,
                                order: pageOptions.order,
                            },
                        },
                        resultsFn
                    );
                },
                (data: ListResponse<User>, done) => {
                    done(null, new ListResponse(data, data.data, UserAdapter.fromApi));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param id - The ID of the user.
     */
    public read(id: string): Promise<User> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/users/{user_id}",
                        method: "GET",
                        pathParams: {
                            user_id: id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, UserAdapter.fromApi(data));
            }
        );
    }
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - The ID of the user.
     */
    public update(request: UserUpdateRequest, id: string): Promise<User> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/users/{user_id}",
                        method: "PUT",
                        pathParams: {
                            user_id: id,
                        },
                        body: {
                            address: request.address,
                            full_name: request.fullName,
                            login_profiles: request.loginProfiles,
                            is_marketing_accepted: request.marketingAccepted,
                            phone_number: request.phoneNumber,
                            is_gtc_accepted: request.termsAccepted,
                            is_totp_enabled: request.twoFactorAuthentication,
                            username: request.username,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, UserAdapter.fromApi(data, request));
            }
        );
    }
}
