import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { SubtenantUserAdapter } from "../../index";
/**
 *SubtenantUser repository
 */
export class SubtenantUserRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account.
     * @param action - Create or invite user.
     */
    create(request, accountId, action) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/accounts/{account_id}/users",
                method: "POST",
                query: {
                    action: action,
                },
                pathParams: {
                    account_id: accountId,
                },
                body: {
                    address: request.address,
                    email: request.email,
                    full_name: request.fullName,
                    is_gtc_accepted: request.isGtcAccepted,
                    is_marketing_accepted: request.isMarketingAccepted,
                    login_profiles: request.loginProfiles,
                    password: request.password,
                    phone_number: request.phoneNumber,
                    username: request.username,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, SubtenantUserAdapter.fromApi(data, request));
        });
    }
    /**
     * delete
     * @param accountId - Account ID.
     * @param id - The ID of the user to delete.
     */
    delete(accountId, id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/accounts/{account_id}/users/{user_id}",
                method: "DELETE",
                pathParams: {
                    account_id: accountId,
                    user_id: id,
                },
            }, resultsFn);
        }, (_data, done) => {
            done(null, null);
        });
    }
    /**
     * read
     * @param accountId - The ID of the account.
     * @param id - The ID of the user.
     */
    read(accountId, id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/accounts/{account_id}/users/{user_id}",
                method: "GET",
                pathParams: {
                    account_id: accountId,
                    user_id: id,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, SubtenantUserAdapter.fromApi(data));
        });
    }
    /**
     * update
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account.
     * @param id - The ID of the user.
     */
    update(request, accountId, id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/accounts/{account_id}/users/{user_id}",
                method: "PUT",
                pathParams: {
                    account_id: accountId,
                    user_id: id,
                },
                body: {
                    address: request.address,
                    full_name: request.fullName,
                    is_gtc_accepted: request.isGtcAccepted,
                    is_marketing_accepted: request.isMarketingAccepted,
                    is_totp_enabled: request.isTotpEnabled,
                    login_profiles: request.loginProfiles,
                    phone_number: request.phoneNumber,
                    username: request.username,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, SubtenantUserAdapter.fromApi(data, request));
        });
    }
    /**
     * validateEmail
     * @param accountId - Account ID.
     * @param id - The ID of the user.
     */
    validateEmail(accountId, id) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/accounts/{account_id}/users/{user_id}/validate-email",
                method: "POST",
                pathParams: {
                    account_id: accountId,
                    user_id: id,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, SubtenantUserAdapter.fromApi(data));
        });
    }
}
//# sourceMappingURL=subtenantUserRepository.js.map