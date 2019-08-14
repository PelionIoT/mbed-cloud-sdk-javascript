import { ListOptions } from "./listOptions";
import { Page } from "./page";
import { Entity } from "./entity";
import { isArray } from "util";

/**
 * Paginator
 */
export class Paginator<T extends Entity, U extends ListOptions> implements AsyncIterableIterator<T> {
    private _totalCount: number;
    private _firstItem: T;
    private _currentPageIndex: number;
    private _currentPageAfter: string;
    private _currentPageHasMore: boolean;
    private _currentPage: Page<T>;
    private _afters: Array<string>;
    private _currentItemIndex: number;
    private _totalPages: number;

    /**
     * The list options to pass to all api calls during pagination
     */
    public readonly listOptions: U;

    /**
     * The size of each page
     */
    public readonly pageSize: number;

    /**
     * The maximum number of results to receive
     */
    public readonly maxResults: number;

    /**
     * The function that returns each page
     */
    public readonly fetchPageFunction: (options: U) => Promise<Page<T>>;

    /**
     * The total number of possible pages, calculated using mazResults and pageSize
     */
    public get totalPages() {
        return this._totalPages;
    }

    /**
     * The index of the current page (0 indexed)
     */
    public get currentPageIndex() {
        return this._currentPageIndex;
    }

    /**
     * The after value of the current page (id of the last item)
     */
    public get currentPageAfter() {
        return this._currentPageAfter;
    }

    /**
     * The current page
     */
    public get currentPage() {
        return this._currentPage;
    }

    /**
     * An array of cached after values
     */
    public get afters() {
        return this._afters;
    }

    /**
     * Create a new instance of a Paginator
     * @param fetchPage the function to fetch each page
     * @param options the listOptions that are passed to every fetchPage call
     */
    constructor(fetchPage: (options: U) => Promise<Page<T>>, options?: U) {
        options = options || {} as U;
        this.listOptions = options;
        this.listOptions.limit = this.listOptions.limit || this.listOptions.pageSize;
        this.maxResults = options.maxResults || options.limit || 50;
        this.pageSize = options.pageSize || 50;
        this._totalPages = this.getTotalPages(this.maxResults, this.pageSize);
        this.fetchPageFunction = fetchPage;

        this.reset();
    }

    /**
     * Reset the Paginator
     * Removes all cahced items and resets all indexes
     */
    public reset(): void {
        this._currentPageIndex = -1;
        this._currentPage = undefined;
        this._afters = [];
        this.listOptions.after = null;
        this._currentItemIndex = -1;
        this._currentPageHasMore = true;
    }

    /**
     * Return true if the next page is available
     */
    public hasNextPage(): boolean {
        if (this.currentPageIndex === -1) {
            return true;
        }

        return this.currentPageIndex < this.totalPages - 1 && this._currentPageHasMore;
    }

    /**
     * Get the next page
     */
    public async nextPage(): Promise<Page<T>> {
        if (this.hasNextPage()) {
            try {
                const page = await this.fetchPageFunction(this.listOptions);
                if (page) {
                    this._currentPage = page;
                    this._totalCount = page.totalCount;
                    if (this._totalCount && this._totalCount < this.maxResults) {
                        this._totalPages = this.getTotalPages(this._totalCount, this.pageSize);
                    }
                    this._currentPageAfter = page.after;
                    this._currentPageHasMore = page.hasMore;
                    this._afters.push(this._currentPageAfter);
                    this.listOptions.after = this._currentPageAfter;
                    if (this.currentPageIndex === -1) {
                        this._firstItem = page.first();
                    }
                    this._currentPageIndex++;

                    return page;
                }
            } catch (e) {
                throw e;
            }
        }
    }

    public [Symbol.asyncIterator](): AsyncIterableIterator<T> {
        return this;
    }

    /**
     * Get the next item with the iterator.
     */
    public async next(): Promise<IteratorResult<T>> {
        if (this.hasNextItem()) {
            const nextItem = await this.nextItem();
            if (nextItem) {
                return {
                    value: nextItem,
                    done: false,
                };
            }
        }

        this.reset();
        return {
            value: null,
            done: true,
        };
    }

    public return(value?: any): Promise<IteratorResult<T>> {
        return Promise.resolve<IteratorResult<T>>({
            value,
            done: true
        });
    }

    public throw(e?: any): Promise<IteratorResult<T>> {
        throw e;
    }

    /**
     * Get the first item in the list
     */
    public async first(): Promise<T> {
        if (this._firstItem) {
            return this._firstItem;
        }

        this.reset();
        return await this.nextItem();
    }

    /**
     * Get all possible items
     * Note that this should only be used with a small value for maxResults
     */
    public async all(): Promise<Array<T>> {
        this.reset();
        const allItems = [];
        for await (const item of this) {
            allItems.push(item);
        }

        return allItems;
    }

    /**
     * Get the number of items to be returned
     */
    public async totalCount(): Promise<number> {
        if (this._totalCount === null || this._totalCount === undefined) {
            this.reset();
            if (isArray(this.listOptions.include) && !this.listOptions.include.includes("totalCount")) {
                this.listOptions.include.push("totalCount");
            } else {
                this.listOptions.include = [ "totalCount" ];
            }
            await this.nextPage();
            this.reset();
            return this._totalCount;
        }

        return this._totalCount;
    }

    /**
     * Get the previous page
     */
    public async previousPage(): Promise<Page<T>> {
        if (this._currentPageIndex < 1) {
            return;
        }

        this._currentPageIndex -= 2;
        return await this.getPreviousPageAtIndex();
    }

    /**
     * Go to a specific page
     * @param number the page number
     */
    public async goToPage(number: number): Promise<Page<T>> {
        if (number > this.totalPages) {
            // page is unreachable
            return;
        }

        if (number === this.currentPageIndex + 1) {
            return this.currentPage;
        }

        if (number < this._currentPageIndex + 1) {
            // go backwards to a page we've already been to
            const diff = (this._currentPageIndex + 1) - number;
            this._currentPageIndex = this._currentPageIndex - diff - 2;
            return await this.getPreviousPageAtIndex();
        } else {
            // go forwards
            const diff = number - (this._currentPageIndex + 1);
            const targetIndex = this._currentPageIndex + diff;
            const after = this._afters[this._currentPageIndex];
            if (after) {
                // we have a cached after, so go straight to the page
                this._currentPageIndex = targetIndex - 1;
                this._currentPageHasMore = true;
                this.listOptions.after = after;
                return await this.nextPage();
            } else {
                // we haven't been to this page before, so we iterate towards it
                while (this._currentPageIndex < targetIndex) {
                    await this.nextPage();
                }

                return this.currentPage;
            }
        }

    }

    private async getPreviousPageAtIndex(): Promise<Page<T>> {
        const after = this._afters[this._currentPageIndex];
        if (after) {
            this._currentPageHasMore = true;
            this.listOptions.after = after;
            return await this.nextPage();
        } else {
            this.reset();
            return await this.nextPage();
        }
    }

    private getTotalPages(maxResults: number, pageSize: number): number {
        return Math.ceil(maxResults / pageSize);
    }

    private hasNextItem(): boolean {
        if (this.hasNextPage()) {
            return true;
        }

        return this._currentItemIndex < this.maxResults - 1;
    }

    private async fetchNextPage(): Promise<T> {
        await this.nextPage();
        if (this.currentPage) {
            const nextItem = this.currentPage.next();
            if (nextItem.value) {
                return nextItem.value;
            }
        }

        return null;
    }

    private async nextItem(): Promise<T> {
        this._currentItemIndex++;
        if (this.currentPage) {
            const item = this.currentPage.next();
            if (item.done && this.hasNextPage()) {
                return await this.fetchNextPage();
            }

            if (item.value) {
                return item.value;
            }
        } else {
            return await this.fetchNextPage();
        }
    }
}
