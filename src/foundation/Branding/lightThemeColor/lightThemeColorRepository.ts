import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { LightThemeColor } from "./lightThemeColor";
import { LightThemeColorAdapter } from "../../index";
import { DarkThemeColor } from "../../index";
import { DarkThemeColorAdapter } from "../../index";
import { LightThemeColorUpdateRequest } from "./types";
import { Paginator } from "../../../common/pagination";
import { ListResponse } from "../../../legacy/common/listResponse";
import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *LightThemeColor repository
 */
export class LightThemeColorRepository extends Repository {
    /**
     * delete
     * @param reference - Color name.
     */
    public delete(reference: string): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/branding-colors/light/{reference}",
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
     * get
     * @param reference - Color name.
     */
    public get(reference: string): Promise<LightThemeColor> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/branding-colors/light/{reference}",
                        method: "GET",
                        pathParams: {
                            reference: reference,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, LightThemeColorAdapter.fromApi(data));
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
                            url: "/v3/branding-colors/light",
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
     * update
     * @param request - The entity to perform action on.
     * @param reference - Color name.
     */
    public update(request: LightThemeColorUpdateRequest, reference: string): Promise<LightThemeColor> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/branding-colors/light/{reference}",
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
                done(null, LightThemeColorAdapter.fromApi(data, request));
            }
        );
    }
}
