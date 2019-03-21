import { Entity } from "../../../common/entity";
import { ActiveSession } from "../activeSession/activeSession";
import { LoginHistory } from "../loginHistory/loginHistory";
import { LoginProfile } from "../loginProfile/loginProfile";
import { SubtenantUserStatus } from "./types";
/**
 *SubtenantUser
 */
export interface SubtenantUser extends Entity {
    /**
     *accountId
     */
    accountId: string;

    /**
     *activeSessions
     */
    readonly activeSessions?: Array<ActiveSession>;

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
     *customFields
     */
    readonly customFields?: { [key: string]: string };

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
    readonly passwordChangedTime?: number;

    /**
     *phoneNumber
     */
    phoneNumber?: string;

    /**
     *status
     */
    status?: SubtenantUserStatus;

    /**
     *termsAccepted
     */
    termsAccepted?: boolean;

    /**
     *totpScratchCodes
     */
    readonly totpScratchCodes?: Array<string>;

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
