/**
 * Login History
 */
export declare class LoginHistory {
    /**
     * Date of login
     */
    readonly date?: Date;
    /**
     * User agent used for login
     */
    readonly userAgent?: string;
    /**
     * IP Address login from
     */
    readonly ipAddress?: string;
    /**
     * Whether login was successful
     */
    readonly success?: boolean;
    constructor(init: Partial<LoginHistory>);
}
