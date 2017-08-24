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
 * Login History
 */
export class LoginHistory {

    /**
     * Date of login
     */
    readonly date?: Date;
    /**
     * User agent used for login
     */
    readonly userAgent?: string;
    /**
     * IP Address login from
     */
    readonly ipAddress?: string;
    /**
     * Whether login was successful
     */
    readonly success?: boolean;

    constructor(init: Partial<LoginHistory>) {
        for(var key in init) {
            this[key] = init[key];
        }
    }
}
