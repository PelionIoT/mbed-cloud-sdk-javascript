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

/**
 * Api meta data
 */
export class ApiMetadata {

    /**
     * URL of the API request
     */
    public readonly url?: string;

    /**
     * Method of the API request
     */
    public readonly method?: string;

    /**
     * HTTP Status code of the API response
     */
    public readonly statusCode?: number;

    /**
     * Date of the API response
     */
    public readonly date?: Date;

    /**
     * Headers in the API response
     */
    public readonly headers?: { [key: string]: string };

    /**
     * Request ID of the transaction
     */
    public readonly requestId?: string;

    /**
     * Object type of the returned data
     */
    public readonly object?: string;

    /**
     * etag of the returned data
     */
    public readonly etag?: string;

    /**
     * Any error message returned
     */
    public readonly errorMessage?: string;

    constructor(statusCode?: number, errorMessage?: string, headers?: { [key: string]: string }, body?: { [key: string]: string }, request?: { [key: string]: string }) {
        this.statusCode = statusCode;
        this.errorMessage = errorMessage;

        if (headers) {
            this.headers = headers;
            this.date = headers.date ? new Date(headers.date) : new Date();
            this.requestId = headers["x-request-id"];
        }

        if (body) {
            this.object = body.object;
            this.etag = body.etag;
        }

        if (request) {
            this.method = request.method;
            this.url = request.url;
        }
    }
}
