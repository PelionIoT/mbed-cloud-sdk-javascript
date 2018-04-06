export declare class Observer<T> {
    notificationQueue: Array<T>;
    callbacks: Array<(data: T) => any>;
    private _waiting;
    constructor();
    notify(data: T): void;
    take(): Promise<T>;
    take(callback: (data: T) => any): void;
    addCallback(callback: (data: T) => any): void;
    removeCallback(callback: (data: T) => any): void;
    clearCallbacks(): void;
    private _notifyCallbacks(data);
}
