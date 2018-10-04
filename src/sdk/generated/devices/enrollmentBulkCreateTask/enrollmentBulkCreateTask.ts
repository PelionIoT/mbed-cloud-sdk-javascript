import { EntityBase } from "../../../common/entityBase";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";
import { EnrollmentBulkCreateTaskStatusEnum } from "../../enums";

/**
 * EnrollmentBulkCreateTask
 */
export class EnrollmentBulkCreateTask extends EntityBase {
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
    public status?: EnrollmentBulkCreateTaskStatusEnum;

    /**
     * Total number of enrollment identities found in the input CSV.
     */
    public totalCount?: number;

    constructor(config?: Config) {
        super(config);
    }

    /**
     * creates a EnrollmentBulkCreateTask.
     * @returns Promise containing EnrollmentBulkCreateTask.
     */
    public create(enrollmentIdentities: ReadableStream | File | Blob): Promise<EnrollmentBulkCreateTask> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<EnrollmentBulkCreateTask>(
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
     * gets a EnrollmentBulkCreateTask.
     * @returns Promise containing EnrollmentBulkCreateTask.
     */
    public get(): Promise<EnrollmentBulkCreateTask> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<EnrollmentBulkCreateTask>(
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
}
