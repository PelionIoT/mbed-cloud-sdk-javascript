import { ServicePackage } from "./servicePackage";
export declare class QuotaHistory {
    /**
     * Id
     */
    readonly id: string;
    /**
     * Date service package was created
     */
    readonly createdAt?: Date;
    /**
     * Remaining firmware updates
     */
    readonly delta?: number;
    /**
     * Account Id
     */
    readonly accountId?: string;
    /**
     * Name of linked campaign
     */
    readonly campaignName?: string;
    /**
     * The service package
     */
    readonly servicePackage?: ServicePackage;
    /**
     * Reason
     */
    readonly reason?: string;
    constructor(init: Partial<QuotaHistory>);
}
