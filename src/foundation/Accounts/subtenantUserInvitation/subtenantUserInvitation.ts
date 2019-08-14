import { Entity } from "../../../common/entity";
import { LoginProfile } from "../loginProfile/loginProfile";
/**
 *SubtenantUserInvitation
 */
export interface SubtenantUserInvitation extends Entity {
    /**
     *The ID of the account the user is invited to.
     *@example 01619571e2e90242ac12000600000000
     */
    accountId: string;

    /**
     *Creation UTC time RFC3339.
     *@example 2018-02-13T09:35:20Z
     */
    readonly createdAt?: Date;

    /**
     *Email address of the invited user.
     *@example friend@arm.com
     */
    email: string;

    /**
     *Invitation expiration as UTC time RFC3339.
     *@example 2018-02-14T15:24:14Z
     */
    readonly expiration?: Date;

    /**
     *groups
     */
    groups?: Array<string>;

    /**
     *Represents a user login profile in Device Management.
     */
    loginProfiles?: Array<LoginProfile>;

    /**
     *Last update UTC time RFC3339.
     *@example 2018-02-14T15:24:14Z
     */
    readonly updatedAt?: Date;

    /**
     *The ID of the invited user.
     *@example 01619571e2e90242ac12000600000000
     */
    readonly userId?: string;
}
