import { EntityBase } from "../../../common/entityBase";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";
import { LoginHistory } from "../../index";
import { SubtenantUserStatusEnum } from "../../enums";

/**
 * SubtenantUser
 */
export class SubtenantUser extends EntityBase {
    public readonly _renames: { [key: string]: string } = {
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
    public status?: SubtenantUserStatusEnum;

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
     * creates a SubtenantUser.
     * @returns Promise containing SubtenantUser.
     */
    public create(action?: string): Promise<SubtenantUser> {
        const body = {
            address: this.address,
            email: this.email,
            full_name: this.fullName,
            is_marketing_accepted: this.marketingAccepted,
            password: this.password,
            phone_number: this.phoneNumber,
            is_gtc_accepted: this.termsAccepted,
            username: this.username,
        };
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<SubtenantUser>(
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
     * deletes a SubtenantUser.
     * @returns Promise containing SubtenantUser.
     */
    public delete(): Promise<SubtenantUser> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<SubtenantUser>(
                    {
                        url: "/v3/accounts/{accountID}/users/{user-id}",
                        method: "DELETE",
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
     * gets a SubtenantUser.
     * @returns Promise containing SubtenantUser.
     */
    public get(): Promise<SubtenantUser> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<SubtenantUser>(
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
     * updates a SubtenantUser.
     * @returns Promise containing SubtenantUser.
     */
    public update(): Promise<SubtenantUser> {
        const body = {
            address: this.address,
            full_name: this.fullName,
            is_marketing_accepted: this.marketingAccepted,
            phone_number: this.phoneNumber,
            is_gtc_accepted: this.termsAccepted,
            is_totp_enabled: this.twoFactorAuthentication,
            username: this.username,
        };
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<SubtenantUser>(
                    {
                        url: "/v3/accounts/{accountID}/users/{user-id}",
                        method: "PUT",
                        pathParams: {
                            "accountID": this.accountId,
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
     * validateEmails a SubtenantUser.
     * @returns Promise containing SubtenantUser.
     */
    public validateEmail(): Promise<SubtenantUser> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<SubtenantUser>(
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
