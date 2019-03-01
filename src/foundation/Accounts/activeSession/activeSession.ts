import { Entity } from "common/entity";
/**
 *ActiveSession
 */
export interface ActiveSession extends Entity {
    /**
     *accountId
     */
    readonly accountId?: string;

    /**
     *ipAddress
     */
    readonly ipAddress?: string;

    /**
     *loginTime
     */
    readonly loginTime?: Date;

    /**
     *referenceToken
     */
    readonly referenceToken?: string;

    /**
     *userAgent
     */
    readonly userAgent?: string;
}
