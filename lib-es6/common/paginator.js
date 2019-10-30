var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import { isArray } from "util";
/**
 * Paginator
 */
export class Paginator {
    /**
     * Create a new instance of a Paginator
     * @param fetchPage the function to fetch each page
     * @param options the listOptions that are passed to every fetchPage call
     */
    constructor(fetchPage, options) {
        options = options || {};
        this.listOptions = options;
        this.listOptions.limit = this.listOptions.limit || this.listOptions.pageSize;
        this.maxResults = options.maxResults || options.limit || 50;
        this.pageSize = options.pageSize || 50;
        this._totalPages = this.getTotalPages(this.maxResults, this.pageSize);
        this.fetchPageFunction = fetchPage;
        this.reset();
    }
    /**
     * The total number of possible pages, calculated using mazResults and pageSize
     */
    get totalPages() {
        return this._totalPages;
    }
    /**
     * The index of the current page (0 indexed)
     */
    get currentPageIndex() {
        return this._currentPageIndex;
    }
    /**
     * The after value of the current page (id of the last item)
     */
    get currentPageAfter() {
        return this._currentPageAfter;
    }
    /**
     * The current page
     */
    get currentPage() {
        return this._currentPage;
    }
    /**
     * An array of cached after values
     */
    get afters() {
        return this._afters;
    }
    get currentTotalCount() {
        return this._currentPage ? this._currentPage.totalCount : 0;
    }
    /**
     * Reset the Paginator
     * Removes all cahced items and resets all indexes
     */
    reset() {
        this._currentPageIndex = -1;
        this._currentPage = null;
        this._afters = [];
        this.listOptions.after = null;
        this._currentItemIndex = -1;
        this._currentPageHasMore = true;
    }
    /**
     * Return true if the next page is available
     */
    hasNextPage() {
        if (this.currentPageIndex === -1) {
            return true;
        }
        return this.currentPageIndex < this.totalPages - 1 && this._currentPageHasMore;
    }
    /**
     * Get the next page
     */
    nextPage() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.hasNextPage()) {
                try {
                    const page = yield this.fetchPageFunction(this.listOptions);
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
                }
                catch (e) {
                    throw e;
                }
            }
        });
    }
    [Symbol.asyncIterator]() {
        return this;
    }
    /**
     * Get the next item with the iterator.
     */
    next() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.hasNextItem()) {
                const nextItem = yield this.nextItem();
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
        });
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
     * Get the first item in the list
     */
    first() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._firstItem) {
                return this._firstItem;
            }
            this.reset();
            return yield this.nextItem();
        });
    }
    /**
     * Get all possible items
     * Note that this should only be used with a small value for maxResults
     */
    all() {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.reset();
            const allItems = [];
            try {
                for (var _b = __asyncValues(this), _c; _c = yield _b.next(), !_c.done;) {
                    const item = _c.value;
                    allItems.push(item);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return allItems;
        });
    }
    /**
     * Get the number of items to be returned
     */
    totalCount() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._totalCount === null || this._totalCount === undefined) {
                this.reset();
                if (isArray(this.listOptions.include) && !this.listOptions.include.includes("totalCount")) {
                    this.listOptions.include.push("totalCount");
                }
                else {
                    this.listOptions.include = ["totalCount"];
                }
                yield this.nextPage();
                this.reset();
                return this._totalCount;
            }
            return this._totalCount;
        });
    }
    /**
     * Get the previous page
     */
    previousPage() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._currentPageIndex < 1) {
                return;
            }
            this._currentPageIndex -= 2;
            return yield this.getPreviousPageAtIndex();
        });
    }
    /**
     * Go to a specific page
     * @param number the page number
     */
    goToPage(number) {
        return __awaiter(this, void 0, void 0, function* () {
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
                return yield this.getPreviousPageAtIndex();
            }
            else {
                // go forwards
                const diff = number - (this._currentPageIndex + 1);
                const targetIndex = this._currentPageIndex + diff;
                const after = this._afters[this._currentPageIndex];
                if (after) {
                    // we have a cached after, so go straight to the page
                    this._currentPageIndex = targetIndex - 1;
                    this._currentPageHasMore = true;
                    this.listOptions.after = after;
                    return yield this.nextPage();
                }
                else {
                    // we haven't been to this page before, so we iterate towards it
                    while (this._currentPageIndex < targetIndex) {
                        yield this.nextPage();
                    }
                    return this.currentPage;
                }
            }
        });
    }
    getPreviousPageAtIndex() {
        return __awaiter(this, void 0, void 0, function* () {
            const after = this._afters[this._currentPageIndex];
            if (after) {
                this._currentPageHasMore = true;
                this.listOptions.after = after;
                return yield this.nextPage();
            }
            else {
                this.reset();
                return yield this.nextPage();
            }
        });
    }
    getTotalPages(maxResults, pageSize) {
        return Math.ceil(maxResults / pageSize);
    }
    hasNextItem() {
        if (this.hasNextPage()) {
            return true;
        }
        return this._currentItemIndex < this.maxResults - 1;
    }
    fetchNextPage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.nextPage();
            if (this.currentPage) {
                const nextItem = this.currentPage.next();
                if (nextItem.value) {
                    return nextItem.value;
                }
            }
            return null;
        });
    }
    nextItem() {
        return __awaiter(this, void 0, void 0, function* () {
            this._currentItemIndex++;
            if (this.currentPage) {
                const item = this.currentPage.next();
                if (item.done && this.hasNextPage()) {
                    return yield this.fetchNextPage();
                }
                if (item.value) {
                    return item.value;
                }
            }
            else {
                return yield this.fetchNextPage();
            }
        });
    }
}
//# sourceMappingURL=paginator.js.map