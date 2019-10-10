/// <reference types="node" />
import { Repository } from "../../../common/repository";
import { DeviceEnrollmentBulkDelete } from "./deviceEnrollmentBulkDelete";
import { ReadStream } from "fs";
/**
 *DeviceEnrollmentBulkDelete repository
 */
export declare class DeviceEnrollmentBulkDeleteRepository extends Repository {
    /**
     * delete
     * @param enrollmentIdentities - The `CSV` file containing the enrollment IDs. The maximum file size is 10MB.
     */
    delete(enrollmentIdentities: ReadStream | Buffer | File | Blob): Promise<DeviceEnrollmentBulkDelete>;
    /**
     * downloadErrorsReportFile
     * @param model - model
     */
    downloadErrorsReportFile(model: DeviceEnrollmentBulkDelete): Promise<ReadStream | Buffer | File | Blob>;
    /**
     * downloadFullReportFile
     * @param model - model
     */
    downloadFullReportFile(model: DeviceEnrollmentBulkDelete): Promise<ReadStream | Buffer | File | Blob>;
    /**
     * read
     * @param id - Bulk ID
     */
    read(id: string): Promise<DeviceEnrollmentBulkDelete>;
}
