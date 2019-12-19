import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { SubtenantLightThemeColor } from "./subtenantLightThemeColor";
import { SubtenantLightThemeColorAdapter } from "../../index";
import { SubtenantLightThemeColorUpdateRequest } from "./types";
/**
 *SubtenantLightThemeColor repository
 */
export class SubtenantLightThemeColorRepository extends Repository {
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
                        url: "/v3/accounts/{account_id}/branding-colors/light/{reference}",
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
    public read(accountId: string, reference: string): Promise<SubtenantLightThemeColor> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/branding-colors/light/{reference}",
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
                done(null, SubtenantLightThemeColorAdapter.fromApi(data));
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
        request: SubtenantLightThemeColorUpdateRequest,
        accountId: string,
        reference: string
    ): Promise<SubtenantLightThemeColor> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/branding-colors/light/{reference}",
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
                done(null, SubtenantLightThemeColorAdapter.fromApi(data, request));
            }
        );
    }
}
