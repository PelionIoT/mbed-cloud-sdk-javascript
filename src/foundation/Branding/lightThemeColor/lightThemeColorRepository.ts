import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { LightThemeColor } from "./lightThemeColor";
import { LightThemeColorAdapter } from "../../index";
import { LightThemeColorUpdateRequest } from "./types";
import { Paginator, Page } from "../../../index";
import { ListOptions } from "../../../common";
/**
 *LightThemeColor repository
 */
export class LightThemeColorRepository extends Repository {
    /**
     * delete
     * @param reference - The name of the branding color.
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
     * list
     * @param options - options
     */
    public list(options?: ListOptions): Paginator<LightThemeColor, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<Page<LightThemeColor>> => {
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
                (data: Page<LightThemeColor>, done) => {
                    done(null, new Page(data, data.data, LightThemeColorAdapter.fromApi, pageOptions));
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
    public read(reference: string): Promise<LightThemeColor> {
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
