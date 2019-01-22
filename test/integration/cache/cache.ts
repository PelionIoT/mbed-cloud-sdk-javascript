
export class Cache<T> {

    private instanceCache: {
        [key: string]: T
    };

    constructor() {
        this.instanceCache = {};
    }

    public listInstances(): Array<T> {
        return Object.keys(this.instanceCache).map(k => this.instanceCache[k]);
    }

    public getInstance(key: string): T {
        return this.instanceCache[key];
    }

    public addInstance(key: string, instance: T): void {
        this.instanceCache[key] = instance;
    }

    public deleteInstance(key: string): void {
        delete this.instanceCache[key];
    }

    public deleteAllInstances(): void {
        this.instanceCache = {};
    }
}
