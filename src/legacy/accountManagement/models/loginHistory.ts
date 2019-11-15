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

/**
 * Login History
 */
export class LoginHistory {
    /**
     * Date of login
     */
    public readonly date?: Date;
    /**
     * User agent used for login
     */
    public readonly userAgent?: string;
    /**
     * IP Address login from
     */
    public readonly ipAddress?: string;
    /**
     * Whether login was successful
     */
    public readonly success?: boolean;

    constructor(init: Partial<LoginHistory>) {
        for (const key in init) {
            if (init.hasOwnProperty(key)) {
                this[key] = init[key];
            }
        }
    }
}
