/// <reference types="node" />
import { Repository } from "../../../common/repository";
import { DeviceEnrollmentBulkCreate } from "./deviceEnrollmentBulkCreate";
import { ReadStream } from "fs";
/**
 *DeviceEnrollmentBulkCreate repository
 */
export declare class DeviceEnrollmentBulkCreateRepository extends Repository {
    /**
     * create
     * @param enrollmentIdentities - The `CSV` file containing the enrollment IDs. The maximum file size is 10 MB.
     */
    create(enrollmentIdentities: ReadStream | Buffer | File | Blob): Promise<DeviceEnrollmentBulkCreate>;
    /**
     * downloadErrorsReportFile
     * @param model - model
     */
    downloadErrorsReportFile(model: DeviceEnrollmentBulkCreate): Promise<ReadStream | Buffer | File | Blob>;
    /**
     * downloadFullReportFile
     * @param model - model
     */
    downloadFullReportFile(model: DeviceEnrollmentBulkCreate): Promise<ReadStream | Buffer | File | Blob>;
    /**
     * read
     * @param id - Bulk ID
     */
    read(id: string): Promise<DeviceEnrollmentBulkCreate>;
}
