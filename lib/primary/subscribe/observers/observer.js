"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var Observer = /** @class */ (function () {
    function Observer() {
        this.subscribed = true;
        this.notificationQueue = new Array();
        this.callbacks = new Array();
        this.waiting = new Array();
        this.filters = new Array();
    }
    /**
     * Notify this observer
     * @param data the data to notify
     */
    Observer.prototype.notify = function (data) {
        if (this.runLocalFilter(data)) {
            // notify all callbacks
            this._notifyCallbacks(data);
            if (this.waiting.length > 0) {
                // get first function in waiting queue
                this.waiting.shift()(data);
            }
            else {
                // nothing waiting so add to collection
                this.notificationQueue.push(data);
            }
        }
    };
    Observer.prototype.once = function (callback) {
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
                this.waiting.push(callback);
            }
            else {
                var promise = new Promise(function (resolve, _reject) {
                    // function will resolve promise when called
                    var wait = function (data) {
                        resolve(data);
                    };
                    // add function to waiting queue
                    _this.waiting.push(wait);
                });
                return promise;
            }
        }
    };
    /**
     * Add a Listener that is invoked when the observer recieves a notification.
     * An observer can have many Listeners.
     *
     * Example:
     * ```JavaScript
     * var myListener = (data) => {
     *     console.log(data);
     * }
     *
     * observer.addListener(myListener);
     * ```
     *
     * @param listener a listener
     */
    Observer.prototype.addListener = function (listener) {
        this.callbacks.push(listener);
        return this;
    };
    /**
     * Remove a listener
     *
     * Example:
     * ```JavaScript
     * observer.removeListener(myListener);
     * ```
     *
     * @param listener the listener to remove
     */
    Observer.prototype.removeListener = function (listener) {
        var index = this.callbacks.indexOf(listener, 0);
        if (index > -1) {
            this.callbacks.splice(index, 1);
        }
        return this;
    };
    /**
     * Clear all listeners
     *
     * Example:
     * ```JavaScript
     * observer.clearListeners();
     * ```
     *
     */
    Observer.prototype.clearListeners = function () {
        this.callbacks = new Array();
        return this;
    };
    /**
     * List the callbacks currently registered
     *
     * Example:
     * ```JavaScript
     * observer.listeners();
     * ```
     *
     * @returns list of listeners
     */
    Observer.prototype.listeners = function () {
        return this.callbacks;
    };
    /**
     * Get the current notification queue
     *
     * Example:
     * ```JavaScript
     * observer.getNotificationQueue();
     * ```
     *
     * @returns list containing the data that has been sent to the observer
     */
    Observer.prototype.getNotificationQueue = function () {
        return this.notificationQueue;
    };
    Observer.prototype.addLocalFilter = function (filter) {
        this.filters.push(filter);
        return this;
    };
    Observer.prototype.runLocalFilter = function (data) {
        return this.filters.length > 0 ? this.filters.some(function (f) { return f(data); }) : true;
    };
    Observer.prototype._notifyCallbacks = function (data) {
        this.callbacks.forEach(function (fn) { return fn(data); });
    };
    return Observer;
}());
exports.Observer = Observer;
//# sourceMappingURL=observer.js.map