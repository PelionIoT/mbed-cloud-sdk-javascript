import { DeviceEnrollmentBulkDeleteStatusEnum } from "./types";
/**
 *DeviceEnrollmentBulkDelete
 */
export interface DeviceEnrollmentBulkDelete {
    /**
     *accountId
     */
    accountId: string;

    /**
     *completedAt
     */
    completedAt: Date;

    /**
     *createdAt
     */
    createdAt: Date;

    /**
     *errorsCount
     */
    errorsCount: number;

    /**
     *errorsReportFile
     */
    errorsReportFile: string;

    /**
     *fullReportFile
     */
    fullReportFile: string;

    /**
     *id
     */
    id: string;

    /**
     *processedCount
     */
    processedCount: number;

    /**
     *status
     */
    status: DeviceEnrollmentBulkDeleteStatusEnum;

    /**
     *totalCount
     */
    totalCount: number;
}
