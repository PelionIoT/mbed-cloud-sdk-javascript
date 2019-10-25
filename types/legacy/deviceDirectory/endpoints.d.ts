import { DefaultApi as DirectoryApi } from "../_api/device_directory";
import { EndpointsBase } from "../common/endpointsBase";
import { ConfigOptions } from "../../common/config";
export declare class Endpoints extends EndpointsBase {
    directory: DirectoryApi;
    constructor(options?: ConfigOptions);
}
