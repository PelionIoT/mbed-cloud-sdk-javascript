"use strict";
/*
* Mbed Cloud JavaScript SDK
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
 * List Response
 */
var ListResponse = /** @class */ (function () {
    function ListResponse(from, data) {
        this.after = from.after;
        this.hasMore = from.has_more;
        this.limit = from.limit;
        this.order = from.order;
        this.totalCount = from.total_count;
        this.data = data || [];
    }
    return ListResponse;
}());
exports.ListResponse = ListResponse;
