import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { SubtenantUser } from "./subtenantUser";
import { SubtenantUserAdapter } from "../../index";
import { SubtenantUserCreateRequest } from "./types";
import { SubtenantPolicyGroup } from "../../index";
import { SubtenantPolicyGroupAdapter } from "../../index";
import { SubtenantUserUpdateRequest } from "./types";
import { Paginator, Page } from "../../../index";
import { ListOptions } from "../../../common";
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
                            groups: request.groups,
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
     * policyGroups
     * @param accountId - Account ID.
     * @param id - The ID of the user.
     * @param options - options
     */
    public policyGroups(
        accountId: string,
        id: string,
        options?: ListOptions
    ): Paginator<SubtenantPolicyGroup, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<Page<SubtenantPolicyGroup>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/accounts/{account_id}/users/{user_id}/groups",
                            method: "GET",
                            query: {
                                after: pageOptions.after,
                                include: pageOptions.include,
                                limit: pageOptions.limit,
                                order: pageOptions.order,
                            },
                            pathParams: {
                                account_id: accountId,
                                user_id: id,
                            },
                        },
                        resultsFn
                    );
                },
                (data: Page<SubtenantPolicyGroup>, done) => {
                    done(null, new Page(data, data.data, SubtenantPolicyGroupAdapter.fromApi, pageOptions));
                },
                null
            );
        };
        return new Paginator(pageFunc, options);
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
                            groups: request.groups,
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
