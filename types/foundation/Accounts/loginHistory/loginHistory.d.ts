import { Entity } from "../../../common/entity";
/**
 *LoginHistory
 */
export interface LoginHistory extends Entity {
    /**
     *UTC time RFC3339 for this login attempt.
     *@example 2018-02-14T17:52:07Z
     */
    readonly date?: Date;
    /**
     *IP address of the client.
     *@example 127.0.0.1
     */
    readonly ipAddress?: string;
    /**
     *Flag indicating whether login attempt was successful or not.
     *@example true
     */
    readonly success?: boolean;
    /**
     *User Agent header from the login request.
     *@example Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36
     */
    readonly userAgent?: string;
}
