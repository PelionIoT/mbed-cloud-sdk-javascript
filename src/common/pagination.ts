/*
 * Mbed Cloud JavaScript SDK
 * Copyright Arm Limited 2018
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ListResponse } from "../legacy/common/listResponse";
import { ListOptions } from "../legacy/common/interfaces";

// Run `execute` for all items returned from getPage, one page at a time. If any call to getPage or execute fails, the resulting promise is rejected.
export const executeForAll = <T extends { id: string }>(
    getPage: (options: { after?: string }) => Promise<ListResponse<T>>,
    execute: (id: string) => Promise<void>,
) => {
    const recur = (after?: string): Promise<void> => {
        return getPage({ after })
            .then(({ data, hasMore }) => {
                const executePromises = data.map(({ id }) => execute(id));

                // Execute for all items in current page, then recur
                return Promise.all(executePromises)
                    .then(() => {
                        return hasMore ? recur(data[data.length - 1].id) : null;
                    });
            });
    };

    return recur();
};

/**
 * ## Paginator
 * Iterator-like object over an entire result set of a truncated/paginated API operation (for instance,  listConnectedDevices).
 */
export class Paginator<T, U extends ListOptions> {
    private pageRequester: (options: U) => Promise<ListResponse<T>>;
    private listOptions: U;
    private currentPageIndex: number;
    private currentPageData: ListResponse<T>;
    private isFirstRequest: boolean;
    private currentElementIndex: number;
    private collectionTotalCount: number;

    public maxResults?: number;

    /**
     * Constructor
     * @param getPage Method returning a page of results ([ListResponse](./listresponse.html))
     * @param maxResults The maximum number of results to return
     * @param options List options
     */
    constructor(getPage: (options: U) => Promise<ListResponse<T>>, options?: U) {
        this.maxResults = options ? options.maxResults || options.limit || 50 : 50;
        this.listOptions = Object.create(options || null);
        const pageSizeParameterName = "pageSize";
        if (pageSizeParameterName in this.listOptions) {
            this.listOptions.limit = this.listOptions[pageSizeParameterName];
        }
        this.pageRequester = getPage;
        this.collectionTotalCount = undefined;
        this.reset();
    }
    /**
     * Resets the state of the iterator.
     */
    private reset(): void {
        this.currentPageIndex = -1;
        this.currentElementIndex = -1;
        this.isFirstRequest = true;
        this.currentPageData = null;
    }

    private setCurrentPage(page: ListResponse<T>): void {
        this.currentPageData = page;
        this.currentPageIndex++;
    }

    private fetchNextPageCursor(page: ListResponse<T>): string {
        if (page && page.data.length !== 0) {
            return page.continuationMarker ? page.continuationMarker : this.fetchIdOfLastElement(page);
        }
        return null;
    }

    private fetchIdOfLastElement(page: ListResponse<T>): string {
        const lastElement = page.data.slice(-1).pop();
        const idParameterName = "id";
        return "" + (lastElement[idParameterName] || lastElement);
    }

    private hasNewPage(): boolean {
        if (this.maxResults && this.pageSize() * (this.currentPageIndex + 1) > this.maxResults) {
            return false;
        }
        const nextPage = this.currentPageData ? this.currentPageData.hasMore : this.isFirstRequest;
        return nextPage;
    }

    private nextPage(): Promise<ListResponse<T>> {
        if (this.hasNewPage()) {
            this.currentElementIndex = -1;
            const after: string = this.currentPageIndex < 0 ? null : this.fetchNextPageCursor(this.currentPageData);
            const newPageOptions: U = Object.create(this.listOptions || null);
            newPageOptions.after = after;
            return this.pageRequester(newPageOptions)
                .then(page => {
                    this.setCurrentPage(page);
                    this.isFirstRequest = false;
                    return page;
                })
                .then(page => {
                    if (page && page.data.length !== 0) {
                        return new ListResponse<T>(page, page.data.slice(0, this.remainingElementsNumber()));
                    } else {
                        return null;
                    }
                })
                .catch(e => {
                    throw e;
                });
        } else {
            return Promise.resolve(null);
        }
    }

    /**
     * Gets collection total count (Approximate number of results according to the API).
     */
    public totalCount(): Promise<number> {
        if (this.collectionTotalCount) {
            return Promise.resolve(this.collectionTotalCount);
        }
        if (this.currentPageData && this.currentPageData.totalCount) {
            this.collectionTotalCount = this.currentPageData.totalCount;
            return Promise.resolve(this.collectionTotalCount);
        } else {
            const newPageOptions: U = Object.create(this.listOptions || null);
            if (newPageOptions.include && newPageOptions.include instanceof Array) {
                newPageOptions.include.push("totalCount");
            } else {
                newPageOptions.include = [ "totalCount" ];
            }
            return this.pageRequester(newPageOptions)
                .then(page => {
                    this.collectionTotalCount = page ? page.totalCount : undefined;
                    return this.collectionTotalCount;
                })
                .catch(e => {
                    throw e;
                });
        }
    }
    /**
     * Gets page size.
     */
    public pageSize(): number {
        return this.currentPageData ? this.currentPageData.data.length : this.listOptions.limit;
    }

    /**
     * Checks whether there is a next element in the collection.
     */
    public hasNext(): boolean {
        if (this.hasNewPage()) {
            return true;
        }
        const remainder = this.remainingElementsNumber();
        return this.currentElementIndex < remainder - 1;
    }

    private remainingElementsNumber(): number {
        const remainingResults: number = this.maxResults ? this.maxResults - this.pageSize() * this.currentPageIndex : this.pageSize();
        return remainingResults ? remainingResults < 0 ? 0 : remainingResults : null;
    }

    private fetchElementInPage(page: ListResponse<T>, index: number, remainder: number, setIndex: boolean): T {
        if (!page) {
            return null;
        }
        const elementIndex: number = index > remainder ? remainder : index;
        if (setIndex) {
            this.currentElementIndex = elementIndex;
        }
        return elementIndex < 0 || elementIndex >= page.data.length ? null : page.data[elementIndex];
    }
    /**
     * Returns the first item from the query, or null if there are no results.
     */
    public first(): Promise<T> {
        this.reset();
        return this.next();
    }

    /**
     *  Gets next element in the sequence.
     */
    public next(): Promise<T> {
        this.currentElementIndex++;
        if (this.currentPageData) {
            const nextElement = this.fetchElementInPage(this.currentPageData, this.currentElementIndex, this.remainingElementsNumber(), false);
            return nextElement ? Promise.resolve(nextElement) : this.nextPage().then( page => page ? this.next() : null);
        } else {
            return this.nextPage().then( page => page ? this.next() : null);
        }
    }

    private browseAndConcatenateAllPages(): Promise<Array<T>> {
        if (this.hasNewPage()) {
            return this.nextPage().then( page => this.browseAndConcatenateAllPages().then( data => page.data.length === 0 ? data : page.data.concat(data)));
        }
        return Promise.resolve([]);
    }

    private executeOnAllElements(execute: (element: T) => Promise<void>) {
        if (this.hasNext()) {
            return this.next().then( element => execute(element)).then(() => this.executeOnAllElements(execute));
        }
        return Promise.resolve();
    }
    /**
     * Executes a function on all the elements of the collection.
     * @param execute method to execute on the elements
     * Note: This requires browsing the whole collection and therefore can be expensive.
     */
    public executeForAll(execute: (element: T) => Promise<void>): Promise<void> {
        this.reset();
        return this.executeOnAllElements(execute);
    }
    /**
     * Gets an array of all the elements of the collection.
     * Note: This requires browsing the whole collection and therefore can be expensive.
     * Moreover, all elements are stored in memory and hence, be careful when dealing with big collections.
     */
    public all(): Promise<Array<T>> {
        this.reset();
        return this.browseAndConcatenateAllPages();
    }
}
