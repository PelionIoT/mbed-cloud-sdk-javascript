import { Entity } from "../../../common/entity";
import { ApiKeyStatusEnum } from "./types";
/**
 *ApiKey
 */
export interface ApiKey extends Entity {
    /**
     *accountId
     */
    accountId?: string;

    /**
     *createdAt
     */
    createdAt?: Date;

    /**
     *creationTime
     */
    creationTime?: number;

    /**
     *id
     */
    id?: string;

    /**
     *key
     */
    key?: string;

    /**
     *lastLoginTime
     */
    lastLoginTime?: number;

    /**
     *name
     */
    name?: string;

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
    updatedAt?: Date;
}
