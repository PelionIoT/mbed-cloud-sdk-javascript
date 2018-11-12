import { ReadStream } from "fs";
import { EntityBase } from "../../../common/entityBase";
import * as privateFunctions from "../../../common/privateFunctions";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";
import { DeviceEnrollmentBulkCreateStatusEnum } from "../../enums";

/**
 * DeviceEnrollmentBulkCreate
 */
export class DeviceEnrollmentBulkCreate extends EntityBase {
    /**
     * ID
     */
    public accountId?: string;

    /**
     * The time of completing the bulk creation task.
     */
    public completedAt?: Date;

    /**
     * The time of receiving the bulk creation task.
     */
    public createdAt?: Date;

    /**
     * The number of enrollment identities with failed processing.
     */
    public errorsCount?: number;

    /**
     * errors_report_file
     */
    public errorsReportFile?: string;

    /**
     * full_report_file
     */
    public fullReportFile?: string;

    /**
     * The number of enrollment identities processed until now.
     */
    public processedCount?: number;

    /**
     * The state of the process is &#39;new&#39; at the time of creation. If the creation is still in progress, the state is shown as &#39;processing&#39;. When the request has been fully processed, the state changes to &#39;completed&#39;.
     */
    public status?: DeviceEnrollmentBulkCreateStatusEnum;

    /**
     * Total number of enrollment identities found in the input CSV.
     */
    public totalCount?: number;

    constructor(config?: Config) {
        super(config);
    }

    /**
     * creates a DeviceEnrollmentBulkCreate.
     * @returns Promise containing DeviceEnrollmentBulkCreate.
     */
    public create(enrollmentIdentities: ReadStream | Buffer | File | Blob): Promise<DeviceEnrollmentBulkCreate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<DeviceEnrollmentBulkCreate>(
                    {
                        url: "/v3/device-enrollments-bulk-uploads",
                        method: "POST",
                        formParams: {
                            enrollment_identities: enrollmentIdentities,
                        },
                        contentTypes: [ "multipart/form-data" ],
                    },
                    this,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * gets a DeviceEnrollmentBulkCreate.
     * @returns Promise containing DeviceEnrollmentBulkCreate.
     */
    public get(): Promise<DeviceEnrollmentBulkCreate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<DeviceEnrollmentBulkCreate>(
                    {
                        url: "/v3/device-enrollments-bulk-uploads/{id}",
                        method: "GET",
                        pathParams: {
                            id: this.id,
                        },
                    },
                    this,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * getErrorsReportFiles a ReadStream | Buffer | File | Blob.
     * @returns Promise containing ReadStream | Buffer | File | Blob.
     */
    public getErrorsReportFile(): Promise<ReadStream | Buffer | File | Blob> {
        return privateFunctions.getErrorsReportFile(this);
    }

    /**
     * getFullReportFiles a ReadStream | Buffer | File | Blob.
     * @returns Promise containing ReadStream | Buffer | File | Blob.
     */
    public getFullReportFile(): Promise<ReadStream | Buffer | File | Blob> {
        return privateFunctions.getFullReportFile(this);
    }
}
