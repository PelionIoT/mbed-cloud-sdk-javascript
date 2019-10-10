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
import { asyncStyle, apiWrapper } from "../../common/functions";
/**
 * API Key
 */
export class ApiKey {
    constructor(init, _api) {
        this._api = _api;
        for (const key in init) {
            if (init.hasOwnProperty(key)) {
                this[key] = init[key];
            }
        }
    }
    listGroups(callback) {
        return apiWrapper(resultsFn => {
            this._api.listGroups(null, resultsFn);
        }, (data, done) => {
            let groups = [];
            if (data.data && data.data.length) {
                groups = data.data.filter(group => {
                    return this.groups.indexOf(group.id) > -1;
                });
            }
            done(null, groups);
        }, callback);
    }
    getOwner(callback) {
        return asyncStyle(done => {
            if (!this.ownerId) {
                return done(null, null);
            }
            this._api.getUser(this.ownerId, done);
        }, callback);
    }
    update(callback) {
        return asyncStyle(done => {
            this._api.updateApiKey(this, done);
        }, callback);
    }
    delete(callback) {
        return asyncStyle(done => {
            this._api.deleteApiKey(this.id, done);
        }, callback);
    }
}
//# sourceMappingURL=apiKey.js.map