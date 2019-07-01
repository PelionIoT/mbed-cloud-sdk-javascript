import { ListOptions } from "../../../src/legacy/common/interfaces";
import { NewPaginator, Page } from "../../../src";
import { Entity } from "../../../src/common/entity";
import { FetchPageStub } from "./fetchPageStub";

describe("test paginator", () => {

    it("should set options", () => {
        const options: ListOptions = {
            maxResults: 10,
        };

        const paginator = new NewPaginator(null, options);

        expect(paginator.listOptions.maxResults).toBe(10);
    });

    it("should set max results", () => {
        const options: ListOptions = {
            maxResults: 10,
        };

        const paginator = new NewPaginator(null, options);

        expect(paginator.maxResults).toBe(10);
    });

    it("should set max results from limit", () => {
        const options: ListOptions = {
            limit: 10,
        };

        const paginator = new NewPaginator(null, options);

        expect(paginator.maxResults).toBe(10);
    });

    it("should set page size", () => {
        const options: ListOptions = {
            pageSize: 10,
        };

        const paginator = new NewPaginator(null, options);

        expect(paginator.pageSize).toBe(10);
    });

    it("should set totalPages when maxResults > pageSize", () => {
        const options: ListOptions = {
            maxResults: 50,
            pageSize: 10,
        };

        const paginator = new NewPaginator(null, options);

        expect(paginator.totalPages).toBe(5);
    });

    it("should set totalPages when maxResults < pageSize", () => {
        const options: ListOptions = {
            maxResults: 10,
            pageSize: 50,
        };

        const paginator = new NewPaginator(null, options);

        expect(paginator.totalPages).toBe(1);
    });

    it("should set defaults", () => {
        const options: ListOptions = {};

        const paginator = new NewPaginator(null, options);

        expect(paginator.maxResults).toBe(50);
        expect(paginator.pageSize).toBe(50);
        expect(paginator.totalPages).toBe(1);
        expect(paginator.currentPageIndex).toBe(-1);
        expect(paginator.totalCount).toBe(0);
        expect(paginator.currentPage).toBeUndefined();
        expect(paginator.pages).toEqual([]);
    });

    it("should fetch one page", async () => {
        const fetchData = new FetchPageStub();

        const options: ListOptions = {
            pageSize: 3,
            maxResults: 15,
        };

        const paginator = new NewPaginator<Entity, ListOptions>(fetchData.getDataFunc(), options);

        const page = await paginator.nextPage();

        expect(page).not.toBeUndefined();
        expect(paginator.totalCount).toBe(12);
        checkPage(page, paginator, "AAAC", 0);

        expect(paginator.hasNextPage()).toBeTruthy();
    });

    it("should fetch all pages using nextPage", async () => {
        const fetchData = new FetchPageStub();

        const options: ListOptions = {
            pageSize: 3,
            maxResults: 15,
        };

        const paginator = new NewPaginator<Entity, ListOptions>(fetchData.getDataFunc(), options);

        const page = await paginator.nextPage();

        expect(paginator.totalCount).toBe(12);
        checkPage(page, paginator, "AAAC", 0);

        expect(paginator.hasNextPage()).toBeTruthy();

        const page2 = await paginator.nextPage();
        checkPage(page2, paginator, "AAAF", 1);

        expect(paginator.hasNextPage()).toBeTruthy();

        const page3 = await paginator.nextPage();
        checkPage(page3, paginator, "AAAI", 2);

        expect(paginator.hasNextPage()).toBeTruthy();

        const page4 = await paginator.nextPage();
        checkPage(page4, paginator, null, 3);

        expect(paginator.hasNextPage()).toBeFalsy();
        expect(await paginator.nextPage()).toBeUndefined();
    });

    it("should reset paginator", async () => {
        const fetchData = new FetchPageStub();

        const options: ListOptions = {
            pageSize: 3,
            maxResults: 15,
        };

        const paginator = new NewPaginator<Entity, ListOptions>(fetchData.getDataFunc(), options);

        const page = await paginator.nextPage();

        expect(page).not.toBeUndefined();
        checkPage(page, paginator, "AAAC", 0);

        expect(paginator.hasNextPage()).toBeTruthy();

        paginator.reset();

        expect(paginator.currentPageIndex).toBe(-1);
        expect(paginator.currentPage).toBeUndefined();
        expect(paginator.pages).toEqual([]);
        expect(paginator.listOptions.after).toBeNull();
    });

    it("should return iterator result from return method", async () => {
        const paginator = new NewPaginator(null);

        const iteratorResult = await paginator.return(1);

        expect(iteratorResult.done).toBeTruthy();
        expect(iteratorResult.value).toBe(1);
    });

    it("should throw from throw method", () => {
        const paginator = new NewPaginator(null);

        expect(() => paginator.throw(new Error("some error"))).toThrow();
    });

    const checkPage = (page: Page<Entity>, paginator: NewPaginator<Entity, ListOptions>, after: string, index: number) => {
        expect(page).not.toBeUndefined();
        expect(page.after).toBe(after);
        expect(paginator.currentPageAfter).toEqual(page.after);
        expect(paginator.listOptions.after).toEqual(page.after);
        expect(paginator.currentPageIndex).toBe(index);
        expect(paginator.currentPage).toBe(page);
        expect(paginator.pages[index]).toBe(page);
    }

});
