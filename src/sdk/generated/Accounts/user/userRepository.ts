import { Repository } from "../../../common/repository";
import { User } from "./user";
import { apiWrapper } from "../../../../common/functions";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { UserCreateRequest, UserUpdateRequest, UserListOptions } from "./types";

export class UserRepository extends Repository {

    /**
         * creates a User.
         * @returns Promise containing User.
         */
    public create(request: UserCreateRequest, action?: string): Promise<User> {
        const body = {
            address: request.address,
            email: request.email,
            full_name: request.fullName,
            groups: request.groups,
            login_profiles: request.loginProfiles,
            is_marketing_accepted: request.marketingAccepted,
            password: request.password,
            phone_number: request.phoneNumber,
            is_gtc_accepted: request.termsAccepted,
            username: request.username,
        };
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<User>(
                    {
                        url: "/v3/users",
                        method: "POST",
                        query: {
                            action: action,
                        },
                        body: body,
                    },
                    undefined,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * deletes a User.
     * @returns Promise containing User.
     */
    public delete(id: string): Promise<User> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<User>(
                    {
                        url: "/v3/users/{user_id}",
                        method: "DELETE",
                        pathParams: {
                            user_id: id,
                        },
                    },
                    undefined,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * gets a User.
     * @returns Promise containing User.
     */
    public get(id: string): Promise<User> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<User>(
                    {
                        url: "/v3/users/{user_id}",
                        method: "GET",
                        pathParams: {
                            user_id: id,
                        },
                    },
                    undefined,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * List Users
     * @param options filter options
     */
    public list(options?: UserListOptions): Paginator<User, UserListOptions> {
        const pageFunc = (pageOptions: UserListOptions): Promise<ListResponse<User>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include, statusEq } = pageOptions as UserListOptions;
                    this.client._CallApi<User>(
                        {
                            url: "/v3/users",
                            method: "GET",
                            query: { after, include, order, limit, statusEq },
                            paginated: true,
                        },
                        undefined,
                        resultsFn
                    );
                },
                (data: ListResponse<User>, done) => {
                    done(null, new ListResponse(data, data.data));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }

    /**
     * updates a User.
     * @returns Promise containing User.
     */
    public update(id: string, request: UserUpdateRequest): Promise<User> {
        const body = {
            address: request.address,
            full_name: request.fullName,
            groups: request.groups,
            login_profiles: request.loginProfiles,
            is_marketing_accepted: request.marketingAccepted,
            phone_number: request.phoneNumber,
            is_gtc_accepted: request.termsAccepted,
            is_totp_enabled: request.twoFactorAuthentication,
            username: request.username,
        };
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<User>(
                    {
                        url: "/v3/users/{user_id}",
                        method: "PUT",
                        pathParams: {
                            user_id: id,
                        },
                        body: body,
                    },
                    undefined,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }
}
