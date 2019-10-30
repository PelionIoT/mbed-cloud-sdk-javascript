export declare class Observer<T> {
    protected subscribed: boolean;
    private notificationQueue;
    private callbacks;
    private filters;
    private waiting;
    constructor();
    /**
     * Notify this observer
     * @param data the data to notify
     */
    notify(data: T): void;
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
    once(): Promise<T>;
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
    once(callback: (data: T) => any): void;
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
    addListener(listener: (data: T) => any): this;
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
    removeListener(listener: (data: T) => any): this;
    /**
     * Clear all listeners
     *
     * Example:
     * ```JavaScript
     * observer.clearListeners();
     * ```
     *
     */
    clearListeners(): this;
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
    listeners(): Array<(data: T) => any>;
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
    getNotificationQueue(): Array<T>;
    addLocalFilter(filter: (filter: T) => boolean): this;
    private runLocalFilter;
    private _notifyCallbacks;
}
