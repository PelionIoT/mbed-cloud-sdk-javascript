import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../common/functions";
import { SubtenantUser } from "./subtenantUser";
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
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
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
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
    public get(accountId: string, id: string): Promise<SubtenantUser> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/accounts/{account_id}/users/{user_id}",
                        method: "GET",
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
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
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
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
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
}
