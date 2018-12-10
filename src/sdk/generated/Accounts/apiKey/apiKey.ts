import { Entity } from "../../../common/entity";
import { ApiKeyStatusEnum } from "./types";

/**
 * ApiKey
 */
export interface ApiKey extends Entity {
    /**
     * Creation UTC time RFC3339.
     */
    readonly createdAt?: Date;

    /**
     * The timestamp of the API key creation in the storage, in milliseconds.
     */
    readonly creationTime?: number;

    /**
     * A list of group IDs this API key belongs to.
     */
    readonly groups?: Array<string>;

    /**
     * The API key.
     */
    readonly key?: string;

    /**
     * The timestamp of the latest API key usage, in milliseconds.
     */
    readonly lastLoginTime?: number;

    /**
     * The display name for the API key.
     */
    readonly name?: string;

    /**
     * The owner of this API key, who is the creator by default.
     */
    readonly owner?: string;

    /**
     * The status of the API key.
     */
    readonly status?: ApiKeyStatusEnum;

    /**
     * Last update UTC time RFC3339.
     */
    readonly updatedAt?: Date;
}
