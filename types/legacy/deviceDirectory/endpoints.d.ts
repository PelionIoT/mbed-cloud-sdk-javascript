import { ConnectionOptions } from "../common/interfaces";
import { DefaultApi as DirectoryApi } from "../_api/device_directory";
import { EndpointsBase } from "../common/endpointsBase";
export declare class Endpoints extends EndpointsBase {
    directory: DirectoryApi;
    constructor(options?: ConnectionOptions);
}
