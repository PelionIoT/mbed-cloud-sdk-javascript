import { ApiKey } from "./apiKey";
import { ApiKeyCreateRequest, ApiKeyUpdateRequest, ApiKeyListOptions } from "./types";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { apiWrapper } from "../../../../common/functions";
import { Repository } from "../../../common/repository";

export class ApiKeyRepository extends Repository {

    public list(options?: ApiKeyListOptions): Paginator<ApiKey, ApiKeyListOptions> {
        const pageFunc = (pageOptions: ApiKeyListOptions): Promise<ListResponse<ApiKey>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include, keyEq, ownerEq } = pageOptions as ApiKeyListOptions;
                    this.client._CallApi<ApiKey>(
                        {
                            url: "/v3/api-keys",
                            method: "GET",
                            query: { after, include, order, limit, keyEq, ownerEq },
                            paginated: true,
                        },
                        undefined,
                        resultsFn
                    );
                },
                (data: ListResponse<ApiKey>, done) => {
                    done(null, new ListResponse(data, data.data));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }

    public get(id: string): Promise<ApiKey> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<ApiKey>(
                    {
                        url: "/v3/api-keys/{apikey_id}",
                        method: "GET",
                        pathParams: {
                            apikey_id: id,
                        },
                    },
                    undefined,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    public delete(id: string): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<ApiKey>(
                    {
                        url: "/v3/api-keys/{apikey_id}",
                        method: "DELETE",
                        pathParams: {
                            apikey_id: id,
                        },
                    },
                    undefined,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    public create(request: ApiKeyCreateRequest): Promise<ApiKey> {
        const body = {
            groups: request.groups,
            name: request.name,
            owner: request.owner,
            status: request.status,
        };
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<ApiKey>(
                    {
                        url: "/v3/api-keys",
                        method: "POST",
                        body: body,
                    },
                    undefined,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    public update(id: string, request: ApiKeyUpdateRequest): Promise<ApiKey> {
        const body = {
            groups: request.groups,
            name: request.name,
            owner: request.owner,
            status: request.status,
        };
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<ApiKey>(
                    {
                        url: "/v3/api-keys/{apikey_id}",
                        method: "PUT",
                        pathParams: {
                            apikey_id: id,
                        },
                        body: body,
                    },
                    undefined,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    public me(): Promise<ApiKey> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<ApiKey>(
                    {
                        url: "/v3/api-keys/me",
                        method: "GET",
                    },
                    undefined,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }
}
