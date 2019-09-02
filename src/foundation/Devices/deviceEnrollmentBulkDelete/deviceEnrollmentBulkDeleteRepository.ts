import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { DeviceEnrollmentBulkDelete } from "./deviceEnrollmentBulkDelete";
import { DeviceEnrollmentBulkDeleteAdapter } from "../../index";
import { downloadErrorsReportFile } from "../../../common/privateFunctions";
import { downloadFullReportFile } from "../../../common/privateFunctions";
import { ReadStream } from "fs";
/**
 *DeviceEnrollmentBulkDelete repository
 */
export class DeviceEnrollmentBulkDeleteRepository extends Repository {
    /**
     * delete
     * @param enrollmentIdentities - The `CSV` file containing the enrollment IDs. The maximum file size is 10MB.
     */
    public delete(enrollmentIdentities: ReadStream | Buffer | File | Blob): Promise<DeviceEnrollmentBulkDelete> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/device-enrollments-bulk-deletes",
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
                done(null, DeviceEnrollmentBulkDeleteAdapter.fromApi(data));
            }
        );
    }
    /**
     * downloadErrorsReportFile
     * @param model - model
     */
    public downloadErrorsReportFile(model: DeviceEnrollmentBulkDelete): Promise<ReadStream | Buffer | File | Blob> {
        return downloadErrorsReportFile(this, model);
    }
    /**
     * downloadFullReportFile
     * @param model - model
     */
    public downloadFullReportFile(model: DeviceEnrollmentBulkDelete): Promise<ReadStream | Buffer | File | Blob> {
        return downloadFullReportFile(this, model);
    }
    /**
     * read
     * @param id - Bulk ID
     */
    public read(id: string): Promise<DeviceEnrollmentBulkDelete> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/device-enrollments-bulk-deletes/{id}",
                        method: "GET",
                        pathParams: {
                            id: id,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, DeviceEnrollmentBulkDeleteAdapter.fromApi(data));
            }
        );
    }
}
