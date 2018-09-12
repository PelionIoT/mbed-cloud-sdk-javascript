import { UserStatusEnum } from "./userStatusEnum";
import { LoginHistory } from "../loginHistory/loginHistory";
import { asyncStyle } from "../../../../common/functions";
import { CallbackFn } from "../../../../common/interfaces";
import { EntityBase } from "../../../common/entityBase";
import { Config } from "../../../client/config";

export class User extends EntityBase {
    /**
     * The email address.
     */
    public email?: string;
    /**
     * The full name of the user.
     */
    public fullName?: string;
    /**
     * A username containing alphanumerical letters and -,._@+= characters.
     */
    public username?: string;
    /**
     * The password when creating a new user. It will be generated when not present in the request.
     */
    public password?: string;
    /**
     * Phone number.
     */
    public phoneNumber?: string;
    /**
     * Address.
     */
    public address?: string;
    /**
     * A flag indicating that the General Terms and Conditions has been accepted.
     */
    public termsAccepted?: boolean;
    /**
     * A flag indicating that receiving marketing information has been accepted.
     */
    public marketingAccepted?: boolean;
    /**
     * A list of group IDs this user belongs to.
     */
    public groups?: Array<string>;
    /**
     * The status of the user. INVITED means that the user has not accepted the invitation request. RESET means that the password must be changed immediately.
     */
    public status?: UserStatusEnum;
    /**
     * The UUID of the account.
     */
    public accountId?: string;
    /**
     * A flag indicating whether the user's email address has been verified or not.
     */
    public emailVerified?: boolean;
    /**
     * Creation time.
     */
    public createdAt?: Date;
    /**
     * A timestamp of the user creation in the storage, in milliseconds.
     */
    public creationTime?: number;
    /**
     * A timestamp of the latest change of the user password, in milliseconds.
     */
    public passwordChangedTime?: number;
    /**
     * Whether two factor authentication has been enabled for this user.
     */
    public twoFactorAuthentication?: boolean;
    /**
     * A timestamp of the latest login of the user, in milliseconds.
     */
    public lastLoginTime?: number;
    /**
     * History of logins for this user.
     */
    public loginHistory?: Array<LoginHistory>;

    constructor(config?: Config) {
        super();
        if (config) {
            this.config = config;
        }
    }

    /**
     * Creates a user
     * @returns Promise containing user
     */
    public create(): Promise<User>;
    /**
     * Creates a user
     * @param callback A function that is passed the return arguments (error, user)
     */
    public create(callback: CallbackFn<User>): void;
    public create(callback?: CallbackFn<User>): Promise<User> {
        return asyncStyle(_done => {
            // this._api.updateUser(this, done);
        }, callback);
    }

    /**
     * Gets a user
     * @returns Promise containing user
     */
    public get(): Promise<User>;
    /**
     * Gets a user
     * @param callback A function that is passed the return arguments (error, user)
     */
    public get(callback: CallbackFn<User>): void;
    public get(callback?: CallbackFn<User>): Promise<User> {
        return asyncStyle(_done => {
            // this._api.updateUser(this, done);
        }, callback);
    }

    /**
     * Updates the user
     * @returns Promise containing user
     */
    public update(): Promise<User>;
    /**
     * Updates the user
     * @param callback A function that is passed the return arguments (error, user)
     */
    public update(callback: CallbackFn<User>): void;
    public update(callback?: CallbackFn<User>): Promise<User> {
        return asyncStyle(_done => {
            // this._api.updateUser(this, done);
        }, callback);
    }

    /**
     * Delete the user
     * @returns Promise containing any error
     */
    public delete(): Promise<void>;
    /**
     * Delete the user
     * @param callback A function that is passed any error
     */
    public delete(callback: CallbackFn<void>): void;
    public delete(callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle(_done => {
            // this._api.deleteUser(this.id, done);
        }, callback);
    }
}
