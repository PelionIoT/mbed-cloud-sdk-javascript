import { ListOptions } from "../../../common";
import { extractFilter } from "../../../common/filters";
import { Repository } from "../../../common/repository";
import { Page, Paginator } from "../../../index";
import { apiWrapper } from "../../../legacy/common/functions";
import { ApiKeyAdapter } from "../../index";
import { PolicyGroupAdapter } from "../../index";
import { ApiKey } from "../../index";
import { UserAdapter } from "../../index";
import { User } from "../../index";
import { PolicyGroup } from "./policyGroup";
import { PolicyGroupUpdateRequest } from "./types";
import { PolicyGroupUserListOptions } from "./types";
import { PolicyGroupCreateRequest } from "./types";
import { PolicyGroupListOptions } from "./types";
/**
 *PolicyGroup repository
 */
export class PolicyGroupRepository extends Repository {
    /**
     * apiKeys
     * @param id - The ID of the group.
     * @param options - options
     */
    public apiKeys(id: string, options?: ListOptions): Paginator<ApiKey, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<Page<ApiKey>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/policy-groups/{group_id}/api-keys",
                            method: "GET",
                            query: {
                                after: pageOptions.after,
                                include: pageOptions.include,
                                limit: pageOptions.limit,
                                order: pageOptions.order,
                            },
                            pathParams: {
                                group_id: id,
                            },
                        },
                        resultsFn
                    );
                },
                (data: Page<ApiKey>, done) => {
                    done(null, new Page(data, data.data, ApiKeyAdapter.fromApi, pageOptions));
                },
                null
            );
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * create
     * @param request - The entity to perform action on.
     */
    public create(request: PolicyGroupCreateRequest): Promise<PolicyGroup> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/policy-groups",
                        method: "POST",
                        body: {
                            members: request.members,
                            name: request.name,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, PolicyGroupAdapter.fromApi(data, request));
            }
        );
    }
    /**
     * delete
     * @param id - The ID of the group to delete.
     */
    public delete(id: string): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/policy-groups/{group_id}",
                        method: "DELETE",
                        pathParams: {
                            group_id: id,
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
    public list(options?: PolicyGroupListOptions): Paginator<PolicyGroup, ListOptions> {
        const pageFunc = (pageOptions: PolicyGroupListOptions): Promise<Page<PolicyGroup>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/policy-groups",
                            method: "GET",
                            query: {
                                name__eq: extractFilter(pageOptions.filter, "name", "eq"),
                                after: pageOptions.after,
                                include: pageOptions.include,
                                limit: pageOptions.limit,
                                order: pageOptions.order,
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
     * @param id - The ID of the group.
     */
    public read(id: string): Promise<PolicyGroup> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/policy-groups/{group_id}",
                        method: "GET",
                        pathParams: {
                            group_id: id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, PolicyGroupAdapter.fromApi(data));
            }
        );
    }
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - The ID of the group.
     */
    public update(request: PolicyGroupUpdateRequest, id: string): Promise<PolicyGroup> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/policy-groups/{group_id}",
                        method: "PUT",
                        pathParams: {
                            group_id: id,
                        },
                        body: {
                            name: request.name,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, PolicyGroupAdapter.fromApi(data, request));
            }
        );
    }
    /**
     * users
     * @param id - The ID of the group.
     * @param options - Options to use for the List
     */
    public users(id: string, options?: PolicyGroupUserListOptions): Paginator<User, ListOptions> {
        const pageFunc = (pageOptions: PolicyGroupUserListOptions): Promise<Page<User>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/policy-groups/{group_id}/users",
                            method: "GET",
                            query: {
                                status__eq: extractFilter(pageOptions.filter, "status", "eq"),
                                status__in: extractFilter(pageOptions.filter, "status", "in"),
                                status__nin: extractFilter(pageOptions.filter, "status", "nin"),
                                after: pageOptions.after,
                                include: pageOptions.include,
                                limit: pageOptions.limit,
                                order: pageOptions.order,
                            },
                            pathParams: {
                                group_id: id,
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
}
