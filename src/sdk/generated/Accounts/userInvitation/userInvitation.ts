import { Entity } from "../../../common/entity";
/**
 *UserInvitation
 */
export interface UserInvitation extends Entity {
    /**
     *accountId
     */
    readonly accountId?: string;

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
