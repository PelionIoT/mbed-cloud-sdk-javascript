import { ConnectionOptions } from "../common/interfaces";
import { DefaultApi as DirectoryApi } from "../_api/device_directory";
export declare class Endpoints {
    directory: DirectoryApi;
    constructor(options: ConnectionOptions);
}
