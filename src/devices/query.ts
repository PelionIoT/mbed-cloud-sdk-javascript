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

import { asyncStyle, encodeFilter, decodeAttributes } from "../common/functions";
import {
    Body as apiQueryRequest,
    DeviceQueryDetail as apiQuery
} from "../_api/device_query_service";
import { QueryType } from "./types";
import { DevicesApi } from "./index";

/*
 * Query
 */
export class Query {

    static readonly CUSTOM_PREFIX = "custom_attributes__";

    constructor(options: QueryType, private _api?: DevicesApi) {
        for(var key in options) {
            this[key] = options[key];
        }
    }

    static map(from: apiQuery, api: DevicesApi): Query {
        let attributes = decodeAttributes(from.query, Query.CUSTOM_PREFIX);

        let type:QueryType = {
            attributes:          attributes.noMatch,
            customAttributes:    attributes.match,
            createdAt:           from.created_at,
            description:         from.description,
            id:                  from.id,
            name:                from.name,
            updatedAt:           from.updated_at
        };

        return new Query(type, api);
    }

    static reverseMap(from: any): apiQueryRequest {
        return {
            description:    from.description,
            name:           from.name,
            query:          encodeFilter(from, Query.CUSTOM_PREFIX)
        };
    }

    /**
     * Update the query
     * @param options.name The name of the query
     * @param options.description The description of the query
     * @param options.attributes The attributes of the query
     * @param options.customAttributes The custom attributes of the query
     * @returns Promise of query
     */
    public update(options: { name: string, description?: string, attributes?: { [key: string]: string }, customAttributes?: { [key: string]: string } }): Promise<Query>;
    /**
     * Update the query
     * @param options.name The name of the query
     * @param options.description The description of the query
     * @param options.attributes The attributes of the query
     * @param options.customAttributes The custom attributes of the query
     * @param callback A function that is passed the arguments (error, query)
     */
    public update(options: { name: string, description?: string, attributes?: { [key: string]: string }, customAttributes?: { [key: string]: string } }, callback?: (err: any, data?: Query) => any);
    public update(options: { name: string, description?: string, attributes?: { [key: string]: string }, customAttributes?: { [key: string]: string } }, callback?: (err: any, data?: Query) => any): Promise<Query> {
        return asyncStyle(done => {
            this._api.updateQuery({
                id:                  this.id,
                name:                options.name,
                description:         options.description,
                attributes:          options.attributes,
                customAttributes:    options.customAttributes
            }, done);
        }, callback);
    }

    /**
     * Delete the query
     * @returns Promise containing any error
     */
    public delete(): Promise<void>;
    /**
     * Delete the query
     * @param callback A function that is passed any error
     */
    public delete(callback?: (err: any, data?: void) => any);
    public delete(callback?: (err: any, data?: void) => any): Promise<void> {
        return asyncStyle(done => {
            this._api.deleteQuery(this, done);
        }, callback);
    }
}
export interface Query extends QueryType {}
