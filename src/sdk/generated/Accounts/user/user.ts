import { EntityBase } from "../../../common/entityBase";
import * as privateFunctions from "../../../common/privateFunctions";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { ListOptions } from "../../../../common/interfaces";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";
import { PolicyGroup } from "../../index";
import { LoginHistory } from "../../index";
import { UserStatusEnum } from "../../enums";

/**
 * User
 */
export class User extends EntityBase {
    public readonly _renames: { [key: string]: string } = {
        groups: "groupIds",
        is_marketing_accepted: "marketingAccepted",
        is_gtc_accepted: "termsAccepted",
        is_totp_enabled: "twoFactorAuthentication",
    };

    public readonly _foreignKeys: { [key: string]: { [key: string]: any } } = {
        loginHistory: {
            type: LoginHistory,
            array: true,
        },
    };

    /**
     * The UUID of the account.
     */
    public accountId?: string;

    /**
     * Address.
     */
    public address?: string;

    /**
     * Creation UTC time RFC3339.
     */
    public createdAt?: Date;

    /**
     * A timestamp of the user creation in the storage, in milliseconds.
     */
    public creationTime?: number;

    /**
     * The email address.
     */
    public email?: string;

    /**
     * A flag indicating whether the user&#39;s email address has been verified or not.
     */
    public emailVerified?: boolean;

    /**
     * The full name of the user.
     */
    public fullName?: string;

    /**
     * A list of IDs of the groups this user belongs to.
     */
    public groupIds?: Array<string>;

    /**
     * A timestamp of the latest login of the user, in milliseconds.
     */
    public lastLoginTime?: number;

    /**
     * Timestamps, succeedings, IP addresses and user agent information of the last five logins of the user, with timestamps in RFC3339 format.
     */
    public loginHistory?: Array<LoginHistory>;

    /**
     * A flag indicating that receiving marketing information has been accepted.
     */
    public marketingAccepted?: boolean;

    /**
     * The password when creating a new user. It will be generated when not present in the request.
     */
    public password?: string;

    /**
     * A timestamp of the latest change of the user password, in milliseconds.
     */
    public passwordChangedTime?: number;

    /**
     * Phone number.
     */
    public phoneNumber?: string;

    /**
     * The status of the user. ENROLLING state indicates that the user is in the middle of the enrollment process. INVITED means that the user has not accepted the invitation request. RESET means that the password must be changed immediately. INACTIVE users are locked out and not permitted to use the system.
     */
    public status?: UserStatusEnum;

    /**
     * A flag indicating that the General Terms and Conditions has been accepted.
     */
    public termsAccepted?: boolean;

    /**
     * A flag indicating whether 2-factor authentication (TOTP) has been enabled.
     */
    public twoFactorAuthentication?: boolean;

    /**
     * Last update UTC time RFC3339.
     */
    public updatedAt?: Date;

    /**
     * A username containing alphanumerical letters and -,._@+= characters.
     */
    public username?: string;

    constructor(config?: Config) {
        super(config);
    }

    /**
     * addToGroupss a User.
     * @returns Promise containing User.
     */
    public addToGroups(addToGroupIds: Array<string>): Promise<User> {
        const body = addToGroupIds;
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<User>(
                    {
                        url: "/v3/users/{user-id}/groups",
                        method: "POST",
                        pathParams: {
                            "user-id": this.id,
                        },
                        body: body,
                    },
                    this,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * creates a User.
     * @returns Promise containing User.
     */
    public create(action?: string): Promise<User> {
        return privateFunctions.subtenantAccountSwitchCreate(this, action);
    }

    /**
     * createOnAggregators a User.
     * @returns Promise containing User.
     */
    public createOnAggregator(action?: string): Promise<User> {
        const body = {
            address: this.address,
            email: this.email,
            full_name: this.fullName,
            groups: this.groupIds,
            is_marketing_accepted: this.marketingAccepted,
            password: this.password,
            phone_number: this.phoneNumber,
            is_gtc_accepted: this.termsAccepted,
            username: this.username,
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
                    this,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * createOnSubtenants a User.
     * @returns Promise containing User.
     */
    public createOnSubtenant(action?: string): Promise<User> {
        const body = {
            address: this.address,
            email: this.email,
            full_name: this.fullName,
            groups: this.groupIds,
            is_marketing_accepted: this.marketingAccepted,
            password: this.password,
            phone_number: this.phoneNumber,
            is_gtc_accepted: this.termsAccepted,
            username: this.username,
        };
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<User>(
                    {
                        url: "/v3/accounts/{accountID}/users",
                        method: "POST",
                        query: {
                            action: action,
                        },
                        pathParams: {
                            accountID: this.accountId,
                        },
                        body: body,
                    },
                    this,
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
    public delete(): Promise<User> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<User>(
                    {
                        url: "/v3/users/{user-id}",
                        method: "DELETE",
                        pathParams: {
                            "user-id": this.id,
                        },
                    },
                    this,
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
    public get(): Promise<User> {
        return privateFunctions.subtenantAccountSwitchGet(this);
    }

    /**
     * getOnAggregators a User.
     * @returns Promise containing User.
     */
    public getOnAggregator(): Promise<User> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<User>(
                    {
                        url: "/v3/users/{user-id}",
                        method: "GET",
                        pathParams: {
                            "user-id": this.id,
                        },
                    },
                    this,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * getOnSubtenants a User.
     * @returns Promise containing User.
     */
    public getOnSubtenant(): Promise<User> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<User>(
                    {
                        url: "/v3/accounts/{accountID}/users/{user-id}",
                        method: "GET",
                        pathParams: {
                            "accountID": this.accountId,
                            "user-id": this.id,
                        },
                    },
                    this,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * List PolicyGroups
     * @param options filter options
     */
    public groups(options?: ListOptions): Paginator<PolicyGroup, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<PolicyGroup>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include } = pageOptions as ListOptions;
                    this.client._CallApi<PolicyGroup>(
                        {
                            url: "/v3/users/{user-id}/groups",
                            method: "GET",
                            query: { after, include, order, limit },
                            pathParams: {
                                "user-id": this.id,
                            },
                            paginated: true,
                        },
                        PolicyGroup,
                        resultsFn
                    );
                },
                (data: ListResponse<PolicyGroup>, done) => {
                    done(null, new ListResponse(data, data.data));
                }
            );
        };
        return new Paginator(pageFunc, options);
    }

    /**
     * List Users
     * @param options filter options
     */
    public list(options?: ListOptions): Paginator<User, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<User>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include } = pageOptions as ListOptions;
                    this.client._CallApi<User>(
                        {
                            url: "/v3/users",
                            method: "GET",
                            query: { after, include, order, limit },
                            paginated: true,
                        },
                        User,
                        resultsFn
                    );
                },
                (data: ListResponse<User>, done) => {
                    done(null, new ListResponse(data, data.data));
                }
            );
        };
        return new Paginator(pageFunc, options);
    }

    /**
     * updates a User.
     * @returns Promise containing User.
     */
    public update(): Promise<User> {
        const body = {
            address: this.address,
            full_name: this.fullName,
            groups: this.groupIds,
            is_marketing_accepted: this.marketingAccepted,
            phone_number: this.phoneNumber,
            is_gtc_accepted: this.termsAccepted,
            is_totp_enabled: this.twoFactorAuthentication,
            username: this.username,
        };
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<User>(
                    {
                        url: "/v3/users/{user-id}",
                        method: "PUT",
                        pathParams: {
                            "user-id": this.id,
                        },
                        body: body,
                    },
                    this,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * validateEmails a User.
     * @returns Promise containing User.
     */
    public validateEmail(): Promise<User> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<User>(
                    {
                        url: "/v3/accounts/{accountID}/users/{user-id}/validate-email",
                        method: "POST",
                        pathParams: {
                            "accountID": this.accountId,
                            "user-id": this.id,
                        },
                    },
                    this,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }
}
