import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../common/functions";
import { User } from "./user";
import { UserCreateRequest } from "./types";
import { UserUpdateRequest } from "./types";
/**
 *User repository
 */
export class UserRepository extends Repository {
    public create(request: UserCreateRequest, action?: string): Promise<User> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/users",
                        method: "POST",
                        query: {
                            action: action,
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
            (_data, done) => {
                done(null, null);
            }
        );
    }
    public delete(id: string): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/users/{user_id}",
                        method: "DELETE",
                        pathParams: {
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
    public get(id: string): Promise<User> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/users/{user_id}",
                        method: "GET",
                        pathParams: {
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
    public update(request: UserUpdateRequest, id: string): Promise<User> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/users/{user_id}",
                        method: "PUT",
                        pathParams: {
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
            (_data, done) => {
                done(null, null);
            }
        );
    }
}
