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

import { TlvDataType } from "../../..";
import { Resource as apiResource } from "../../_api/mds";
import { Resource } from "./resource";

/**
 * Resource Adapter
 */
export class ResourceAdapter {
    public static map(from: apiResource, deviceId: string): Resource {
        return {
            contentType: from.rt,
            observable: from.obs,
            type: TlvDataType[from.type],
            path: from.uri,
            deviceId,
        };
    }
}
