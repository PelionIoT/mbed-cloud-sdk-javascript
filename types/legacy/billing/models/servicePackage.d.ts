export declare class ServicePackage {
    /**
     * Id
     */
    readonly id: string;
    /**
     * Created At
     */
    readonly createdAt?: Date;
    /**
     * ExpiresAt
     */
    readonly expiresAt?: Date;
    /**
     * EndsAt
     */
    readonly endsAt?: Date;
    /**
     * ModifiedAt
     */
    readonly modifiedAt?: Date;
    /**
     * StartsAt
     */
    readonly startsAt?: Date;
    /**
     * Firmware Update Count
     */
    readonly firmwareUpdateCount?: number;
    /**
     * Grace Period
     */
    readonly gracePeriod?: boolean;
    /**
     * Next Id
     */
    readonly nextId?: string;
    /**
     * PreviousId
     */
    readonly previousId?: string;
    /**
     * Reason
     */
    readonly reason?: string;
    /**
     * State
     */
    readonly state?: string;
    constructor(init: Partial<ServicePackage>);
}
