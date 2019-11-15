import { ListOptions } from "../../../common";
import { extractFilter } from "../../../common/filters";
import { Repository } from "../../../common/repository";
import { Page, Paginator } from "../../../index";
import { apiWrapper } from "../../../legacy/common/functions";
import { UserAdapter } from "../../index";
import { PolicyGroup } from "../../index";
import { PolicyGroupAdapter } from "../../index";
import { UserCreateRequest } from "./types";
import { UserUpdateRequest } from "./types";
import { UserListOptions } from "./types";
import { User } from "./user";
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
                            action,
                        },
                        body: {
                            address: request.address,
                            email: request.email,
                            full_name: request.fullName,
                            groups: request.groups,
                            is_gtc_accepted: request.isGtcAccepted,
                            is_marketing_accepted: request.isMarketingAccepted,
                            login_profiles: request.loginProfiles,
                            password: request.password,
                            phone_number: request.phoneNumber,
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
        const pageFunc = (pageOptions: UserListOptions): Promise<Page<User>> => {
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
                                login_profiles__eq: extractFilter(pageOptions.filter, "loginProfiles", "eq"),
                                after: pageOptions.after,
                                include: pageOptions.include,
                                limit: pageOptions.limit,
                                order: pageOptions.order,
                            },
                        },
                        resultsFn
                    );
                },
                (data: Page<User>, done) => {
                    done(null, new Page(data, data.data, UserAdapter.fromApi, pageOptions));
                },
                null
            );
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * policyGroups
     * @param id - The ID of the user.
     * @param options - options
     */
    public policyGroups(id: string, options?: ListOptions): Paginator<PolicyGroup, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<Page<PolicyGroup>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/users/{user_id}/groups",
                            method: "GET",
                            query: {
                                after: pageOptions.after,
                                include: pageOptions.include,
                                limit: pageOptions.limit,
                                order: pageOptions.order,
                            },
                            pathParams: {
                                user_id: id,
                            },
                        },
                        resultsFn
                    );
                },
                (data: Page<PolicyGroup>, done) => {
                    done(null, new Page(data, data.data, PolicyGroupAdapter.fromApi, pageOptions));
                },
                null
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
                            groups: request.groups,
                            is_gtc_accepted: request.isGtcAccepted,
                            is_marketing_accepted: request.isMarketingAccepted,
                            is_totp_enabled: request.isTotpEnabled,
                            login_profiles: request.loginProfiles,
                            phone_number: request.phoneNumber,
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
