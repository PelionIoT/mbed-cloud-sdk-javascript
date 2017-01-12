import { ConnectionOptions } from "../helpers/interfaces";
import { DefaultApi as CatalogApi } from "../_api/device_catalog";
export declare class Api {
    catalog: CatalogApi;
    constructor(options: ConnectionOptions);
}
