export interface LoginHistory {
    /**
     * UTC time RFC3339 for this login attempt.
     */
    readonly date?: Date;

    /**
     * IP address of the client.
     */
    readonly ipAddress?: string;

    /**
     * Flag indicating whether login attempt was successful or not.
     */
    readonly success?: boolean;

    /**
     * User Agent header from the login request.
     */
    readonly userAgent?: string;
}
