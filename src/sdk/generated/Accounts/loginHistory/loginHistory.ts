import { Entity } from "../../../common/entity";
/**
 *LoginHistory
 */
export interface LoginHistory extends Entity {
    /**
     *date
     */
    date?: Date;

    /**
     *ipAddress
     */
    ipAddress?: string;

    /**
     *success
     */
    success?: boolean;

    /**
     *userAgent
     */
    userAgent?: string;
}
