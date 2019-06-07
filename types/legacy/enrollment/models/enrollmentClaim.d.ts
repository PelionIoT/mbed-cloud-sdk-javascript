import { AddEnrollmentClaim } from "../types";
import { EnrollmentApi } from "../enrollmentApi";
import { CallbackFn } from "../../common/interfaces";
export declare class EnrollmentClaim {
    private readonly _api;
    /**
     * Enrollment internal id.
     */
    readonly id: string;
    /**
     * muid
     */
    readonly accountId: string;
    /**
     * The time of the enrollment identity creation.
     */
    readonly createdAt: Date;
    /**
     * The time of claiming the device to the account
     */
    readonly claimedAt?: Date;
    /**
     * The id of the device in the device directory once it has been registered
     */
    readonly deviceId?: string;
    /**
     * The enrollment claim expiration time. If the device does not connect to Pelion Device Management before the expiration, the claim is removed without a separate notice.
     */
    readonly expiresAt: Date;
    constructor(init: Partial<EnrollmentClaim>, _api: EnrollmentApi);
    /**
     * Delete this enrollment claim.
     * @returns Promise containing any error
     */
    delete(): Promise<void>;
    /**
     * Delete this enrollment claim.
     * @param callback A function that is passed any error
     */
    delete(callback: CallbackFn<void>): void;
}
export interface EnrollmentClaim extends AddEnrollmentClaim {
}
