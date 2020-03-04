import { ConfigOptions } from "../../common/config";
import { PublicAPIApi as EnrollmentApi } from "../_api/enrollment";
import { EndpointsBase } from "../common/endpointsBase";
export declare class Endpoints extends EndpointsBase {
    readonly enrollment: EnrollmentApi;
    constructor(options?: ConfigOptions);
}
