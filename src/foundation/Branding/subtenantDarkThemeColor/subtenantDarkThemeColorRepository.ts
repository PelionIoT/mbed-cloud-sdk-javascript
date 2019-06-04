import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { SubtenantDarkThemeColor } from "./subtenantDarkThemeColor";
import { SubtenantDarkThemeColorAdapter } from "../../index";
import { SubtenantDarkThemeColorUpdateRequest } from "./types";
import { Paginator } from "../../../common/pagination";
import { ListResponse } from "../../../legacy/common/listResponse";
import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *SubtenantDarkThemeColor repository
 */
export class SubtenantDarkThemeColorRepository extends Repository {
    /**
     * delete
     * @param accountId - Account ID.
     * @param reference - Color name.
     */
    public delete(accountId: string, reference: string): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/branding-colors/dark/{reference}",
                        method: "DELETE",
                        pathParams: {
                            account_id: accountId,
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
     * @param accountId - Account ID.
     * @param options - options
     */
    public list(accountId: string, options?: ListOptions): Paginator<SubtenantDarkThemeColor, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<SubtenantDarkThemeColor>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/accounts/{account_id}/branding-colors/dark",
                            method: "GET",
                            pathParams: {
                                account_id: accountId,
                            },
                        },
                        resultsFn
                    );
                },
                (data: ListResponse<SubtenantDarkThemeColor>, done) => {
                    done(null, new ListResponse(data, data.data, SubtenantDarkThemeColorAdapter.fromApi));
                },
                null
            );
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param accountId - Account ID.
     * @param reference - Color name.
     */
    public read(accountId: string, reference: string): Promise<SubtenantDarkThemeColor> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/branding-colors/dark/{reference}",
                        method: "GET",
                        pathParams: {
                            account_id: accountId,
                            reference: reference,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, SubtenantDarkThemeColorAdapter.fromApi(data));
            }
        );
    }
    /**
     * update
     * @param request - The entity to perform action on.
     * @param accountId - Account ID.
     * @param reference - Color name.
     */
    public update(
        request: SubtenantDarkThemeColorUpdateRequest,
        accountId: string,
        reference: string
    ): Promise<SubtenantDarkThemeColor> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/branding-colors/dark/{reference}",
                        method: "PUT",
                        pathParams: {
                            account_id: accountId,
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
                done(null, SubtenantDarkThemeColorAdapter.fromApi(data, request));
            }
        );
    }
}
