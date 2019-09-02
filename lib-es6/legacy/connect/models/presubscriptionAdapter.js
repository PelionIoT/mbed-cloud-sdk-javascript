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
/**
 * Presubscription Adapter
 */
export class PresubscriptionAdapter {
    static map(from) {
        return {
            deviceId: from["endpoint-name"],
            deviceType: from["endpoint-type"],
            resourcePaths: from["resource-path"],
        };
    }
    static reverseMap(from) {
        return {
            "endpoint-name": from.deviceId,
            "endpoint-type": from.deviceType,
            "resource-path": from.resourcePaths,
        };
    }
}
//# sourceMappingURL=presubscriptionAdapter.js.map