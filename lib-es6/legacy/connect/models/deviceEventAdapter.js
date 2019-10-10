/*
* Pelion Device Management JavaScript SDK
* Copyright Arm Limited 2017
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
import { Resource } from "./resource";
/**
 * Device Event Adapter
 */
export class DeviceEventAdapter {
    static mapResource(from, deviceId, api) {
        return new Resource({
            contentType: from.ct,
            observable: from.obs,
            type: from.rt,
            path: from.path,
            deviceId: deviceId,
        }, api);
    }
    static map(from, api, event) {
        let resources = [];
        if (from && from.resources) {
            resources = from.resources.map(resource => {
                return DeviceEventAdapter.mapResource(resource, from.ep, api);
            });
        }
        return {
            id: from.ep,
            type: from.ept,
            queueMode: from.q,
            resources: resources,
            event: event,
        };
    }
    static mapId(from, event) {
        // map an id to a sparse DeviceEvent object for observing.
        return {
            id: from,
            event: event,
        };
    }
}
//# sourceMappingURL=deviceEventAdapter.js.map