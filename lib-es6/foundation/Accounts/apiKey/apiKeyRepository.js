import { extractFilter } from "../../../common/filters";
import { Repository } from "../../../common/repository";
import { Page, Paginator } from "../../../index";
import { apiWrapper } from "../../../legacy/common/functions";
import { ApiKeyAdapter } from "../../index";
import { PolicyGroupAdapter } from "../../index";
/**
 *ApiKey repository
 */
export class ApiKeyRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     */
    create(request) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/api-keys",
                method: "POST",
                body: {
                    groups: request.groups,
                    name: request.name,
                    owner: request.owner,
                    status: request.status,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, ApiKeyAdapter.fromApi(data, request));
        });
    }
    /**
     * delete
     * @param id - The ID of the API key to delete.
     */
    delete(id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/api-keys/{apikey_id}",
                method: "DELETE",
                pathParams: {
                    apikey_id: id,
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
                    url: "/v3/api-keys",
                    method: "GET",
                    query: {
                        key__eq: extractFilter(pageOptions.filter, "key", "eq"),
                        owner__eq: extractFilter(pageOptions.filter, "owner", "eq"),
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                }, resultsFn);
            }, (data, done) => {
                done(null, new Page(data, data.data, ApiKeyAdapter.fromApi, pageOptions));
            }, null);
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * me
     */
    me() {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/api-keys/me",
                method: "GET",
            }, resultsFn);
        }, (data, done) => {
            done(null, ApiKeyAdapter.fromApi(data));
        });
    }
    /**
     * policyGroups
     * @param id - The ID of the API key.
     * @param options - options
     */
    policyGroups(id, options) {
        const pageFunc = (pageOptions) => {
            pageOptions = pageOptions || {};
            return apiWrapper(resultsFn => {
                this.client._CallApi({
                    url: "/v3/api-keys/{apikey_id}/groups",
                    method: "GET",
                    query: {
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                    pathParams: {
                        apikey_id: id,
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
     * @param id - The ID of the API key.
     */
    read(id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/api-keys/{apikey_id}",
                method: "GET",
                pathParams: {
                    apikey_id: id,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, ApiKeyAdapter.fromApi(data));
        });
    }
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - The ID of the API key.
     */
    update(request, id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/api-keys/{apikey_id}",
                method: "PUT",
                pathParams: {
                    apikey_id: id,
                },
                body: {
                    groups: request.groups,
                    name: request.name,
                    owner: request.owner,
                    status: request.status,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, ApiKeyAdapter.fromApi(data, request));
        });
    }
}
//# sourceMappingURL=apiKeyRepository.js.map