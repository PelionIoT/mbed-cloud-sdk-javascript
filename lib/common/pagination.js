"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
// Run `execute` for all items returned from getPage, one page at a time. If any call to getPage or execute fails, the resulting promise is rejected.
exports.executeForAll = function (getPage, execute) {
    var recur = function (after) {
        return getPage({ after: after })
            .then(function (_a) {
            var data = _a.data, hasMore = _a.hasMore;
            var executePromises = data.map(function (_a) {
                var id = _a.id;
                return execute(id);
            });
            // Execute for all items in current page, then recur
            return Promise.all(executePromises)
                .then(function () {
                return hasMore ? recur(data[data.length - 1].id) : null;
            });
        });
    };
    return recur();
};

//# sourceMappingURL=pagination.js.map
