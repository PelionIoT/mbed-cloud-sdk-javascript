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
export class Observer {
    constructor() {
        this.subscribed = true;
        this.notificationQueue = new Array();
        this.callbacks = new Array();
        this._waiting = new Array();
        this.filters = new Array();
    }
    /**
     * Notify this observer
     * @param data the data to notify
     */
    notify(data) {
        if (this.runLocalFilter(data)) {
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
        }
    }
    once(callback) {
        if (this.notificationQueue.length > 0) {
            const first = this.notificationQueue.shift();
            if (callback) {
                // imediately resolve callback
                callback(first);
            }
            else {
                // imediately return a resolved promise
                return new Promise((resolve, _reject) => {
                    resolve(first);
                });
            }
        }
        else {
            if (callback) {
                // add callback to waiting
                this._waiting.push(callback);
            }
            else {
                const promise = new Promise((resolve, _reject) => {
                    // function will resolve promise when called
                    const wait = (data) => {
                        resolve(data);
                    };
                    // add function to waiting queue
                    this._waiting.push(wait);
                });
                return promise;
            }
        }
    }
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
    addListener(listener) {
        this.callbacks.push(listener);
        return this;
    }
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
    removeListener(listener) {
        const index = this.callbacks.indexOf(listener, 0);
        if (index > -1) {
            this.callbacks.splice(index, 1);
        }
        return this;
    }
    /**
     * Clear all listeners
     *
     * Example:
     * ```JavaScript
     * observer.clearListeners();
     * ```
     *
     */
    clearListeners() {
        this.callbacks = new Array();
        return this;
    }
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
    listeners() {
        return this.callbacks;
    }
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
    getNotificationQueue() {
        return this.notificationQueue;
    }
    addLocalFilter(filter) {
        this.filters.push(filter);
        return this;
    }
    runLocalFilter(data) {
        return this.filters.length > 0 ? this.filters.some(f => f(data)) : true;
    }
    _notifyCallbacks(data) {
        this.callbacks.forEach(fn => fn(data));
    }
}
//# sourceMappingURL=observer.js.map