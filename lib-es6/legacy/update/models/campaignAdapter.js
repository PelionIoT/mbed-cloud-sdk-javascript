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
import { encodeFilter, decodeFilter } from "../../common/functions";
import { Filters } from "../../deviceDirectory/filters";
import { Campaign } from "./campaign";
/**
 * Campaign Adapter
 */
export class CampaignAdapter {
    static map(from, api) {
        return new Campaign({
            deviceFilter: decodeFilter(from.device_filter, Filters.DEVICE_FILTER_MAP, Filters.NESTED_FILTERS),
            createdAt: from.created_at,
            description: from.description,
            finishedAt: from.finished,
            id: from.id,
            manifestId: from.root_manifest_id,
            manifestUrl: from.root_manifest_url,
            name: from.name,
            startedAt: from.started_at,
            state: from.state,
            phase: from.phase,
            scheduledAt: from.when,
            updatedAt: from.updated_at,
        }, api);
    }
    static addMap(from) {
        return {
            description: from.description,
            device_filter: encodeFilter(from.deviceFilter, Filters.DEVICE_FILTER_MAP, Filters.NESTED_FILTERS) || null,
            name: from.name,
            root_manifest_id: from.manifestId,
            state: from.state,
            when: from.scheduledAt,
            object: from.object,
        };
    }
    static updateMap(from) {
        return {
            description: from.description,
            device_filter: encodeFilter(from.deviceFilter, Filters.DEVICE_FILTER_MAP, Filters.NESTED_FILTERS) || null,
            name: from.name,
            root_manifest_id: from.manifestId,
            state: from.state,
            when: from.scheduledAt,
            object: from.object,
        };
    }
}
//# sourceMappingURL=campaignAdapter.js.map