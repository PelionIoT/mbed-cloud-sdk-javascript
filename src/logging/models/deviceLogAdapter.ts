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

import { DeviceLog } from "./deviceLog";
import { DeviceLogData as apiDeviceLog } from "../../_api/device_catalog";

/*
 * Device Log Adapter
 */
export class DeviceLogAdapter {

    static map(from: apiDeviceLog): DeviceLog {
        return new DeviceLog({
            id:                      from.id || from.device_log_id,
            eventDate:               from.date_time,
            stateChanged:            from.state_change,
            description:             from.description,
            changes:                 from.changes,
            eventTypeDescription:    from.event_type_description,
            eventType:               from.event_type,
            data:                    from.data,
            deviceId:                from.device_id
        });
    }
}
