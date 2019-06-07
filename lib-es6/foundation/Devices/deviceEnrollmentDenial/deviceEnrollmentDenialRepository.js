import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { extractFilter } from "../../../common/filters";
import { DeviceEnrollmentDenialAdapter } from "../../index";
import { Paginator } from "../../../common/pagination";
import { ListResponse } from "../../../legacy/common/listResponse";
/**
 *DeviceEnrollmentDenial repository
 */
export class DeviceEnrollmentDenialRepository extends Repository {
    /**
     * list
     * @param options - Options to use for the List
     */
    list(options) {
        const pageFunc = (pageOptions) => {
            pageOptions = pageOptions || {};
            return apiWrapper(resultsFn => {
                this.client._CallApi({
                    url: "/v3/device-enrollment-denials",
                    method: "GET",
                    query: {
                        trusted_certificate_id__eq: extractFilter(pageOptions.filter, "trustedCertificateId", "eq"),
                        endpoint_name__eq: extractFilter(pageOptions.filter, "endpointName", "eq"),
                        after: pageOptions.after,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                }, resultsFn);
            }, (data, done) => {
                done(null, new ListResponse(data, data.data, DeviceEnrollmentDenialAdapter.fromApi));
            }, null);
        };
        return new Paginator(pageFunc, options);
    }
    /**
     * read
     * @param deviceEnrollmentDenialId - id of the recorded failed bootstrap attempt
     */
    read(deviceEnrollmentDenialId) {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/device-enrollment-denials/{device_enrollment_denial_id}",
                method: "GET",
                pathParams: {
                    device_enrollment_denial_id: deviceEnrollmentDenialId,
                },
            }, resultsFn);
        }, (data, done) => {
            done(null, DeviceEnrollmentDenialAdapter.fromApi(data));
        });
    }
}
//# sourceMappingURL=deviceEnrollmentDenialRepository.js.map