import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { DarkThemeColor } from "./darkThemeColor";
import { DarkThemeColorAdapter } from "../../index";
import { DarkThemeColorUpdateRequest } from "./types";
import { Paginator } from "../../../common/pagination";
import { ListResponse } from "../../../legacy/common/listResponse";
import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *DarkThemeColor repository
 */
export class DarkThemeColorRepository extends Repository {
    /**
     * delete
     * @param reference - Color name.
     */
    public delete(reference: string): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/branding-colors/dark/{reference}",
                        method: "DELETE",
                        pathParams: {
                            reference: reference,
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
    public list(options?: ListOptions): Paginator<DarkThemeColor, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<DarkThemeColor>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/branding-colors/dark",
                            method: "GET",
                        },
                        resultsFn
                    );
                },
                (data: ListResponse<DarkThemeColor>, done) => {
                    done(null, new ListResponse(data, data.data, DarkThemeColorAdapter.fromApi));
                },
                null
            );
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param reference - Color name.
     */
    public read(reference: string): Promise<DarkThemeColor> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/branding-colors/dark/{reference}",
                        method: "GET",
                        pathParams: {
                            reference: reference,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, DarkThemeColorAdapter.fromApi(data));
            }
        );
    }
    /**
     * update
     * @param request - The entity to perform action on.
     * @param reference - Color name.
     */
    public update(request: DarkThemeColorUpdateRequest, reference: string): Promise<DarkThemeColor> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/branding-colors/dark/{reference}",
                        method: "PUT",
                        pathParams: {
                            reference: reference,
                        },
                        body: {
                            color: request.color,
                            updated_at: request.updatedAt,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, DarkThemeColorAdapter.fromApi(data, request));
            }
        );
    }
}
