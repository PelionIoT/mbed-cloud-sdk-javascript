import { ListOptions } from "../../../common";
import { extractFilter } from "../../../common/filters";
import { Repository } from "../../../common/repository";
import { Page, Paginator } from "../../../index";
import { apiWrapper } from "../../../legacy/common/functions";
import { DeviceEnrollmentDenialAdapter } from "../../index";
import { DeviceEnrollmentDenial } from "./deviceEnrollmentDenial";
import { DeviceEnrollmentDenialListOptions } from "./types";
/**
 *DeviceEnrollmentDenial repository
 */
export class DeviceEnrollmentDenialRepository extends Repository {
    /**
     * list
     * @param options - Options to use for the List
     */
    public list(options?: DeviceEnrollmentDenialListOptions): Paginator<DeviceEnrollmentDenial, ListOptions> {
        const pageFunc = (pageOptions: DeviceEnrollmentDenialListOptions): Promise<Page<DeviceEnrollmentDenial>> => {
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
                (data: Page<DeviceEnrollmentDenial>, done) => {
                    done(null, new Page(data, data.data, DeviceEnrollmentDenialAdapter.fromApi, pageOptions));
                },
                null
            );
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param deviceEnrollmentDenialId - id of the recorded failed bootstrap attempt
     */
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
