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

import { GroupType } from "./types";
import { GroupSummary as apiGroup } from "../_api/iam";

/*
 * Group
 */
export class Group {

    constructor(options: GroupType) {
        for(var key in options) {
            this[key] = options[key];
        }
    }

    static map(from: apiGroup): Group {
        let type:GroupType = {
            apiKeyCount:from.apiKeyCount,
            createdAt:         from.created_at,
            creationTime:      from.creationTime,
            id:                from.id,
            lastUpdateTime:    from.lastUpdateTime,
            name:              from.name,
            userCount:         from.userCount
        };

        return new Group(type);
    }
}
export interface Group extends GroupType {}
