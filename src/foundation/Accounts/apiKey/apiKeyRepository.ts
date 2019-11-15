import { ListOptions } from "../../../common";
import { extractFilter } from "../../../common/filters";
import { Repository } from "../../../common/repository";
import { Page, Paginator } from "../../../index";
import { apiWrapper } from "../../../legacy/common/functions";
import { ApiKeyAdapter } from "../../index";
import { PolicyGroup } from "../../index";
import { PolicyGroupAdapter } from "../../index";
import { ApiKey } from "./apiKey";
import { ApiKeyCreateRequest } from "./types";
import { ApiKeyUpdateRequest } from "./types";
import { ApiKeyListOptions } from "./types";
/**
 *ApiKey repository
 */
export class ApiKeyRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     */
    public create(request: ApiKeyCreateRequest): Promise<ApiKey> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/api-keys",
                        method: "POST",
                        body: {
                            groups: request.groups,
                            name: request.name,
                            owner: request.owner,
                            status: request.status,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, ApiKeyAdapter.fromApi(data, request));
            }
        );
    }
    /**
     * delete
     * @param id - The ID of the API key to delete.
     */
    public delete(id: string): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/api-keys/{apikey_id}",
                        method: "DELETE",
                        pathParams: {
                            apikey_id: id,
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
    public list(options?: ApiKeyListOptions): Paginator<ApiKey, ListOptions> {
        const pageFunc = (pageOptions: ApiKeyListOptions): Promise<Page<ApiKey>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
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
     * me
     */
    public me(): Promise<ApiKey> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/api-keys/me",
                        method: "GET",
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, ApiKeyAdapter.fromApi(data));
            }
        );
    }
    /**
     * policyGroups
     * @param id - The ID of the API key.
     * @param options - options
     */
    public policyGroups(id: string, options?: ListOptions): Paginator<PolicyGroup, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<Page<PolicyGroup>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
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
     * @param id - The ID of the API key.
     */
    public read(id: string): Promise<ApiKey> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/api-keys/{apikey_id}",
                        method: "GET",
                        pathParams: {
                            apikey_id: id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, ApiKeyAdapter.fromApi(data));
            }
        );
    }
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - The ID of the API key.
     */
    public update(request: ApiKeyUpdateRequest, id: string): Promise<ApiKey> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
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
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, ApiKeyAdapter.fromApi(data, request));
            }
        );
    }
}
