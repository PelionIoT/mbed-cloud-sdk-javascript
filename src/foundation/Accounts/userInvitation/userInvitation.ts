import { Entity } from "../../../common/entity";
import { LoginProfile } from "../loginProfile/loginProfile";
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
    loginProfiles?: Array<LoginProfile>;

    /**
     *updatedAt
     */
    readonly updatedAt?: Date;

    /**
     *userId
     */
    readonly userId?: string;
}
