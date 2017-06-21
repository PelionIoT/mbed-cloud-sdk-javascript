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

import { encodeFilter, decodeFilter } from "../../common/functions";
import {
    UpdateCampaign as apiCampaign,
    UpdateCampaignPostRequest as apiCampaignAdd,
    UpdateCampaignPatchRequest as apiCampaignUpdate
} from "../../_api/update_service";
import { Filters } from "../../deviceDirectory/filters";
import { AddCampaignObject, UpdateCampaignObject } from "../types";
import { UpdateApi } from "../updateApi";
import { Campaign } from "./campaign";

/**
 * Campaign Adapter
 */
export class CampaignAdapter {

    static map(from: apiCampaign, api: UpdateApi): Campaign {
        return new Campaign({
            deviceFilter:        decodeFilter(from.device_filter, Filters.DEVICE_FILTER_MAP, Filters.NESTED_FILTERS),
            createdAt:           from.created_at ? new Date(from.created_at) : null,
            description:         from.description,
            finishedAt:          from.finished ? new Date(from.finished) : null,
            id:                  from.id,
            manifestId:          from.root_manifest_id,
            manifestUrl:         from.root_manifest_url,
            name:                from.name,
            startedAt:           from.started_at,
            state:               from.state,
            scheduledAt:         from.when ? new Date(from.when) : null,
        }, api);
    }

    static addMap(from: AddCampaignObject): apiCampaignAdd {
        return {
            description:         from.description,
            device_filter:       encodeFilter(from.deviceFilter, Filters.DEVICE_FILTER_MAP, Filters.NESTED_FILTERS) || null,
            name:                from.name,
            root_manifest_id:    from.manifestId,
            state:               from.state,
            when:                from.scheduledAt ? from.scheduledAt.toISOString() : null
        };
    }

    static updateMap(from: UpdateCampaignObject): apiCampaignUpdate {
        return {
            description:         from.description,
            device_filter:       encodeFilter(from.deviceFilter, Filters.DEVICE_FILTER_MAP, Filters.NESTED_FILTERS) || null,
            name:                from.name,
            root_manifest_id:    from.manifestId,
            state:               from.state,
            when:                from.scheduledAt ? from.scheduledAt.toISOString() : null
        };
    }
}
