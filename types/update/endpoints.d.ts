import { ConnectionOptions } from "../common/interfaces";
import { DefaultApi as UpdateApi } from "../_api/update_service";
export declare class Endpoints {
    update: UpdateApi;
    constructor(options: ConnectionOptions);
}
