import { Cache } from "../cache";

describe("Test the caching facility", () => {

    interface CacheItem {
        id: string;
        name: string;
    }

    describe("Listing items in the cache", () => {
        const cache = new Cache<CacheItem>();

        beforeEach(() => {
            const item1: CacheItem = {
                id: "1",
                name: "item1"
            };

            const item2: CacheItem = {
                id: "2",
                name: "item2"
            };

            cache.addInstance(item1.id, item1);
            cache.addInstance(item2.id, item2);
        });

        afterEach(() => {
            cache.deleteAllInstances();
        });

        it("should list all items", () => {
            const allItems = cache.listInstances();

            expect(allItems.length).toBe(2);
        });
    });

});
