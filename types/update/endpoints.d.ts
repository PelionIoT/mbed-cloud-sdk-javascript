import { ConnectionOptions } from "../helpers/interfaces";
import { DefaultApi as FirmwareAPI } from "../_api/firmware_catalog";
import { DefaultApi as DeploymentAPI } from "../_api/deployment_service";
export declare class Endpoints {
    firmware: FirmwareAPI;
    deployment: DeploymentAPI;
    constructor(options: ConnectionOptions);
}
