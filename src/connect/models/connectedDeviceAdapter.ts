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

import {
    Endpoint as apiConnectedDevice
} from "../../_api/mds";
import { ConnectApi } from "../index";
import { ConnectedDevice } from "./connectedDevice";

/**
 * Connected Device Adapter
 */
export class ConnectedDeviceAdapter {

    static map(from: apiConnectedDevice, api: ConnectApi): ConnectedDevice {
        return new ConnectedDevice({
            id:           from.name,
            type:         from.type,
            state:        (from.status && from.status.toLowerCase() === "active") ? "active" : "stale",
            queueMode:    from.q
        }, api);
    }
}
