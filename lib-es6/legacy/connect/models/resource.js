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
import { EventEmitter } from "events";
import { asyncStyle } from "../../common/functions";
/**
 * Resource
 */
export class Resource extends EventEmitter {
    constructor(init, _api) {
        super();
        this._api = _api;
        for (const key in init) {
            if (init.hasOwnProperty(key)) {
                this[key] = init[key];
            }
        }
        this.on("newListener", eventName => {
            if (eventName === Resource.EVENT_NOTIFICATION) {
                this.addSubscription(data => this.emit(Resource.EVENT_NOTIFICATION, data));
            }
        });
        this.on("removeListener", eventName => {
            if (eventName === Resource.EVENT_NOTIFICATION) {
                if (this.listenerCount(Resource.EVENT_NOTIFICATION) === 0) {
                    this.deleteSubscription();
                }
            }
        });
    }
    addSubscription(notifyFn, callback) {
        return asyncStyle(done => {
            if (!this.observable) {
                return done(null, null);
            }
            this._api.addResourceSubscription(this.deviceId, this.path, notifyFn, done);
        }, callback);
    }
    deleteSubscription(callback) {
        return asyncStyle(done => {
            this._api.deleteResourceSubscription(this.deviceId, this.path, done);
        }, callback);
    }
    getValue(timeout, mimeType, callback) {
        if (typeof timeout === "function") {
            callback = timeout;
            timeout = null;
        }
        if (typeof mimeType === "function") {
            callback = mimeType;
            mimeType = null;
        }
        return asyncStyle(done => {
            this._api.getResourceValue(this.deviceId, this.path, timeout, mimeType, done);
        }, callback);
    }
    setValue(value, timeout, mimeType, callback) {
        if (typeof timeout === "function") {
            callback = timeout;
            timeout = null;
        }
        if (typeof mimeType === "function") {
            callback = mimeType;
            mimeType = null;
        }
        return asyncStyle(done => {
            this._api.setResourceValue(this.deviceId, this.path, value, timeout, mimeType, done);
        }, callback);
    }
    execute(payload, timeout, mimeType, accepts, callback) {
        if (typeof payload === "function") {
            callback = payload;
            payload = null;
        }
        if (typeof timeout === "function") {
            callback = timeout;
            timeout = null;
        }
        if (typeof accepts === "function") {
            callback = accepts;
            accepts = null;
        }
        if (typeof mimeType === "function") {
            callback = mimeType;
            mimeType = null;
        }
        return asyncStyle(done => {
            this._api.executeResource(this.deviceId, this.path, timeout, mimeType, accepts, payload, done);
        }, callback);
    }
    getSubscription(callback) {
        return asyncStyle(done => {
            if (!this.observable) {
                return done(null, false);
            }
            this._api.getResourceSubscription(this.deviceId, this.path, done);
        }, callback);
    }
}
/**
 * Resource notification event which returns the notification when handling notifications, otherwise an asyncId
 * @event
 */
Resource.EVENT_NOTIFICATION = "notification";
//# sourceMappingURL=resource.js.map