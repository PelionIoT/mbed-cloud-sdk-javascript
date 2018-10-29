import { EntityBase } from "../../../common/entityBase";

/**
 * LoginHistory
 */
export class LoginHistory extends EntityBase {
    /**
     * UTC time RFC3339 for this login attempt.
     */
    public date?: Date;

    /**
     * IP address of the client.
     */
    public ipAddress?: string;

    /**
     * Flag indicating whether login attempt was successful or not.
     */
    public success?: boolean;

    /**
     * User Agent header from the login request.
     */
    public userAgent?: string;
}
