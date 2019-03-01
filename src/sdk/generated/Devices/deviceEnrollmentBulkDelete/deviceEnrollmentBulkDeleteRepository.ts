import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../legacy/common/functions";
import { DeviceEnrollmentBulkDelete } from "./deviceEnrollmentBulkDelete";
import { DeviceEnrollmentBulkDeleteAdapter } from "../../index";
import { downloadErrorsReportFile } from "../../../common/privateFunctions";
import { downloadFullReportFile } from "../../../common/privateFunctions";
import { ReadStream } from "fs";
/**
 *DeviceEnrollmentBulkDelete repository
 */
export class DeviceEnrollmentBulkDeleteRepository extends Repository {
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
                        contentTypes: [ "multipart/form-data" ],
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, DeviceEnrollmentBulkDeleteAdapter.fromApi(data));
            }
        );
    }
    public downloadErrorsReportFile(model: DeviceEnrollmentBulkDelete): Promise<ReadStream | Buffer | File | Blob> {
        return downloadErrorsReportFile(this, model);
    }
    public downloadFullReportFile(model: DeviceEnrollmentBulkDelete): Promise<ReadStream | Buffer | File | Blob> {
        return downloadFullReportFile(this, model);
    }
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
