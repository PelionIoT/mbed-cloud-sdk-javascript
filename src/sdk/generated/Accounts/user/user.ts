import { Entity } from "../../../common/entity";
import { LoginHistory } from "../loginHistory/loginHistory";
import { LoginProfile } from "../loginProfile/loginProfile";
import { UserStatusEnum } from "./types";
/**
 *User
 */
export interface User extends Entity {
    /**
     *accountId
     */
    accountId?: string;

    /**
     *address
     */
    address?: string;

    /**
     *createdAt
     */
    createdAt?: Date;

    /**
     *creationTime
     */
    creationTime?: number;

    /**
     *email
     */
    email?: string;

    /**
     *emailVerified
     */
    emailVerified?: boolean;

    /**
     *fullName
     */
    fullName?: string;

    /**
     *id
     */
    id?: string;

    /**
     *lastLoginTime
     */
    lastLoginTime?: number;

    /**
     *loginHistory
     */
    loginHistory?: Array<LoginHistory>;

    /**
     *loginProfiles
     */
    loginProfiles?: Array<LoginProfile>;

    /**
     *marketingAccepted
     */
    marketingAccepted?: boolean;

    /**
     *password
     */
    password?: string;

    /**
     *passwordChangedTime
     */
    passwordChangedTime?: number;

    /**
     *phoneNumber
     */
    phoneNumber?: string;

    /**
     *status
     */
    status?: UserStatusEnum;

    /**
     *termsAccepted
     */
    termsAccepted?: boolean;

    /**
     *twoFactorAuthentication
     */
    twoFactorAuthentication?: boolean;

    /**
     *updatedAt
     */
    updatedAt?: Date;

    /**
     *username
     */
    username?: string;
}
