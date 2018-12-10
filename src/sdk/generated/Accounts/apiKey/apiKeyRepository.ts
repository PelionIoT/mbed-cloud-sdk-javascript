import { ApiKey } from "./apiKey";
import { ApiKeyCreateRequest, ApiKeyUpdateRequest, ApiKeyListOptions } from "./types";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { apiWrapper } from "../../../../common/functions";
import { Repository } from "../../../common/repository";
import { ApiKeyAdapter } from "./apiKeyAdapter";

export class ApiKeyRepository extends Repository {

    public list(options?: ApiKeyListOptions): Paginator<ApiKey, ApiKeyListOptions> {
        const pageFunc = (pageOptions: ApiKeyListOptions): Promise<ListResponse<ApiKey>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include, keyEq, ownerEq } = pageOptions as ApiKeyListOptions;
                    this.client._CallApi(
                        {
                            url: "/v3/api-keys",
                            method: "GET",
                            query: { after, include, order, limit, keyEq, ownerEq },
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

    public get(id: string): Promise<ApiKey> {
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

    public create(request: ApiKeyCreateRequest): Promise<ApiKey> {
        const body = {
            groups: request.groups,
            name: request.name,
            owner: request.owner,
            status: request.status,
        };
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/api-keys",
                        method: "POST",
                        body: body,
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, ApiKeyAdapter.fromApi(data, request));
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
                this.client._CallApi(
                    {
                        url: "/v3/api-keys/{apikey_id}",
                        method: "PUT",
                        pathParams: {
                            apikey_id: id,
                        },
                        body: body,
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, ApiKeyAdapter.fromApi(data, request));
            }
        );
    }

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
}
