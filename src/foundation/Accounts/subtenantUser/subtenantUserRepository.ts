import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { SubtenantUser } from "./subtenantUser";
import { SubtenantUserAdapter } from "../../index";
import { SubtenantUserCreateRequest } from "./types";
import { SubtenantUserUpdateRequest } from "./types";
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
    public create(request: SubtenantUserCreateRequest, accountId: string, action?: string): Promise<SubtenantUser> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
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
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, SubtenantUserAdapter.fromApi(data, request));
            }
        );
    }
    /**
     * delete
     * @param accountId - Account ID.
     * @param id - The ID of the user to delete.
     */
    public delete(accountId: string, id: string): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/users/{user_id}",
                        method: "DELETE",
                        pathParams: {
                            account_id: accountId,
                            user_id: id,
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
     * @param id - The ID of the user.
     */
    public read(accountId: string, id: string): Promise<SubtenantUser> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/users/{user_id}",
                        method: "GET",
                        pathParams: {
                            account_id: accountId,
                            user_id: id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, SubtenantUserAdapter.fromApi(data));
            }
        );
    }
    /**
     * update
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account.
     * @param id - The ID of the user.
     */
    public update(request: SubtenantUserUpdateRequest, accountId: string, id: string): Promise<SubtenantUser> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
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
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, SubtenantUserAdapter.fromApi(data, request));
            }
        );
    }
    /**
     * validateEmail
     * @param accountId - Account ID.
     * @param id - The ID of the user.
     */
    public validateEmail(accountId: string, id: string): Promise<SubtenantUser> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/users/{user_id}/validate-email",
                        method: "POST",
                        pathParams: {
                            account_id: accountId,
                            user_id: id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, SubtenantUserAdapter.fromApi(data));
            }
        );
    }
}
