import { Entity } from "../../../common/entity";
import { DeviceEnrollmentBulkCreateStatusEnum } from "./types";
/**
 *DeviceEnrollmentBulkCreate
 */
export interface DeviceEnrollmentBulkCreate extends Entity {
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
     *id
     */
    id?: string;

    /**
     *processedCount
     */
    processedCount?: number;

    /**
     *status
     */
    status?: DeviceEnrollmentBulkCreateStatusEnum;

    /**
     *totalCount
     */
    totalCount?: number;
}
