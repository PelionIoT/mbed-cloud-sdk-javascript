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
/**
 * ## List Response
 * Most listing operations are paginated and respond with truncated results. This object comprises the information related to one page.
 * For operations over a full collection, it is recommended to use the [Paginator](./paginator.html) instead.
 */
var ListResponse = /** @class */ (function () {
    function ListResponse(from, data, mapper) {
        this.after = from.after;
        this.hasMore = from.has_more || from.hasMore;
        this.pageSize = ("limit" in from) ? from.limit : ("pageSize" in from) ? from.pageSize : undefined;
        this.order = from.order;
        // default to 0 if either is undefined
        this.totalCount = from.total_count || from.totalCount || 0;
        this.continuationMarker = from.continuation_marker || from.continuationMarker;
        // Setting limit for backward compatibility
        var limitParameterName = "limit";
        this[limitParameterName] = this.pageSize;
        if (mapper && data && data.length) {
            // mapping function has been provided so map the data
            this.data = from.data.map(function (key) { return mapper(key); }) || [];
        }
        else {
            // data has already been mapped so just assign it
            this.data = data || [];
        }
    }
    return ListResponse;
}());
exports.ListResponse = ListResponse;
//# sourceMappingURL=listResponse.js.map