import { DefaultApi as UpdateApi } from "../_api/update_service";
import { EndpointsBase } from "../common/endpointsBase";
import { ConfigOptions } from "../../common/config";
export declare class Endpoints extends EndpointsBase {
    update: UpdateApi;
    constructor(options?: ConfigOptions);
}
