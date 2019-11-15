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

import { GroupSummary as apiGroup } from "../../_api/iam";
import { AccountManagementApi } from "../accountManagementApi";
import { Group } from "./group";

/**
 * Group Adapter
 */
export class GroupAdapter {
    public static map(from: apiGroup, api: AccountManagementApi): Group {
        return new Group(
            {
                id: from.id,
                accountId: from.account_id,
                name: from.name,
                userCount: from.user_count,
                apiKeyCount: from.apikey_count,
                createdAt: from.created_at,
            },
            api
        );
    }
}
