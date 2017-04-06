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

import { encodeFilter, decodeAttributes } from "../../common/functions";
import {
    DeviceQuery as apiQuery,
    DeviceQueryPatchRequest as apiQueryUpdate
} from "../../_api/device_query_service";
import { DevicesApi } from "../index";
import { AddQueryObject, UpdateQueryObject } from "../types";
import { Query } from "./query";

/*
 * Query Adapter
 */
export class QueryAdapter {

    static readonly CUSTOM_PREFIX = "custom_attributes__";

    static map(from: apiQuery, api: DevicesApi): Query {
        let attributes = decodeAttributes(from.query, QueryAdapter.CUSTOM_PREFIX);

        return new Query({
            attributes:          attributes.noMatch,
            customAttributes:    attributes.match,
            createdAt:           from.created_at,
            description:         from.description,
            id:                  from.id,
            name:                from.name,
            updatedAt:           from.updated_at
        }, api);
    }

    static addMap(from: AddQueryObject): apiQuery {
        return {
            description:    from.description,
            name:           from.name,
            query:          encodeFilter(from, QueryAdapter.CUSTOM_PREFIX),

            id:             "",
            object:         "",
            etag:           new Date(),
            created_at:     new Date(),
            updated_at:     new Date()
        };
    }

    static updateMap(from: UpdateQueryObject): apiQueryUpdate {
        return {
            description:    from.description,
            name:           from.name,
            query:          encodeFilter(from, QueryAdapter.CUSTOM_PREFIX)
        };
    }
}
