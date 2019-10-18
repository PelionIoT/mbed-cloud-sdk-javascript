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
import { asyncStyle } from "../../common/functions";
import { Device } from "../../deviceDirectory/models/device";
/**
 * Connected Device
 */
export class ConnectedDevice extends Device {
    constructor(init, _connectApi) {
        super();
        this._connectApi = _connectApi;
        for (const key in init) {
            if (init.hasOwnProperty(key)) {
                this[key] = init[key];
            }
        }
    }
    listResources(callback) {
        return asyncStyle(done => {
            this._connectApi.listResources(this.id, done);
        }, callback);
    }
    getResource(resourcePath, callback) {
        return asyncStyle(done => {
            this._connectApi.getResource(this.id, resourcePath, done);
        }, callback);
    }
    listSubscriptions(callback) {
        return asyncStyle(done => {
            this._connectApi.listDeviceSubscriptions(this.id, done);
        }, callback);
    }
    deleteSubscriptions(callback) {
        return asyncStyle(done => {
            this._connectApi.deleteDeviceSubscriptions(this.id, done);
        }, callback);
    }
    getResourceValue(resourcePath, timeout, mimeType, callback) {
        if (typeof timeout === "function") {
            callback = timeout;
            timeout = null;
        }
        if (typeof mimeType === "function") {
            callback = mimeType;
            mimeType = null;
        }
        return asyncStyle(done => {
            this._connectApi.getResourceValue(this.id, resourcePath, timeout, mimeType, done);
        }, callback);
    }
    setResourceValue(resourcePath, value, timeout, mimeType, callback) {
        if (typeof timeout === "function") {
            callback = timeout;
            timeout = null;
        }
        if (typeof mimeType === "function") {
            callback = mimeType;
            mimeType = null;
        }
        return asyncStyle(done => {
            this._connectApi.setResourceValue(this.id, resourcePath, value, timeout, mimeType, done);
        }, callback);
    }
    executeResource(resourcePath, payload, timeout, mimeType, accepts, callback) {
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
            this._connectApi.executeResource(this.id, resourcePath, timeout, mimeType, accepts, payload, done);
        }, callback);
    }
    getResourceSubscription(resourcePath, callback) {
        return asyncStyle(done => {
            this._connectApi.getResourceSubscription(this.id, resourcePath, done);
        }, callback);
    }
    addResourceSubscription(resourcePath, notifyFn, callback) {
        return asyncStyle(done => {
            this._connectApi.addResourceSubscription(this.id, resourcePath, notifyFn, done);
        }, callback);
    }
    deleteResourceSubscription(resourcePath, callback) {
        return asyncStyle(done => {
            this._connectApi.deleteResourceSubscription(this.id, resourcePath, done);
        }, callback);
    }
}
//# sourceMappingURL=connectedDevice.js.map