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
 * Policy
 * This object represents a feature policy. Either the feature or the resource must be specified.
 */
export class Policy {
    /**
     * Comma separated list of actions, empty string represents all actions.
     */
    public readonly action?: string;
    /**
     * Resource that is protected by this policy.
     */
    public readonly resource?: string;
    /**
     * Feature name corresponding to this policy.
     */
    public readonly feature?: string;
    /**
     * True or false controlling whether an action is allowed or not.
     */
    public readonly allow?: boolean;

    constructor(init: Partial<Policy>) {
        for (const key in init) {
            if (init.hasOwnProperty(key)) {
                this[key] = init[key];
            }
        }
    }
}
