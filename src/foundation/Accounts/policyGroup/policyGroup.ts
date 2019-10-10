import { Entity } from "../../../common/entity";
/**
 *PolicyGroup
 */
export interface PolicyGroup extends Entity {
    /**
     *The ID of the account this group belongs to.
     *@example 01619571e2e90242ac12000600000000
     */
    readonly accountId?: string;

    /**
     *The number of API keys in this group.
     */
    readonly apikeyCount?: number;

    /**
     *Creation UTC time RFC3339.
     *@example 2018-02-13T09:35:20Z
     */
    readonly createdAt?: Date;

    /**
     *The name of the group.
     *@example Administrators
     */
    name: string;

    /**
     *Last update UTC time RFC3339.
     *@example 2018-02-14T15:24:14Z
     */
    readonly updatedAt?: Date;

    /**
     *The number of users in this group.
     *@example 1
     */
    readonly userCount?: number;
}
