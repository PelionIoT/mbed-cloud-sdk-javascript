import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { DeviceEnrollmentBulkCreate } from "./deviceEnrollmentBulkCreate";
import { DeviceEnrollmentBulkCreateAdapter } from "../../index";
import { downloadErrorsReportFile } from "../../../common/privateFunctions";
import { downloadFullReportFile } from "../../../common/privateFunctions";
import { ReadStream } from "fs";
/**
 *DeviceEnrollmentBulkCreate repository
 */
export class DeviceEnrollmentBulkCreateRepository extends Repository {
    /**
     * create
     * @returns Promise<DeviceEnrollmentBulkCreate>
     * @param enrollmentIdentities *required*
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
                        contentTypes: [ "multipart/form-data" ],
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
     * @returns Promise<ReadStream | Buffer | File | Blob>
     * @param model *required*
     */
    public downloadErrorsReportFile(model: DeviceEnrollmentBulkCreate): Promise<ReadStream | Buffer | File | Blob> {
        return downloadErrorsReportFile(this, model);
    }
    /**
     * downloadFullReportFile
     * @returns Promise<ReadStream | Buffer | File | Blob>
     * @param model *required*
     */
    public downloadFullReportFile(model: DeviceEnrollmentBulkCreate): Promise<ReadStream | Buffer | File | Blob> {
        return downloadFullReportFile(this, model);
    }
    /**
     * read
     * @returns Promise<DeviceEnrollmentBulkCreate>
     * @param id *required*
     */
    public read(id: string): Promise<DeviceEnrollmentBulkCreate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/device-enrollments-bulk-uploads/{id}",
                        method: "GET",
                        pathParams: {
                            id: id,
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
