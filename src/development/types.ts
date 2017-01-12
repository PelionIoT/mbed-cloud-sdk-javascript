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

export interface Certificate {
    /**
     * UTC time of the entity creation.
     */
    "created_at"?: string;
    /**
     * Currently not used.
     */
    "etag"?: string;
    /**
     * The developer certificate public key in raw format (65 bytes), Base64 encoded, NIST P-256 curve.
     */
    "pub_key"?: string;
    /**
     * Entity ID.
     */
    "id"?: string;
}
