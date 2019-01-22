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

    public addInstance(instance: T): void {
        // tslint:disable-next-line:no-string-literal
        this.instanceCache[instance["id"]] = instance;
    }

    public deleteInstance(key: string): boolean {
        delete this.instanceCache[key];
        return true;
    }

    public deleteAllInstances(): void {
        this.instanceCache = {};
    }
}
