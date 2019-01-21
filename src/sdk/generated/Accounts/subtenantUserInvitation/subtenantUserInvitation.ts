import { Entity } from "../../../common/entity";
/**
 *SubtenantUserInvitation
 */
export interface SubtenantUserInvitation extends Entity {
    /**
     *accountId
     */
    accountId: string;

    /**
     *createdAt
     */
    readonly createdAt?: Date;

    /**
     *email
     */
    email: string;

    /**
     *expiration
     */
    readonly expiration?: Date;

    /**
     *loginProfiles
     */
    loginProfiles?: Array<any>;

    /**
     *updatedAt
     */
    readonly updatedAt?: Date;

    /**
     *userId
     */
    readonly userId?: string;
}
