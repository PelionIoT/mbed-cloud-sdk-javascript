"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var Observer = /** @class */ (function () {
    function Observer() {
        this.notificationQueue = new Array();
        this.callbacks = new Array();
        this._waiting = new Array();
    }
    Observer.prototype.notify = function (data) {
        // notify all callbacks
        this._notifyCallbacks(data);
        if (this._waiting.length > 0) {
            // get first function in waiting queue
            this._waiting.shift()(data);
        }
        else {
            // nothing waiting so add to collection
            this.notificationQueue.push(data);
        }
    };
    Observer.prototype.take = function (callback) {
        var _this = this;
        if (this.notificationQueue.length > 0) {
            var first_1 = this.notificationQueue.shift();
            if (callback) {
                // imediately resolve callback
                callback(first_1);
            }
            else {
                // imediately return a resolved promise
                return new Promise(function (resolve, _reject) {
                    resolve(first_1);
                });
            }
        }
        else {
            if (callback) {
                // add callback to waiting
                this._waiting.push(callback);
            }
            else {
                var promise = new Promise(function (resolve, _reject) {
                    // function will resolve promise when called
                    var wait = function (data) {
                        resolve(data);
                    };
                    // add function to waiting queue
                    _this._waiting.push(wait);
                });
                return promise;
            }
        }
    };
    Observer.prototype.addCallback = function (callback) {
        this.callbacks.push(callback);
    };
    Observer.prototype.removeCallback = function (callback) {
        var index = this.callbacks.indexOf(callback, 0);
        if (index > -1) {
            this.callbacks.splice(index, 1);
        }
    };
    Observer.prototype.clearCallbacks = function () {
        this.callbacks = new Array();
    };
    Observer.prototype._notifyCallbacks = function (data) {
        this.callbacks.forEach(function (fn) { return fn(data); });
    };
    return Observer;
}());
exports.Observer = Observer;

//# sourceMappingURL=observer.js.map
