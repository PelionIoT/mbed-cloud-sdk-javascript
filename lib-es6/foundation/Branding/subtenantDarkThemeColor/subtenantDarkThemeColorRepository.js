import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { SubtenantDarkThemeColorAdapter } from "../../index";
/**
 *SubtenantDarkThemeColor repository
 */
export class SubtenantDarkThemeColorRepository extends Repository {
    /**
     * delete
     * @param accountId - Account ID.
     * @param reference - Color name.
     */
    delete(accountId, reference) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/accounts/{account_id}/branding-colors/dark/{reference}",
                method: "DELETE",
                pathParams: {
                    account_id: accountId,
                    reference: reference,
                },
            }, resultsFn);
        }, (_data, done) => {
            done(null, null);
        });
    }
    /**
     * read
     * @param accountId - Account ID.
     * @param reference - Color name.
     */
    read(accountId, reference) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/accounts/{account_id}/branding-colors/dark/{reference}",
                method: "GET",
                pathParams: {
                    account_id: accountId,
                    reference: reference,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, SubtenantDarkThemeColorAdapter.fromApi(data));
        });
    }
    /**
     * update
     * @param request - The entity to perform action on.
     * @param accountId - Account ID.
     * @param reference - Color name.
     */
    update(request, accountId, reference) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
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
            }, resultsFn);
        }, (data, done) => {
            done(null, SubtenantDarkThemeColorAdapter.fromApi(data, request));
        });
    }
}
//# sourceMappingURL=subtenantDarkThemeColorRepository.js.map