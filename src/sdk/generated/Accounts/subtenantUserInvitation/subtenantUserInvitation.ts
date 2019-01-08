import { Entity } from "../../../common/entity";
/**
 *SubtenantUserInvitation
 */
export interface SubtenantUserInvitation extends Entity {
    /**
     *accountId
     */
    accountId?: string;

    /**
     *createdAt
     */
    createdAt?: Date;

    /**
     *email
     */
    email?: string;

    /**
     *expiration
     */
    expiration?: Date;

    /**
     *id
     */
    id?: string;

    /**
     *loginProfiles
     */
    loginProfiles?: Array<any>;

    /**
     *updatedAt
     */
    updatedAt?: Date;

    /**
     *userId
     */
    userId?: string;
}
