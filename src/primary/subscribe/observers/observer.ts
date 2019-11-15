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

export class Observer<T> {
    protected subscribed: boolean;

    private notificationQueue: Array<T>;

    private callbacks: Array<(data: T) => any>;

    private filters: Array<(data: T) => boolean>;

    private waiting: Array<(data: T) => any>;

    constructor() {
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
    public notify(data: T): void {
        if (this.runLocalFilter(data)) {
            // notify all callbacks
            this._notifyCallbacks(data);

            if (this.waiting.length > 0) {
                // get first function in waiting queue
                this.waiting.shift()(data);
            } else {
                // nothing waiting so add to collection
                this.notificationQueue.push(data);
            }
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
                this.waiting.push(callback);
            } else {
                const promise = new Promise<T>((resolve, _reject) => {
                    // function will resolve promise when called
                    const wait = (data: T) => {
                        resolve(data);
                    };
                    // add function to waiting queue
                    this.waiting.push(wait);
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
    public addListener(listener: (data: T) => any): this {
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
    public removeListener(listener: (data: T) => any): this {
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
    public clearListeners(): this {
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
    public listeners(): Array<(data: T) => any> {
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

    public addLocalFilter(filter: (filter: T) => boolean): this {
        this.filters.push(filter);
        return this;
    }

    private runLocalFilter(data: T): boolean {
        return this.filters.length > 0 ? this.filters.some(f => f(data)) : true;
    }

    private _notifyCallbacks(data: T) {
        this.callbacks.forEach(fn => fn(data));
    }
}
