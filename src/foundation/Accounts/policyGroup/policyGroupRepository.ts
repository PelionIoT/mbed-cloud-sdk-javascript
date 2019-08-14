import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { PolicyGroup } from "./policyGroup";
import { ApiKey } from "../../index";
import { ApiKeyAdapter } from "../../index";
import { extractFilter } from "../../../common/filters";
import { PolicyGroupListOptions } from "./types";
import { PolicyGroupAdapter } from "../../index";
import { User } from "../../index";
import { UserAdapter } from "../../index";
import { PolicyGroupUserListOptions } from "./types";
import { Paginator, Page } from "../../../index";
import { ListOptions } from "../../../common";
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
