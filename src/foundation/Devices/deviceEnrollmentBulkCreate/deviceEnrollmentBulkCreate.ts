import { Entity } from "common/entity";
import { DeviceEnrollmentBulkCreateStatusEnum } from "./types";
/**
 *DeviceEnrollmentBulkCreate
 */
export interface DeviceEnrollmentBulkCreate extends Entity {
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
    readonly status?: DeviceEnrollmentBulkCreateStatusEnum;

    /**
     *totalCount
     */
    readonly totalCount?: number;
}
