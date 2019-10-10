import { ActiveServicePackage, PreviousServicePackage, PendingServicePackage, ServicePackageQuotaHistoryServicePackage } from "../../_api/billing";
import { ServicePackage } from "./servicePackage";
/**
 * Internal
 * @ignore
 */
export declare const mapActive: (from: ActiveServicePackage) => ServicePackage;
/**
 * Internal
 * @ignore
 */
export declare const mapPending: (from: PendingServicePackage) => ServicePackage;
/**
 * Internal
 * @ignore
 */
export declare const mapPrevious: (from: PreviousServicePackage) => ServicePackage;
/**
 * Internal
 * @ignore
 */
export declare const mapQuotaHistoryServicePackage: (from: ServicePackageQuotaHistoryServicePackage) => ServicePackage;
