import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { ApiKey } from "./apiKey";
import { ApiKeyAdapter } from "../../index";
import { ApiKeyCreateRequest } from "./types";
import { extractFilter } from "../../../common/filters";
import { ApiKeyListOptions } from "./types";
import { ApiKeyUpdateRequest } from "./types";
import { Paginator } from "../../../common/pagination";
import { ListResponse } from "../../../legacy/common/listResponse";
import { ListOptions } from "../../../legacy/common/interfaces";
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
        const pageFunc = (pageOptions: ApiKeyListOptions): Promise<ListResponse<ApiKey>> => {
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
                (data: ListResponse<ApiKey>, done) => {
                    done(null, new ListResponse(data, data.data, ApiKeyAdapter.fromApi));
                },
                null,
                true
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
