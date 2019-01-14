import { Entity } from "../../../common/entity";
import { DeviceEnrollmentBulkDeleteStatusEnum } from "./types";
/**
 *DeviceEnrollmentBulkDelete
 */
export interface DeviceEnrollmentBulkDelete extends Entity {
    /**
     *accountId
     */
    accountId?: string;

    /**
     *completedAt
     */
    completedAt?: Date;

    /**
     *createdAt
     */
    createdAt?: Date;

    /**
     *errorsCount
     */
    errorsCount?: number;

    /**
     *errorsReportFile
     */
    errorsReportFile?: string;

    /**
     *fullReportFile
     */
    fullReportFile?: string;

    /**
     *processedCount
     */
    processedCount?: number;

    /**
     *status
     */
    status?: DeviceEnrollmentBulkDeleteStatusEnum;

    /**
     *totalCount
     */
    totalCount?: number;
}
