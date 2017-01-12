import { ConnectionOptions } from "../helpers/interfaces";
import { DefaultApi as DevelopmentApi } from "../_api/developer_certificate";
export declare class Api {
    development: DevelopmentApi;
    constructor(options: ConnectionOptions);
}
