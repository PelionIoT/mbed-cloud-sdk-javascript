import { ListOptions } from "../legacy/common/interfaces";
import { Page } from "./page";
import { Entity } from "./entity";
import { isArray } from "util";

export class Paginator<T extends Entity, U extends ListOptions> implements AsyncIterableIterator<T> {
    private _totalCount: number;
    private firstItem: T;
    public readonly listOptions: U;
    public readonly pageSize: number;
    public readonly totalPages: number;
    public currentPageIndex: number;
    public currentPageAfter: string;
    public currentPage: Page<T>;
    public pages: Array<Page<T>>;
    public currentItemIndex: number;
    public readonly maxResults: number;
    public readonly fetchPage: (options: U) => Promise<Page<T>>;

    constructor(fetchPage: (options: U) => Promise<Page<T>>, options?: U) {
        options = options || {} as U;
        this.listOptions = options;
        this.listOptions.limit = this.listOptions.limit || this.listOptions.pageSize;
        this.maxResults = options.maxResults || options.limit || 50;
        this.pageSize = options.pageSize || 50;
        this.totalPages = Math.ceil(this.maxResults / this.pageSize);
        this.fetchPage = fetchPage;

        this.reset();
    }

    public reset(): void {
        this.currentPageIndex = -1;
        this.currentPage = undefined;
        this.pages = [];
        this.listOptions.after = null;
        this.currentItemIndex = -1;
    }

    public hasNextPage(): boolean {
        if (this.currentPageIndex === -1) {
            return true;
        }

        return this.currentPageIndex < this.totalPages - 1 && this.currentPage.hasMore;
    }

    public async nextPage(): Promise<Page<T>> {
        if (this.hasNextPage()) {
            try {
                const page = await this.fetchPage(this.listOptions);
                if (page) {
                    this.currentPage = page;
                    this.pages.push(page);
                    this._totalCount = page.totalCount;
                    this.currentPageAfter = page.after || page.continuationMarker || null;
                    this.listOptions.after = this.currentPageAfter;
                    if (this.currentPageIndex === -1) {
                        this.firstItem = page.first();
                    }
                    this.currentPageIndex++;

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

    public async first(): Promise<T> {
        if (this.firstItem) {
            return this.firstItem;
        }

        this.reset();
        return await this.nextItem();
    }

    public async all(): Promise<Array<T>> {
        this.reset();
        const allItems = [];
        for await (const item of this) {
            allItems.push(item);
        }

        return allItems;
    }

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

    private hasNextItem(): boolean {
        if (this.hasNextPage()) {
            return true;
        }

        return this.currentItemIndex < this.maxResults - 1;
    }

    private async fetchNextPage(): Promise<T> {
        await this.nextPage();
        const nextItem = this.currentPage.next();
        if (nextItem.value) {
            return nextItem.value;
        }
    }

    private async nextItem(): Promise<T> {
        this.currentItemIndex++;
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
