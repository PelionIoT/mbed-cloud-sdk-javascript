import { ActiveServicePackage, PreviousServicePackage, PendingServicePackage, ServicePackageQuotaHistoryServicePackage } from "../../_api/billing";
import { ServicePackage } from "./servicePackage";
export declare const mapActive: (from: ActiveServicePackage) => ServicePackage;
export declare const mapPending: (from: PendingServicePackage) => ServicePackage;
export declare const mapPrevious: (from: PreviousServicePackage) => ServicePackage;
export declare const mapQuotaHistoryServicePackage: (from: ServicePackageQuotaHistoryServicePackage) => ServicePackage;
