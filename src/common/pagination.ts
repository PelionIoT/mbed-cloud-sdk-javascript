/*
 * Mbed Cloud JavaScript SDK
 * Copyright Arm Limited 2018
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

import { ListResponse } from "./listResponse";

// Run `execute` for all items returned from getPage, one page at a time. If any call to getPage or execute fails, the resulting promise is rejected.
export const executeForAll = <T extends {id: string}>(
    getPage: (options: {after?: string}) => Promise<ListResponse<T>>,
    execute: (id: string) => Promise<void>
)  => {
    const recur = (after?: string): Promise<void> => {
        return getPage({ after })
            .then(({ data, hasMore }) => {
                const executePromises = data.map(({ id }) => execute(id));

                // Execute for all items in current page, then recur
                return Promise.all(executePromises)
                    .then(() => {
                        return hasMore ? recur(data[ data.length - 1 ].id) : null;
                    });
            });
    };

    return recur();
};
