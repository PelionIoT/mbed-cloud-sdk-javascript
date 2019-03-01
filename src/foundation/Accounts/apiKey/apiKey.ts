import { Entity } from "common/entity";
import { ApiKeyStatusEnum } from "./types";
/**
 *ApiKey
 */
export interface ApiKey extends Entity {
    /**
     *accountId
     */
    readonly accountId?: string;

    /**
     *createdAt
     */
    readonly createdAt?: Date;

    /**
     *creationTime
     */
    readonly creationTime?: number;

    /**
     *key
     */
    readonly key?: string;

    /**
     *lastLoginTime
     */
    readonly lastLoginTime?: number;

    /**
     *name
     */
    name: string;

    /**
     *owner
     */
    owner?: string;

    /**
     *status
     */
    status?: ApiKeyStatusEnum;

    /**
     *updatedAt
     */
    readonly updatedAt?: Date;
}
