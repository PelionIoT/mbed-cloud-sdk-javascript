import { Entity } from "../../../common/entity";
import { DeviceEnrollmentBulkDeleteStatus } from "./types";
/**
 *DeviceEnrollmentBulkDelete
 */
export interface DeviceEnrollmentBulkDelete extends Entity {
    /**
     *accountId
     */
    readonly accountId?: string;

    /**
     *completedAt
     */
    readonly completedAt?: Date;

    /**
     *createdAt
     */
    readonly createdAt?: Date;

    /**
     *errorsCount
     */
    readonly errorsCount?: number;

    /**
     *errorsReportFile
     */
    readonly errorsReportFile?: string;

    /**
     *fullReportFile
     */
    readonly fullReportFile?: string;

    /**
     *processedCount
     */
    readonly processedCount?: number;

    /**
     *status
     */
    readonly status?: DeviceEnrollmentBulkDeleteStatus;

    /**
     *totalCount
     */
    readonly totalCount?: number;
}
