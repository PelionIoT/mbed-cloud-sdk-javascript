/**
 * Login History
 */
export class LoginHistory {

    /**
     * Date of login
     */
    public readonly date?: Date;
    /**
     * User agent used for login
     */
    public readonly userAgent?: string;
    /**
     * IP Address login from
     */
    public readonly ipAddress?: string;
    /**
     * Whether login was successful
     */
    public readonly success?: boolean;
}
