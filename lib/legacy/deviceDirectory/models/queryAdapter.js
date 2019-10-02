"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("../../common/functions");
var filters_1 = require("../filters");
var query_1 = require("./query");
/**
 * Query Adapter
 */
var QueryAdapter = /** @class */ (function () {
    function QueryAdapter() {
    }
    QueryAdapter.map = function (from, api) {
        return new query_1.Query({
            filter: functions_1.decodeFilter(from.query, filters_1.Filters.DEVICE_FILTER_MAP, filters_1.Filters.NESTED_FILTERS),
            createdAt: from.created_at,
            id: from.id,
            name: from.name,
            updatedAt: from.updated_at,
        }, api);
    };
    QueryAdapter.addMap = function (from) {
        return {
            name: from.name,
            query: functions_1.encodeFilter(from.filter, filters_1.Filters.DEVICE_FILTER_MAP, filters_1.Filters.NESTED_FILTERS) || null,
        };
    };
    QueryAdapter.updateMap = function (from) {
        return {
            name: from.name,
            query: functions_1.encodeFilter(from.filter, filters_1.Filters.DEVICE_FILTER_MAP, filters_1.Filters.NESTED_FILTERS) || null,
        };
    };
    return QueryAdapter;
}());
exports.QueryAdapter = QueryAdapter;
//# sourceMappingURL=queryAdapter.js.map