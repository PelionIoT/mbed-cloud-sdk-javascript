import { ReadStream } from "fs";
import { downloadErrorsReportFile } from "../../../common/privateFunctions";
import { downloadFullReportFile } from "../../../common/privateFunctions";
import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { DeviceEnrollmentBulkCreateAdapter } from "../../index";
import { DeviceEnrollmentBulkCreate } from "./deviceEnrollmentBulkCreate";
/**
 *DeviceEnrollmentBulkCreate repository
 */
export class DeviceEnrollmentBulkCreateRepository extends Repository {
    /**
     * create
     * @param enrollmentIdentities - The `CSV` file containing the enrollment IDs. The maximum file size is 10 MB.
     */
    public create(enrollmentIdentities: ReadStream | Buffer | File | Blob): Promise<DeviceEnrollmentBulkCreate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/device-enrollments-bulk-uploads",
                        method: "POST",
                        formParams: {
                            enrollment_identities: enrollmentIdentities,
                        },
                        contentTypes: ["multipart/form-data"],
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, DeviceEnrollmentBulkCreateAdapter.fromApi(data));
            }
        );
    }
    /**
     * downloadErrorsReportFile
     * @param model - model
     */
    public downloadErrorsReportFile(model: DeviceEnrollmentBulkCreate): Promise<ReadStream | Buffer | File | Blob> {
        return downloadErrorsReportFile(this, model);
    }
    /**
     * downloadFullReportFile
     * @param model - model
     */
    public downloadFullReportFile(model: DeviceEnrollmentBulkCreate): Promise<ReadStream | Buffer | File | Blob> {
        return downloadFullReportFile(this, model);
    }
    /**
     * read
     * @param id - Bulk ID
     */
    public read(id: string): Promise<DeviceEnrollmentBulkCreate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/device-enrollments-bulk-uploads/{id}",
                        method: "GET",
                        pathParams: {
                            id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, DeviceEnrollmentBulkCreateAdapter.fromApi(data));
            }
        );
    }
}
