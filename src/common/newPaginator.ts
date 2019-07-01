import { ListOptions } from "../legacy/common/interfaces";
import { Page } from "./Page";
import { Entity } from "./entity";

export class NewPaginator<T extends Entity, U extends ListOptions> implements AsyncIterableIterator<T> {
    public readonly listOptions: U;
    public totalCount: number;
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
        this.totalCount = 0;

        this.reset();
    }

    public hasNextPage(): boolean {
        if (this.currentPageIndex === -1) {
            return true;
        }

        return this.currentPageIndex < this.totalPages && this.currentPage.hasMore;
    }

    public async nextPage(): Promise<Page<T>> {
        if (this.hasNextPage()) {
            try {
                const page = await this.fetchPage(this.listOptions);
                if (page) {
                    this.currentPage = page;
                    this.pages.push(page);
                    this.totalCount = page.totalCount;
                    this.currentPageAfter = page.after || page.continuationMarker || null;
                    this.listOptions.after = this.currentPageAfter;
                    this.currentPageIndex++;

                    return page;
                }
            } catch (e) {
                throw e;
            }
        }
    }

    public reset(): void {
        this.currentPageIndex = -1;
        this.currentPage = undefined;
        this.pages = [];
        this.listOptions.after = null;
        this.currentItemIndex = -1;
    }

    public [Symbol.asyncIterator](): AsyncIterableIterator<T> {
        this.reset();
        return this;
    }

    public hasNextItem(): boolean {
        if (this.hasNextPage()) {
            return true;
        }

        return this.currentItemIndex < this.maxResults;
    }

    private async nextItem(): Promise<T> {
        this.currentItemIndex++;
        if (this.currentPage) {
            const item = this.currentPage.next();
            if (item.done && this.hasNextPage()) {
                await this.nextPage();
                const nextItem = this.currentPage.next();
                if (!nextItem.done) {
                    return nextItem.value;
                }
            }
        }
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
}
