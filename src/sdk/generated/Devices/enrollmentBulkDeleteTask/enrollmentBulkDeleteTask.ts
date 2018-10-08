import { ReadStream } from "fs";
import { EntityBase } from "../../../common/entityBase";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";
import { EnrollmentBulkDeleteTaskStatusEnum } from "../../enums";

/**
 * EnrollmentBulkDeleteTask
 */
export class EnrollmentBulkDeleteTask extends EntityBase {
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
    public status?: EnrollmentBulkDeleteTaskStatusEnum;

    /**
     * Total number of enrollment identities found in the input CSV.
     */
    public totalCount?: number;

    constructor(config?: Config) {
        super(config);
    }

    /**
     * deletes a EnrollmentBulkDeleteTask.
     * @returns Promise containing EnrollmentBulkDeleteTask.
     */
    public delete(enrollmentIdentities: ReadStream | Buffer | File | Blob): Promise<EnrollmentBulkDeleteTask> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<EnrollmentBulkDeleteTask>(
                    {
                        url: "/v3/device-enrollments-bulk-deletes",
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
     * gets a EnrollmentBulkDeleteTask.
     * @returns Promise containing EnrollmentBulkDeleteTask.
     */
    public get(): Promise<EnrollmentBulkDeleteTask> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<EnrollmentBulkDeleteTask>(
                    {
                        url: "/v3/device-enrollments-bulk-deletes/{id}",
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
}
