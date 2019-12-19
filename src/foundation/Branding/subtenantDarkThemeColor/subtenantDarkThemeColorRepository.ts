import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { SubtenantDarkThemeColor } from "./subtenantDarkThemeColor";
import { SubtenantDarkThemeColorAdapter } from "../../index";
import { SubtenantDarkThemeColorUpdateRequest } from "./types";
/**
 *SubtenantDarkThemeColor repository
 */
export class SubtenantDarkThemeColorRepository extends Repository {
    /**
     * delete
     * @param accountId - The ID of the account.
     * @param reference - The name of the branding color.
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
     * read
     * @param accountId - The ID of the account.
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
     * @param accountId - The ID of the account.
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
