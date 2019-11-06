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

import { TlvDataType } from "../../../common";
import { EndpointData as apiDeviceEvent, ResourcesData as apiResourceEvent } from "../../_api/mds";
import { DeviceEvent, DeviceEventEnum } from "../types";
import { Resource } from "./resource";

/**
 * Device Event Adapter
 */
export class DeviceEventAdapter {
    public static mapResource(from: apiResourceEvent, deviceId: string): Resource {
        return {
            contentType: from.rt,
            observable: from.obs,
            type: TlvDataType[from.ct],
            path: from.path,
            deviceId,
        };
    }

    public static map(from: apiDeviceEvent, event: DeviceEventEnum): DeviceEvent<Resource> {
        let resources = [];

        if (from && from.resources) {
            resources = from.resources.map(resource => {
                return DeviceEventAdapter.mapResource(resource, from.ep);
            });
        }

        return {
            id: from.ep,
            type: from.ept,
            queueMode: from.q,
            resources,
            event,
        };
    }

    public static mapId(from: string, event: DeviceEventEnum): DeviceEvent<Resource> {
        // map an id to a sparse DeviceEvent object for observing.
        return {
            id: from,
            event,
        };
    }
}
