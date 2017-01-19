import { ConnectionOptions } from "../helpers/interfaces";
import { DefaultApi as DevelopmentApi } from "../_api/developer_certificate";
export declare class Endpoints {
    development: DevelopmentApi;
    constructor(options: ConnectionOptions);
}
