/*
* Mbed Cloud JavaScript SDK
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

import { SDKError } from "./sdkError";

export interface ConnectionOptions {
    /**
     * API Key for your Mbed Cloud account
     */
    apiKey: string;
    /**
     * URL for Mbed Cloud API
     */
    host?: string;
}

export interface CallbackFn<T> {
    (error: SDKError, data?: T): any;
}

/**
 * Possible optional fields to request when listing
 */
export type IncludeEnum = "totalCount";

/**
 * Ordering options
 */
export type OrderEnum = "ASC" | "DESC";

/**
 * Options to use when listing objects
 */
export interface ListOptions {
    /**
     * how many objects to retrieve in the page
     */
    limit?: number;
    /**
     * ASC or DESC
     */
    order?: OrderEnum;
    /**
     * the ID of the the item after which to retrieve the next page
     */
    after?: string;
    /**
     * Optional fields to include
     */
    include?: IncludeEnum[];
}

/**
 * Operators inspired by [MongoDB](https://docs.mongodb.com/manual/reference/operator/query-comparison/)
 */
export type ComparisonObject<T> = {
    /**
     * Equal to
     */
    $eq?: T;
    /**
     * Not equal to
     */
    $ne?: T;
    /**
     * Greater than or equal to
     */
    $gte?: T;
    /**
     * Less than or equal to
     */
    $lte?: T;
};
