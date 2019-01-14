import { Entity } from "../../../common/entity";
/**
 *UserInvitation
 */
export interface UserInvitation extends Entity {
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
