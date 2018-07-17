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

import { OrderEnum } from "./interfaces";

/**
 * ## List Response
 * Most listing operations are paginated and respond with truncated results. This object comprises the information related to one page.
 * For operations over a full collection, it is recommended to use the [Paginator](./paginator.html) instead.
 */
export class ListResponse<T> {
    /**
     * Whether there are more results to display
     */
    public readonly hasMore?: boolean;
    /**
     * Total number of records (Approximate number of results according to the API)
     */
    public readonly totalCount?: number;
    /**
     * Entity id for fetch after it
     */
    public readonly after?: string;
    /**
     * The page size
     */
    public readonly pageSize?: number;
    /**
     * Order of returned records
     */
    public readonly order?: OrderEnum;
    /**
     * List of results.
     */
    public readonly data: Array<T>;
    /**
     *  Entity id for fetch after it
     */
    public readonly continuationMarker?: string;

    constructor(from: any, data?: Array<T>) {
        this.after = from.after;
        this.hasMore = from.has_more || from.hasMore;
        this.pageSize = ("limit" in from) ? from.limit : ("pageSize" in from) ? from.pageSize : undefined;
        this.order = from.order;
        this.totalCount = from.total_count || from.totalCount;
        this.continuationMarker = from.continuation_marker || from.continuationMarker;
        this.data = data || [];
        // Setting limit for backward compatibility
        const limitParameterName = "limit";
        this[limitParameterName] = this.pageSize;
    }
}
