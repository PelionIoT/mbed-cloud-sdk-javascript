export class Cache<T> {

    private instanceCache: {
        [key: string]: T
    };

    constructor() {
        this.instanceCache = {};
    }

    /**
     * List all instances stored in the cache
     */
    public listInstances(): Array<T> {
        return Object.keys(this.instanceCache).map(k => this.instanceCache[k]);
    }

    /**
     * Get an instance from the cache by key
     * @param key key of instance
     */
    public getInstance(key: string): T {
        return this.instanceCache[key];
    }

    /**
     * Add an instance to the cache by key
     * @param key Key of instance to add
     * @param instance The instance to store in cache
     */
    public addInstance(key: string, instance: T): void {
        this.instanceCache[key] = instance;
    }

    /**
     * Delete an instance from the cache
     * @param key Key of instance to delete
     */
    public deleteInstance(key: string): boolean {
        delete this.instanceCache[key];
        return true;
    }

    /**
     * Delete all instances
     */
    public deleteAllInstances(): void {
        this.instanceCache = {};
    }
}
