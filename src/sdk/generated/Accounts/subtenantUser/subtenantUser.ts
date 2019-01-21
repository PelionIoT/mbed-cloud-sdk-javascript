import { Entity } from "../../../common/entity";
import { LoginHistory } from "../loginHistory/loginHistory";
import { SubtenantUserStatusEnum } from "./types";
/**
 *SubtenantUser
 */
export interface SubtenantUser extends Entity {
    /**
     *accountId
     */
    accountId: string;

    /**
     *address
     */
    address?: string;

    /**
     *createdAt
     */
    readonly createdAt?: Date;

    /**
     *creationTime
     */
    readonly creationTime?: number;

    /**
     *email
     */
    email: string;

    /**
     *emailVerified
     */
    readonly emailVerified?: boolean;

    /**
     *fullName
     */
    fullName?: string;

    /**
     *lastLoginTime
     */
    readonly lastLoginTime?: number;

    /**
     *loginHistory
     */
    readonly loginHistory?: Array<LoginHistory>;

    /**
     *loginProfiles
     */
    loginProfiles?: Array<any>;

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
    readonly passwordChangedTime?: number;

    /**
     *phoneNumber
     */
    phoneNumber?: string;

    /**
     *status
     */
    status?: SubtenantUserStatusEnum;

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
    readonly updatedAt?: Date;

    /**
     *username
     */
    username?: string;
}
