import { EntityBase } from "../../../common/entityBase";
import { ConnectionOptions, ListOptions } from "../../../../common/interfaces";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";
import { Client } from "../../../client/client";
export class User extends EntityBase {
    public readonly _renames: { [key: string]: string } = {
        groups: "groupIds",
        is_marketing_accepted: "marketingAccepted",
        is_gtc_accepted: "termsAccepted",
        is_totp_enabled: "twoFactorAuthentication",
    };
    public readonly _foreignKeys: { [key: string]: { [key: string]: any } } = {
        LoginHistory: {
            type: LoginHistory,
            array: true,
        }
    };
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public accountId?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public address?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public createdAt?: Date;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public creationTime?: number;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public email?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public emailVerified?: boolean;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public fullName?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public groupIds?: Array<string>;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public lastLoginTime?: number;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public loginHistory?: Array<LoginHistory>;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public marketingAccepted?: boolean;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public password?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public passwordChangedTime?: number;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public phoneNumber?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public status?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public termsAccepted?: boolean;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public twoFactorAuthentication?: boolean;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public updatedAt?: Date;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public username?: string;
    constructor(config?: ConnectionOptions | Config) {
        super();
        if (config instanceof Config) {
            this.config = config;
        } else {
            this.config = new Config(config);
        }
    }
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public create(action?: string): Promise<User> {
        return apiWrapper(resultsFn => {
            Client.CallApi<User>({
                url: "/v3/users",
                method: "POST",
                query: {
                    "action":
                        action,
                },
                config: this.config,
            }, this, resultsFn);
        }, (data, done) => {
            done(null, data);
        });
    }
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public delete(): Promise<User> {
        return apiWrapper(resultsFn => {
            Client.CallApi<User>({
                url: "/v3/users/{user-id}",
                method: "DELETE",
                config: this.config,
            }, this, resultsFn);
        }, (data, done) => {
            done(null, data);
        });
    }
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public get(): Promise<User> {
        return apiWrapper(resultsFn => {
            Client.CallApi<User>({
                url: "/v3/users/{user-id}",
                method: "GET",
                config: this.config,
            }, this, resultsFn);
        }, (data, done) => {
            done(null, data);
        });
    }
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public update(): Promise<User> {
        return apiWrapper(resultsFn => {
            Client.CallApi<User>({
                url: "/v3/users/{user-id}",
                method: "PUT",
                config: this.config,
            }, this, resultsFn);
        }, (data, done) => {
            done(null, data);
        });
    }
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public validateEmail(): Promise<User> {
        return apiWrapper(resultsFn => {
            Client.CallApi<User>({
                url: "/v3/accounts/{accountID}/users/{user-id}/validate-email",
                method: "POST",
                config: this.config,
            }, this, resultsFn);
        }, (data, done) => {
            done(null, data);
        });
    }
}