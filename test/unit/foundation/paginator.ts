import { ListOptions } from "../../../src/legacy/common/interfaces";
import { Paginator, Page } from "../../../src";
import { Entity } from "../../../src/common/entity";
import { FetchPageStub } from "../../fetchPageStub";

describe("test paginator", () => {

    it("should set options", () => {
        const options: ListOptions = {
            maxResults: 10,
        };

        const paginator = new Paginator(null, options);

        expect(paginator.listOptions.maxResults).toBe(10);
    });

    it("should set max results", () => {
        const options: ListOptions = {
            maxResults: 10,
        };

        const paginator = new Paginator(null, options);

        expect(paginator.maxResults).toBe(10);
    });

    it("should set max results from limit", () => {
        const options: ListOptions = {
            limit: 10,
        };

        const paginator = new Paginator(null, options);

        expect(paginator.maxResults).toBe(10);
    });

    it("should set page size", () => {
        const options: ListOptions = {
            pageSize: 10,
        };

        const paginator = new Paginator(null, options);

        expect(paginator.pageSize).toBe(10);
    });

    it("should set totalPages when maxResults > pageSize", () => {
        const options: ListOptions = {
            maxResults: 50,
            pageSize: 10,
        };

        const paginator = new Paginator(null, options);

        expect(paginator.totalPages).toBe(5);
    });

    it("should set totalPages when maxResults < pageSize", () => {
        const options: ListOptions = {
            maxResults: 10,
            pageSize: 50,
        };

        const paginator = new Paginator(null, options);

        expect(paginator.totalPages).toBe(1);
    });

    it("should set defaults", () => {
        const options: ListOptions = {};

        const paginator = new Paginator(null, options);

        expect(paginator.maxResults).toBe(50);
        expect(paginator.pageSize).toBe(50);
        expect(paginator.totalPages).toBe(1);
        expect(paginator.currentPageIndex).toBe(-1);
        expect(paginator.currentPage).toBeNull();
        expect(paginator.afters).toEqual([]);
        expect(paginator.currentTotalCount).toBe(0);
    });

    it("should fetch one page", async () => {
        const fetchData = new FetchPageStub();

        const options: ListOptions = {
            pageSize: 3,
            maxResults: 15,
        };

        const paginator = new Paginator<Entity, ListOptions>(fetchData.getDataFunc(), options);

        const page = await paginator.nextPage();

        expect(page).not.toBeUndefined();
        expect(await paginator.totalCount()).toBe(12);
        expect(paginator.currentTotalCount).toBe(12);
        checkPage(page, paginator, "AAAC", 0);

        expect(paginator.hasNextPage()).toBeTruthy();
    });

    it("should fetch all pages using nextPage", async () => {
        const fetchData = new FetchPageStub();

        const options: ListOptions = {
            pageSize: 3,
            maxResults: 15,
        };

        const paginator = new Paginator<Entity, ListOptions>(fetchData.getDataFunc(), options);

        const page = await paginator.nextPage();

        expect(await paginator.totalCount()).toBe(12);
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

        const paginator = new Paginator<Entity, ListOptions>(fetchData.getDataFunc(), options);

        const page = await paginator.nextPage();

        expect(page).not.toBeUndefined();
        checkPage(page, paginator, "AAAC", 0);

        expect(paginator.hasNextPage()).toBeTruthy();

        paginator.reset();

        expect(paginator.currentPageIndex).toBe(-1);
        expect(paginator.currentPage).toBeNull();
        expect(paginator.afters).toEqual([]);
        expect(paginator.listOptions.after).toBeNull();
    });

    it("should return iterator result from return method", async () => {
        const paginator = new Paginator(null);

        const iteratorResult = await paginator.return(1);

        expect(iteratorResult.done).toBeTruthy();
        expect(iteratorResult.value).toBe(1);
    });

    it("should throw from throw method", () => {
        const paginator = new Paginator(null);

        expect(() => paginator.throw(new Error("some error"))).toThrow();
    });

    it("should iterate over items", async () => {
        const fetchData = new FetchPageStub();

        const options: ListOptions = {
            pageSize: 3,
            maxResults: 15,
        };

        const paginator = new Paginator<Entity, ListOptions>(fetchData.getDataFunc(), options);

        let index = 0;
        for await (const item of paginator) {
            expect(item).not.toBeUndefined();
            expect(item).toBe(fetchData.allData[index++]);
        }

        expect(index).toEqual(fetchData.allData.length);
    });

    it("should iterate over items and reset", async () => {
        const fetchData = new FetchPageStub();

        const options: ListOptions = {
            pageSize: 3,
            maxResults: 15,
        };

        const paginator = new Paginator<Entity, ListOptions>(fetchData.getDataFunc(), options);

        let index = 0;
        for await (const item of paginator) {
            expect(item).not.toBeUndefined();
            expect(item).toBe(fetchData.allData[index++]);
        }

        expect(index).toEqual(fetchData.allData.length);

        index = 0;
        fetchData.reset();
        for await (const item of paginator) {
            expect(item).not.toBeUndefined();
            expect(item).toBe(fetchData.allData[index++]);
        }

        expect(index).toEqual(fetchData.allData.length);
    });

    it("should iterate over items when max results is smaller than amount of data", async () => {
        const fetchData = new FetchPageStub();

        const options: ListOptions = {
            pageSize: 3,
            maxResults: 7,
        };

        const paginator = new Paginator<Entity, ListOptions>(fetchData.getDataFunc(), options);

        let index = 0;
        for await (const item of paginator) {
            expect(item).not.toBeUndefined();
            expect(item).toBe(fetchData.allData[index++]);
        }

        expect(index).toEqual(7);
    });

    it("should iterate over items when max results is smaller than amount of data and page size", async () => {
        const fetchData = new FetchPageStub();

        const options: ListOptions = {
            pageSize: 3,
            maxResults: 2,
        };

        const paginator = new Paginator<Entity, ListOptions>(fetchData.getDataFunc(), options);

        let index = 0;
        for await (const item of paginator) {
            expect(item).not.toBeUndefined();
            expect(item).toBe(fetchData.allData[index++]);
        }

        expect(index).toEqual(2);
    });

    it("should get first item", async () => {
        const fetchData = new FetchPageStub();

        const options: ListOptions = {
            pageSize: 3,
            maxResults: 15,
        };

        const paginator = new Paginator<Entity, ListOptions>(fetchData.getDataFunc(), options);

        const firstItem = await paginator.first();

        expect(firstItem).toBe(fetchData.allData[0]);

        const firstItemFromCache = await paginator.first();

        expect(firstItemFromCache).toBe(fetchData.allData[0]);
    });

    it("should get all items", async () => {
        const fetchData = new FetchPageStub();

        const options: ListOptions = {
            pageSize: 3,
            maxResults: 15,
        };

        const paginator = new Paginator<Entity, ListOptions>(fetchData.getDataFunc(), options);

        const allItems = await paginator.all();

        expect(allItems).toHaveLength(fetchData.allData.length);
        allItems.forEach((item, index) => {
            expect(item).toBe(fetchData.allData[index]);
        });

        fetchData.reset();
        const allItemsAgain = await paginator.all();

        expect(allItemsAgain).toHaveLength(fetchData.allData.length);
        allItemsAgain.forEach((item, index) => {
            expect(item).toBe(fetchData.allData[index]);
        });
    });

    it("should get total count", async () => {
        const fetchData = new FetchPageStub();

        const options: ListOptions = {
            pageSize: 3,
            maxResults: 15,
            include: [
                "someIncludeValue",
            ]
        };

        const paginator = new Paginator<Entity, ListOptions>(fetchData.getDataFunc(), options);

        expect(await paginator.totalCount()).toBe(12);
        expect(await paginator.totalCount()).toBe(12);

        expect(paginator.listOptions.include).toContain("totalCount");
    });

    it("should not return previous page in start state, or at page one", async () => {
        const fetchData = new FetchPageStub();

        const options: ListOptions = {
            pageSize: 3,
            maxResults: 15,
        };

        const paginator = new Paginator<Entity, ListOptions>(fetchData.getDataFunc(), options);

        expect(await paginator.previousPage()).toBeUndefined();

        await paginator.nextPage();

        expect(await paginator.previousPage()).toBeUndefined();
    });

    it("should not return if gotToPage number is greater than total pages", async () => {
        const fetchData = new FetchPageStub();

        const options: ListOptions = {
            pageSize: 3,
            maxResults: 12,
        };

        const paginator = new Paginator<Entity, ListOptions>(fetchData.getDataFunc(), options);

        expect(await paginator.goToPage(5)).toBeUndefined();
    });

    it("should return previous page", async () => {
        const fetchData = new FetchPageStub();

        const options: ListOptions = {
            pageSize: 3,
            maxResults: 15,
        };

        const paginator = new Paginator<Entity, ListOptions>(fetchData.getDataFunc(), options);

        expect(await paginator.previousPage()).toBeUndefined();

        const firstPage = await paginator.nextPage();

        expect(await paginator.previousPage()).toBeUndefined();

        const secondPage = await paginator.nextPage();

        fetchData.index -= 2;
        let firstPreviousPage = await paginator.previousPage();
        expect(firstPreviousPage).toEqual(firstPage);

        await paginator.nextPage();

        const thirdPage = await paginator.nextPage();

        await paginator.nextPage();

        fetchData.index -= 2;
        const thirdPreviousPage = await paginator.previousPage();
        expect(thirdPreviousPage).toEqual(thirdPage);

        fetchData.index -= 2;
        const secondPreviousPage = await paginator.previousPage();
        expect(secondPreviousPage).toEqual(secondPage);

        fetchData.index -= 2;
        firstPreviousPage = await paginator.previousPage();
        expect(firstPreviousPage).toEqual(firstPage);
    });

    it("should return current page if gotToPage value matches current page index", async () => {
        const fetchData = new FetchPageStub();

        const options: ListOptions = {
            pageSize: 3,
            maxResults: 15,
        };

        const paginator = new Paginator<Entity, ListOptions>(fetchData.getDataFunc(), options);

        const firstPage = await paginator.nextPage();

        const goToPageOne = await paginator.goToPage(1);

        expect(firstPage).toBe(goToPageOne);
    });

    it("should return a previous page from gotToPage", async () => {
        const fetchData = new FetchPageStub();

        const options: ListOptions = {
            pageSize: 3,
            maxResults: 15,
        };

        const paginator = new Paginator<Entity, ListOptions>(fetchData.getDataFunc(), options);

        const firstPage = await paginator.nextPage();

        await paginator.nextPage();
        await paginator.nextPage();

        fetchData.index = -1;
        const goToFirstPage = await paginator.goToPage(1);

        expect(goToFirstPage).toEqual(firstPage);
    });

    it("should got to future pages with gotToPage", async () => {
        const fetchData = new FetchPageStub();

        const options: ListOptions = {
            pageSize: 3,
            maxResults: 15,
        };

        const paginator = new Paginator<Entity, ListOptions>(fetchData.getDataFunc(), options);

        const pageOne = await paginator.nextPage();
        const pageTwo = await paginator.nextPage();
        const pageThree = await paginator.nextPage();
        const pageFour = await paginator.nextPage();

        paginator.reset();
        fetchData.index = -1;
        const goToThirdPage = await paginator.goToPage(3);
        expect(goToThirdPage).toEqual(pageThree);

        paginator.reset();
        fetchData.index = -1;
        const goToFirstPage = await paginator.goToPage(1);
        expect(goToFirstPage).toEqual(pageOne);

        paginator.reset();
        fetchData.index = -1;
        const goToFourthPage = await paginator.goToPage(4);
        expect(goToFourthPage).toEqual(pageFour);

        paginator.reset();
        fetchData.index = -1;
        const goToSecondPage = await paginator.goToPage(2);
        expect(goToSecondPage).toEqual(pageTwo);
    });

    it("should got to future pages with gotToPage using cached afters", async () => {
        const fetchData = new FetchPageStub();

        const options: ListOptions = {
            pageSize: 3,
            maxResults: 15,
        };

        const paginator = new Paginator<Entity, ListOptions>(fetchData.getDataFunc(), options);

        const pageOne = await paginator.nextPage();
        const pageTwo = await paginator.nextPage();
        const pageThree = await paginator.nextPage();
        const pageFour = await paginator.nextPage();

        fetchData.index = 0;
        const goToSecondPage = await paginator.goToPage(2);
        expect(goToSecondPage).toEqual(pageTwo);

        fetchData.index = 1;
        const goToThirdPage = await paginator.goToPage(3);
        expect(goToThirdPage).toEqual(pageThree);

        fetchData.index = -1;
        const goToFirstPage = await paginator.goToPage(1);
        expect(goToFirstPage).toEqual(pageOne);

        fetchData.index = 2;
        const goToFourthPage = await paginator.goToPage(4);
        expect(goToFourthPage).toEqual(pageFour);
    });

    const checkPage = (page: Page<Entity>, paginator: Paginator<Entity, ListOptions>, after: string, index: number) => {
        expect(page).not.toBeUndefined();
        expect(page.after).toBe(after);
        expect(paginator.currentPageAfter).toEqual(page.after);
        expect(paginator.listOptions.after).toEqual(page.after);
        expect(paginator.currentPageIndex).toBe(index);
        expect(paginator.currentPage).toBe(page);
        expect(paginator.afters[index]).toBe(page.after);
    };

});
