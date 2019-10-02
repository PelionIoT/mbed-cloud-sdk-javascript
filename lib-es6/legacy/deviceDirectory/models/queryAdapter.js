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
import { Filters } from "../filters";
import { Query } from "./query";
/**
 * Query Adapter
 */
export class QueryAdapter {
    static map(from, api) {
        return new Query({
            filter: decodeFilter(from.query, Filters.DEVICE_FILTER_MAP, Filters.NESTED_FILTERS),
            createdAt: from.created_at,
            id: from.id,
            name: from.name,
            updatedAt: from.updated_at,
        }, api);
    }
    static addMap(from) {
        return {
            name: from.name,
            query: encodeFilter(from.filter, Filters.DEVICE_FILTER_MAP, Filters.NESTED_FILTERS) || null,
        };
    }
    static updateMap(from) {
        return {
            name: from.name,
            query: encodeFilter(from.filter, Filters.DEVICE_FILTER_MAP, Filters.NESTED_FILTERS) || null,
        };
    }
}
//# sourceMappingURL=queryAdapter.js.map