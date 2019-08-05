import { Page } from "../../../src";

describe("test pure page functionality", () => {

    it("should create empty page", () => {
        const page = new Page({});

        expect(page.data).toEqual([]);
        expect(page.totalCount).toBe(0);
    });

    it("should create basic page", () => {
        const page = new Page({
            has_more: true,
            order: "ASC",
            total_count: 10,
            continuation_marker: "013487OPH"
        });

        expect(page.hasMore).toBe(true);
        expect(page.order).toBe("ASC");
        expect(page.totalCount).toBe(10);
        expect(page.continuationMarker).toBe("013487OPH");
    });

    it("should create basic page with camel keys", () => {
        const page = new Page({
            hasMore: true,
            totalCount: 10,
            continuationMarker: "013487OPH"
        });

        expect(page.hasMore).toBe(true);
        expect(page.totalCount).toBe(10);
        expect(page.continuationMarker).toBe("013487OPH");
    });

    it("should get pageSize from limit", () => {
        const page = new Page({
            limit: 10,
        });

        expect(page.pageSize).toBe(10);
    });

    it("should get pageSize from pageSize", () => {
        const page = new Page({
            pageSize: 10,
        });

        expect(page.pageSize).toBe(10);
    });

    it("should set data", () => {
        const data = [1, 2, 3, 4, 5];
        const page = new Page({}, data);

        expect(page.data).toEqual(data);
    });

    it("should set and map data", () => {
        const data = [1, 2, 3, 4, 5];
        const page = new Page({}, data, i => i + 1);

        expect(page.data).toEqual([2, 3, 4, 5 ,6]);
    });

    it("should be an iterator", () => {
        const data = [1, 2, 3, 4, 5];
        const page = new Page({}, data);

        expect(typeof page[Symbol.iterator] === "function").toBeTruthy();

        let index = 0;
        for (const x of page) {
            expect(x).toEqual(data[index++]);
        }

        expect(index).toEqual(data.length);
    });

    it("should reset iterator after an iteration", () => {
        const data = [1, 2, 3, 4, 5];
        const page = new Page({}, data);

        expect(typeof page[Symbol.iterator] === "function").toBeTruthy();

        let index = 0;
        for (const x of page) {
            expect(x).toEqual(data[index++]);
        }

        expect(index).toEqual(data.length);

        index = 0;
        for (const x of page) {
            expect(x).toEqual(data[index++]);
        }

        expect(index).toEqual(data.length);
    });

    it("should receive correct iterator response from next", () => {
        const data = [1, 2, 3, 4, 5];
        const page = new Page({}, data);

        expect(typeof page[Symbol.iterator] === "function").toBeTruthy();

        for (let index = 0; index < 5; index++) {
            const iteratorResult = page.next();
            expect(iteratorResult.done).toBeFalsy();
            expect(iteratorResult.value).not.toBeNull();
        }

        const finalIteratorResult = page.next();
        expect(finalIteratorResult.done).toBeTruthy();
        expect(finalIteratorResult.value).toBeNull();
    });

    it("should return iterator result from return method", () => {
        const page = new Page({});

        const iteratorResult = page.return(1);

        expect(iteratorResult.done).toBeTruthy();
        expect(iteratorResult.value).toBe(1);
    });

    it("should throw from throw method", () => {
        const page = new Page({});

        expect(() => page.throw(new Error("some error"))).toThrow();
    });

    it("should return first item", () => {
        const data = [1, 2, 3, 4, 5];
        const page = new Page({}, data);

        expect(page.first()).toBe(1);
    });

    it("shouldn't return first or last item if no data", () => {
        const page = new Page({});

        expect(page.first()).toBeUndefined();
        expect(page.last()).toBeUndefined();
    });

    it("shouldn't return first or last item if empty data", () => {
        const data = [];
        const page = new Page({}, data);

        expect(page.first()).toBeUndefined();
        expect(page.last()).toBeUndefined();
    });

    it("should return last item", () => {
        const data = [1, 2, 3, 4, 5];
        const page = new Page({}, data);

        expect(page.last()).toBe(5);
    });

});
