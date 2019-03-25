import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { DeviceEnrollmentDenial } from "./deviceEnrollmentDenial";
import { extractFilter } from "../../../common/filters";
import { DeviceEnrollmentDenialListOptions } from "./types";
import { DeviceEnrollmentDenialAdapter } from "../../index";
import { Paginator } from "../../../common/pagination";
import { ListResponse } from "../../../legacy/common/listResponse";
import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *DeviceEnrollmentDenial repository
 */
export class DeviceEnrollmentDenialRepository extends Repository {
    public list(options?: DeviceEnrollmentDenialListOptions): Paginator<DeviceEnrollmentDenial, ListOptions> {
        const pageFunc = (
            pageOptions: DeviceEnrollmentDenialListOptions
        ): Promise<ListResponse<DeviceEnrollmentDenial>> => {
            pageOptions = pageOptions || {};
            return apiWrapper(
                resultsFn => {
                    this.client._CallApi(
                        {
                            url: "/v3/device-enrollment-denials",
                            method: "GET",
                            query: {
                                trusted_certificate_id__eq: extractFilter(
                                    pageOptions.filter,
                                    "trustedCertificateId",
                                    "eq"
                                ),
                                endpoint_name__eq: extractFilter(pageOptions.filter, "endpointName", "eq"),
                                after: pageOptions.after,
                                limit: pageOptions.limit,
                                order: pageOptions.order,
                            },
                        },
                        resultsFn
                    );
                },
                (data: ListResponse<DeviceEnrollmentDenial>, done) => {
                    done(null, new ListResponse(data, data.data, DeviceEnrollmentDenialAdapter.fromApi));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }
    public read(deviceEnrollmentDenialId: string): Promise<DeviceEnrollmentDenial> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/device-enrollment-denials/{device_enrollment_denial_id}",
                        method: "GET",
                        pathParams: {
                            device_enrollment_denial_id: deviceEnrollmentDenialId,
                        },
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, DeviceEnrollmentDenialAdapter.fromApi(data));
            }
        );
    }
}
