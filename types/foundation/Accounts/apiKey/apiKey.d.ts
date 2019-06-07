import { Entity } from "../../../common/entity";
import { ApiKeyStatus } from "./types";
/**
 *ApiKey
 */
export interface ApiKey extends Entity {
    /**
     *The ID of the account.
     *@example 01619571e2e90242ac12000600000000
     */
    readonly accountId?: string;
    /**
     *Creation UTC time RFC3339.
     *@example 2018-02-13T09:35:20Z
     */
    readonly createdAt?: Date;
    /**
     *The timestamp of the API key creation in the storage, in milliseconds.
     *@example 1518630727683
     */
    readonly creationTime?: number;
    /**
     *The API key.
     *@example ak_1MDE2MTk1NzFmNmU4MDI0MmFjMTIwMDA2MDAwMDAwMDA01619571f7020242ac12000600000000
     */
    readonly key?: string;
    /**
     *The timestamp of the latest API key usage, in milliseconds.
     *@example 1518630727688
     */
    readonly lastLoginTime?: number;
    /**
     *The display name for the API key.
     *@example API key gorgon
     */
    name: string;
    /**
     *The owner of this API key, who is the creator by default.
     *@example 01619571e2e89242ac12000600000000
     */
    owner?: string;
    /**
     *The status of the API key.
     *@example ACTIVE
     */
    status?: ApiKeyStatus;
    /**
     *Last update UTC time RFC3339.
     *@example 2018-02-14T15:24:14Z
     */
    readonly updatedAt?: Date;
}
