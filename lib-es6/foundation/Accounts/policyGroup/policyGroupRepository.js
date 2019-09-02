import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { ApiKeyAdapter } from "../../index";
import { extractFilter } from "../../../common/filters";
import { PolicyGroupAdapter } from "../../index";
import { UserAdapter } from "../../index";
import { Paginator, Page } from "../../../index";
/**
 *PolicyGroup repository
 */
export class PolicyGroupRepository extends Repository {
    /**
     * apiKeys
     * @param id - The ID of the group.
     * @param options - options
     */
    apiKeys(id, options) {
        const pageFunc = (pageOptions) => {
            pageOptions = pageOptions || {};
            return apiWrapper(resultsFn => {
                this.client._CallApi({
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
                }, resultsFn);
            }, (data, done) => {
                done(null, new Page(data, data.data, ApiKeyAdapter.fromApi, pageOptions));
            }, null);
        };
        return new Paginator(pageFunc, options);
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
                    url: "/v3/policy-groups",
                    method: "GET",
                    query: {
                        name__eq: extractFilter(pageOptions.filter, "name", "eq"),
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                }, resultsFn);
            }, (data, done) => {
                done(null, new Page(data, data.data, PolicyGroupAdapter.fromApi, pageOptions));
            }, null);
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param id - The ID of the group.
     */
    read(id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/policy-groups/{group_id}",
                method: "GET",
                pathParams: {
                    group_id: id,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, PolicyGroupAdapter.fromApi(data));
        });
    }
    /**
     * users
     * @param id - The ID of the group.
     * @param options - Options to use for the List
     */
    users(id, options) {
        const pageFunc = (pageOptions) => {
            pageOptions = pageOptions || {};
            return apiWrapper(resultsFn => {
                this.client._CallApi({
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
                }, resultsFn);
            }, (data, done) => {
                done(null, new Page(data, data.data, UserAdapter.fromApi, pageOptions));
            }, null);
        };
        return new Paginator(pageFunc, options);
    }
}
//# sourceMappingURL=policyGroupRepository.js.map