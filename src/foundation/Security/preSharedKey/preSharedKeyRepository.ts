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
     * @param endpointName - The unique endpoint identifier that this pre-shared key applies to. [Reserved characters](https://en.wikipedia.org/wiki/Percent-encoding#Percent-encoding_reserved_characters) must be percent-encoded.
     */
    public delete(endpointName: string): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v2/device-shared-keys/{endpoint_name}",
                        method: "DELETE",
                        pathParams: {
                            endpoint_name: endpointName,
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
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param endpointName - The unique endpoint identifier that this pre-shared key applies to. 16-64 [printable](https://en.wikipedia.org/wiki/ASCII#Printable_characters) (non-control) ASCII characters.
     */
    public read(endpointName: string): Promise<PreSharedKey> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v2/device-shared-keys/{endpoint_name}",
                        method: "GET",
                        pathParams: {
                            endpoint_name: endpointName,
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
