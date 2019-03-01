import { Entity } from "common/entity";
/**
 *LoginHistory
 */
export interface LoginHistory extends Entity {
    /**
     *date
     */
    readonly date?: Date;

    /**
     *ipAddress
     */
    readonly ipAddress?: string;

    /**
     *success
     */
    readonly success?: boolean;

    /**
     *userAgent
     */
    readonly userAgent?: string;
}
