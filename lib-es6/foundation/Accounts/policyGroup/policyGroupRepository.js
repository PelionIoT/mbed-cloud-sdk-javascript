import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { ApiKeyAdapter } from "../../index";
import { PolicyGroupAdapter } from "../../index";
import { extractFilter } from "../../../common/filters";
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
     * create
     * @param request - The entity to perform action on.
     */
    create(request) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/policy-groups",
                method: "POST",
                body: {
                    members: request.members,
                    name: request.name,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, PolicyGroupAdapter.fromApi(data, request));
        });
    }
    /**
     * delete
     * @param id - The ID of the group to delete.
     */
    delete(id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/policy-groups/{group_id}",
                method: "DELETE",
                pathParams: {
                    group_id: id,
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
     * update
     * @param request - The entity to perform action on.
     * @param id - The ID of the group.
     */
    update(request, id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/policy-groups/{group_id}",
                method: "PUT",
                pathParams: {
                    group_id: id,
                },
                body: {
                    name: request.name,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, PolicyGroupAdapter.fromApi(data, request));
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