import { EntityBase } from "../../../common/entityBase";

/**
 * Login History
 */
export class LoginHistory extends EntityBase {
    /**
     * Date of login
     */
    public date?: Date;
    /**
     * User agent used for login
     */
    public userAgent?: string;
    /**
     * IP Address login from
     */
    public ipAddress?: string;
    /**
     * Whether login was successful
     */
    public success?: boolean;
}
