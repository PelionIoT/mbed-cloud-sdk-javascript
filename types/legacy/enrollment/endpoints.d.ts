import { EndpointsBase } from "../common/endpointsBase";
import { ConnectionOptions } from "../common/interfaces";
import { PublicAPIApi as EnrollmentApi } from "../_api/enrollment";
export declare class Endpoints extends EndpointsBase {
    readonly enrollment: EnrollmentApi;
    constructor(options?: ConnectionOptions);
}
