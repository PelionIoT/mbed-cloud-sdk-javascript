/*
 * Pelion Device Management JavaScript SDK
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ListResponse } from "../legacy/common/listResponse";
/**
 * Run `execute` for all items returned from getPage, one page at a time. If any call to getPage or execute fails, the resulting promise is rejected.
 * @typeparam T  object that contains an Id property
 * @param getPage The function for receiving a page
 * @param execute The function to execute on each item
 */
export const executeForAll = (getPage, execute) => {
    const recur = (after) => {
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
 * Paginator
 * Iterator-like object over an entire result set of a truncated/paginated API operation (for instance,  listConnectedDevices).
 * @typeparam T Entity to paginate over
 * @typeparam U ListOptions class for paginator to use
 */
export class Paginator {
    /**
     * Constructor
     * @param getPage Method returning a page of results ([ListResponse](./listresponse.html))
     * @param maxResults The maximum number of results to return
     * @param options List options
     */
    constructor(getPage, options) {
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
    reset() {
        this.currentPageIndex = -1;
        this.currentElementIndex = -1;
        this.isFirstRequest = true;
        this.currentPageData = null;
    }
    setCurrentPage(page) {
        this.currentPageData = page;
        this.currentPageIndex++;
    }
    fetchNextPageCursor(page) {
        if (page && page.data.length !== 0) {
            return page.continuationMarker ? page.continuationMarker : this.fetchIdOfLastElement(page);
        }
        return null;
    }
    fetchIdOfLastElement(page) {
        const lastElement = page.data.slice(-1).pop();
        const idParameterName = "id";
        return "" + (lastElement[idParameterName] || lastElement);
    }
    hasNewPage() {
        if (this.maxResults && this.pageSize() * (this.currentPageIndex + 1) > this.maxResults) {
            return false;
        }
        const nextPage = this.currentPageData ? this.currentPageData.hasMore : this.isFirstRequest;
        return nextPage;
    }
    nextPage() {
        if (this.hasNewPage()) {
            this.currentElementIndex = -1;
            const after = this.currentPageIndex < 0 ? null : this.fetchNextPageCursor(this.currentPageData);
            const newPageOptions = Object.create(this.listOptions || null);
            newPageOptions.after = after;
            return this.pageRequester(newPageOptions)
                .then(page => {
                this.setCurrentPage(page);
                this.isFirstRequest = false;
                return page;
            })
                .then(page => {
                if (page && page.data.length !== 0) {
                    return new ListResponse(page, page.data.slice(0, this.remainingElementsNumber()));
                }
                else {
                    return null;
                }
            })
                .catch(e => {
                throw e;
            });
        }
        else {
            return Promise.resolve(null);
        }
    }
    [Symbol.asyncIterator]() {
        this.reset();
        return this;
    }
    return(value) {
        return Promise.resolve({
            value,
            done: true
        });
    }
    throw(e) {
        throw e;
    }
    /**
     * Gets collection total count (Approximate number of results according to the API).
     */
    totalCount() {
        if (this.collectionTotalCount) {
            return Promise.resolve(this.collectionTotalCount);
        }
        if (this.currentPageData && this.currentPageData.totalCount) {
            this.collectionTotalCount = this.currentPageData.totalCount;
            return Promise.resolve(this.collectionTotalCount);
        }
        else {
            const newPageOptions = Object.create(this.listOptions || null);
            if (newPageOptions.include && newPageOptions.include instanceof Array) {
                newPageOptions.include.push("totalCount");
            }
            else {
                newPageOptions.include = ["totalCount"];
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
    pageSize() {
        return this.currentPageData ? this.currentPageData.data.length : this.listOptions.limit;
    }
    /**
     * Checks whether there is a next element in the collection.
     */
    hasNext() {
        if (this.hasNewPage()) {
            return true;
        }
        const remainder = this.remainingElementsNumber();
        return this.currentElementIndex < remainder - 1;
    }
    remainingElementsNumber() {
        const remainingResults = this.maxResults ? this.maxResults - this.pageSize() * this.currentPageIndex : this.pageSize();
        return remainingResults ? remainingResults < 0 ? 0 : remainingResults : null;
    }
    fetchElementInPage(page, index, remainder, setIndex) {
        if (!page) {
            return null;
        }
        const elementIndex = index > remainder ? remainder : index;
        if (setIndex) {
            this.currentElementIndex = elementIndex;
        }
        return elementIndex < 0 || elementIndex >= page.data.length ? null : page.data[elementIndex];
    }
    /**
     * Returns the first item from the query, or null if there are no results.
     */
    first() {
        this.reset();
        return this.nextItem();
    }
    /**
     *  Gets next element in the sequence.
     */
    nextItem() {
        this.currentElementIndex++;
        if (this.currentPageData) {
            const nextElement = this.fetchElementInPage(this.currentPageData, this.currentElementIndex, this.remainingElementsNumber(), false);
            return nextElement ? Promise.resolve(nextElement) : this.nextPage().then(page => page ? this.nextItem() : null);
        }
        else {
            return this.nextPage().then(page => page ? this.nextItem() : null);
        }
    }
    next() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.hasNext()) {
                const nextItem = yield this.nextItem();
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
        });
    }
    browseAndConcatenateAllPages() {
        if (this.hasNewPage()) {
            return this.nextPage()
                .then(page => this.browseAndConcatenateAllPages()
                .then(data => {
                if (page && page.data) {
                    return page.data.length === 0 ? data : page.data.concat(data);
                }
                return [];
            }));
        }
        return Promise.resolve([]);
    }
    executeOnAllElements(execute) {
        if (this.hasNext()) {
            return this.nextItem().then(element => execute(element)).then(() => this.executeOnAllElements(execute));
        }
        return Promise.resolve();
    }
    /**
     * Executes a function on all the elements of the collection.
     * @param execute method to execute on the elements
     * Note: This requires browsing the whole collection and therefore can be expensive.
     */
    executeForAll(execute) {
        this.reset();
        return this.executeOnAllElements(execute);
    }
    /**
     * Gets an array of all the elements of the collection.
     * Note: This requires browsing the whole collection and therefore can be expensive.
     * Moreover, all elements are stored in memory and hence, be careful when dealing with big collections.
     */
    all() {
        this.reset();
        return this.browseAndConcatenateAllPages();
    }
}
//# sourceMappingURL=pagination.js.map