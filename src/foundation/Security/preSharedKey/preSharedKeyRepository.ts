import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { PreSharedKey } from "./preSharedKey";
import { PreSharedKeyAdapter } from "../../index";
import { PreSharedKeyCreateRequest } from "./types";
import { Paginator } from "../../../common/pagination";
import { ListResponse } from "../../../legacy/common/listResponse";
import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *PreSharedKey repository
 */
export class PreSharedKeyRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     */
    public create(request: PreSharedKeyCreateRequest): Promise<PreSharedKey> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v2/device-shared-keys",
                        method: "POST",
                        body: {
                            endpoint_name: request.endpointName,
                            secret_hex: request.secretHex,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, PreSharedKeyAdapter.fromApi(data, request));
            }
        );
    }
    /**
     * delete
     * @param id - The Id of the pre_shared_key, shadows the endpoint_name
     */
    public delete(id: string): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v2/device-shared-keys/{endpoint_name}",
                        method: "DELETE",
                        pathParams: {
                            endpoint_name: id,
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
     * @param options - options
     */
    public list(options?: ListOptions): Paginator<PreSharedKey, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<PreSharedKey>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v2/device-shared-keys",
                            method: "GET",
                            query: {
                                after: pageOptions.after,
                                limit: pageOptions.limit,
                            },
                        },
                        resultsFn
                    );
                },
                (data: ListResponse<PreSharedKey>, done) => {
                    done(null, new ListResponse(data, data.data, PreSharedKeyAdapter.fromApi));
                },
                null
            );
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param id - The Id of the pre_shared_key, shadows the endpoint_name
     */
    public read(id: string): Promise<PreSharedKey> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v2/device-shared-keys/{endpoint_name}",
                        method: "GET",
                        pathParams: {
                            endpoint_name: id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, PreSharedKeyAdapter.fromApi(data));
            }
        );
    }
}
