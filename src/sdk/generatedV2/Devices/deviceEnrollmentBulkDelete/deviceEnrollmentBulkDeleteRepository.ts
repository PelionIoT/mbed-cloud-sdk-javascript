import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../common/functions";
import { DeviceEnrollmentBulkDelete } from "./deviceEnrollmentBulkDelete";
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
            (_data, done) => {
                done(null, null);
            }
        );
    }
    public downloadErrorsReportFile(): Promise<ReadStream | Buffer | File | Blob> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "",
                        method: "GET",
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
    public downloadFullReportFile(): Promise<ReadStream | Buffer | File | Blob> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "",
                        method: "GET",
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
    public get(id: string): Promise<DeviceEnrollmentBulkDelete> {
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
            (_data, done) => {
                done(null, null);
            }
        );
    }
}
