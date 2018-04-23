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

export class Observer<T> {

    private notificationQueue: Array<T>;

    private callbacks: Array<(data: T) => any>;

    private _waiting: Array<(data: T) => any>;

    constructor() {
        this.notificationQueue = new Array();
        this.callbacks = new Array();
        this._waiting = new Array();
    }

    /**
     * Notify this observer
     * @param data the data to notify
     */
    public notify(data: T): void {
        // notify all callbacks
        this._notifyCallbacks(data);

        if (this._waiting.length > 0) {
            // get first function in waiting queue
            this._waiting.shift()(data);
        } else {
            // nothing waiting so add to collection
            this.notificationQueue.push(data);
        }
    }

    /**
     * Gets the next value that the observer is notified of
     *
     * Example:
     * ```JavaScript
     * observer.once()
     * .then(data => {
     *     // do something with the data
     *     console.log(data);
     * });
     * ```
     *
     * @returns Promise containing the data
     */
    public once(): Promise<T>;
    /**
     * Gets the next value that the observer is notified of
     *
     * Example:
     * ```JavaScript
     * observer.once(data => {
     *     // do something with the data
     *     console.log(data);
     * });
     * ```
     *
     * @param callback that is passed the data
     */
    public once(callback: (data: T) => any): void;
    public once(callback?: (data: T) => any): Promise<T> {
        if (this.notificationQueue.length > 0) {
            const first = this.notificationQueue.shift();
            if (callback) {
                // imediately resolve callback
                callback(first);
            } else {
                // imediately return a resolved promise
                return new Promise<T>((resolve, _reject) => {
                    resolve(first);
                });
            }
        } else {
            if (callback) {
                // add callback to waiting
                this._waiting.push(callback);
            } else {
                const promise = new Promise<T>((resolve, _reject) => {
                    // function will resolve promise when called
                    const wait = (data: T) => {
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
     * Add a callback that is invoked when the observer recieves a notification.
     * An observer can have many callbacks.
     *
     * Example:
     * ```JavaScript
     * var myCallback = (data) => {
     *     console.log(data);
     * }
     *
     * observer.addCallback(myCallback);
     * ```
     *
     * @param callback a callback
     */
    public addCallback(callback: (data: T) => any): void {
        this.callbacks.push(callback);
    }

    /**
     * Remove a callback
     *
     * Example:
     * ```JavaScript
     * observer.removeCallback(myCallback);
     * ```
     *
     * @param callback the callback to remove
     */
    public removeCallback(callback: (data: T) => any): void {
        const index = this.callbacks.indexOf(callback, 0);
        if (index > -1) {
            this.callbacks.splice(index, 1);
        }
    }

    /**
     * Clear all callbacks
     *
     * Example:
     * ```JavaScript
     * observer.clearCallbacks();
     * ```
     *
     */
    public clearCallbacks(): void {
        this.callbacks = new Array();
    }

    /**
     * List the callbacks currently registered
     *
     * Example:
     * ```JavaScript
     * observer.listCallbacks();
     * ```
     *
     * @returns list of callbacks
     */
    public listCallbacks(): Array<(data: T) => any> {
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
    public getNotificationQueue(): Array<T> {
        return this.notificationQueue;
    }

    private _notifyCallbacks(data: T) {
        this.callbacks.forEach(fn => fn(data));
    }
}
