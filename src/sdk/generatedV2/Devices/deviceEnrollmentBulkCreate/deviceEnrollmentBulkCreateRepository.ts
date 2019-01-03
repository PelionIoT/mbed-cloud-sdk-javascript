import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../common/functions";
import { DeviceEnrollmentBulkCreate } from "./deviceEnrollmentBulkCreate";
import { ReadStream } from "fs";
/**
 *DeviceEnrollmentBulkCreate repository
 */
export class DeviceEnrollmentBulkCreateRepository extends Repository {
    public create(enrollmentIdentities: ReadStream | Buffer | File | Blob): Promise<DeviceEnrollmentBulkCreate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/device-enrollments-bulk-uploads",
                        method: "POST",
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
    public get(id: string): Promise<DeviceEnrollmentBulkCreate> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/device-enrollments-bulk-uploads/{id}",
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
}
