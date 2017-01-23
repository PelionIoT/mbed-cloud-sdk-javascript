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

import { PresubscriptionType } from "./types";
import { Presubscription as apiPresubscription } from "../_api/mds";

/*
 * Presubscription
 */
export class Presubscription {

    constructor(options: PresubscriptionType) {
        for(var key in options) {
            this[key] = options[key];
        }
    }

    static map(from: apiPresubscription): Presubscription {
        let type:PresubscriptionType = {
            id:               from["endpoint-name"],
            type:             from["endpoint-type"],
            resourcePaths:    from["resource-path"] as string[]
        };

        return new Presubscription(type);
    }

    static reverseMap(from: PresubscriptionType): apiPresubscription {
        return {
            "endpoint-name": from.id,
            "endpoint-type": from.type,
            "resource-path": from.resourcePaths
        };
    }
}
export interface Presubscription extends PresubscriptionType {}
