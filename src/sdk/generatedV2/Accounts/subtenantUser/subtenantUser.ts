import { LoginHistory } from "../loginHistory/loginHistory";
import { SubtenantUserStatusEnum } from "./types";
/**
 *SubtenantUser
 */
export interface SubtenantUser {
    /**
     *accountId
     */
    accountId: string;

    /**
     *address
     */
    address: string;

    /**
     *createdAt
     */
    createdAt: Date;

    /**
     *creationTime
     */
    creationTime: number;

    /**
     *email
     */
    email: string;

    /**
     *emailVerified
     */
    emailVerified: boolean;

    /**
     *fullName
     */
    fullName: string;

    /**
     *id
     */
    id: string;

    /**
     *lastLoginTime
     */
    lastLoginTime: number;

    /**
     *loginHistory
     */
    loginHistory: Array<LoginHistory>;

    /**
     *loginProfiles
     */
    loginProfiles: Array<any>;

    /**
     *marketingAccepted
     */
    marketingAccepted: boolean;

    /**
     *password
     */
    password: string;

    /**
     *passwordChangedTime
     */
    passwordChangedTime: number;

    /**
     *phoneNumber
     */
    phoneNumber: string;

    /**
     *status
     */
    status: SubtenantUserStatusEnum;

    /**
     *termsAccepted
     */
    termsAccepted: boolean;

    /**
     *twoFactorAuthentication
     */
    twoFactorAuthentication: boolean;

    /**
     *updatedAt
     */
    updatedAt: Date;

    /**
     *username
     */
    username: string;
}
