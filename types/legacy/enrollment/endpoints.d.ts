import { EndpointsBase } from "../common/endpointsBase";
import { PublicAPIApi as EnrollmentApi } from "../_api/enrollment";
import { ConfigOptions } from "../../common/config";
export declare class Endpoints extends EndpointsBase {
    readonly enrollment: EnrollmentApi;
    constructor(options?: ConfigOptions);
}
