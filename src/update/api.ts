/* 
* mbed Cloud JavaScript SDK
* Copyright ARM Limited 2017
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import { ConnectionOptions } from "../helpers/interfaces";
import {
    DefaultApi as FirmwareAPI,
    DefaultApiApiKeys as FirmwareAPIApiKeys
} from "../_api/firmware_catalog";
import {
    DefaultApi as DeploymentAPI,
    DefaultApiApiKeys as DeploymentAPIApiKeys
} from "../_api/deployment_service";

export class Api {

    firmware: FirmwareAPI;
    deployment: DeploymentAPI;

    constructor(options: ConnectionOptions) {
        this.firmware = new FirmwareAPI(options.host);
        this.deployment = new DeploymentAPI(options.host);

        this.firmware.setApiKey(FirmwareAPIApiKeys.Bearer, "Bearer " + options.accessKey);
        this.deployment.setApiKey(DeploymentAPIApiKeys.Bearer, "Bearer " + options.accessKey);
    }
}
