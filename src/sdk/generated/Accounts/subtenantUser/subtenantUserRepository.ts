import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../legacy/common/functions";
import { SubtenantUser } from "./subtenantUser";
import { SubtenantUserAdapter } from "../../index";
import { SubtenantUserCreateRequest } from "./types";
import { SubtenantUserUpdateRequest } from "./types";
/**
 *SubtenantUser repository
 */
export class SubtenantUserRepository extends Repository {
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
                            login_profiles: request.loginProfiles,
                            is_marketing_accepted: request.marketingAccepted,
                            password: request.password,
                            phone_number: request.phoneNumber,
                            is_gtc_accepted: request.termsAccepted,
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
                            login_profiles: request.loginProfiles,
                            is_marketing_accepted: request.marketingAccepted,
                            phone_number: request.phoneNumber,
                            is_gtc_accepted: request.termsAccepted,
                            is_totp_enabled: request.twoFactorAuthentication,
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
