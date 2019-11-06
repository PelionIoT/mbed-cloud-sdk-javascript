import { ListOptions } from "../../../common";
import { Repository } from "../../../common/repository";
import { Page, Paginator } from "../../../index";
import { apiWrapper } from "../../../legacy/common/functions";
import { DarkThemeColorAdapter } from "../../index";
import { DarkThemeColor } from "./darkThemeColor";
import { DarkThemeColorUpdateRequest } from "./types";
/**
 *DarkThemeColor repository
 */
export class DarkThemeColorRepository extends Repository {
    /**
     * delete
     * @param reference - The name of the branding color.
     */
    public delete(reference: string): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/branding-colors/dark/{reference}",
                        method: "DELETE",
                        pathParams: {
                            reference,
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
        const pageFunc = (pageOptions: ListOptions): Promise<Page<DarkThemeColor>> => {
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
                (data: Page<DarkThemeColor>, done) => {
                    done(null, new Page(data, data.data, DarkThemeColorAdapter.fromApi, pageOptions));
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
                            reference,
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
                            reference,
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
