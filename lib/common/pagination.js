"use strict";
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var listResponse_1 = require("../legacy/common/listResponse");
/**
 * Run `execute` for all items returned from getPage, one page at a time. If any call to getPage or execute fails, the resulting promise is rejected.
 * @typeparam T  object that contains an Id property
 * @param getPage The function for receiving a page
 * @param execute The function to execute on each item
 */
exports.executeForAll = function (getPage, execute) {
    var recur = function (after) {
        return getPage({ after: after })
            .then(function (_a) {
            var data = _a.data, hasMore = _a.hasMore;
            var executePromises = data.map(function (_a) {
                var id = _a.id;
                return execute(id);
            });
            // Execute for all items in current page, then recur
            return Promise.all(executePromises)
                .then(function () {
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
var Paginator = /** @class */ (function () {
    /**
     * Constructor
     * @param getPage Method returning a page of results ([ListResponse](./listresponse.html))
     * @param maxResults The maximum number of results to return
     * @param options List options
     */
    function Paginator(getPage, options) {
        this.maxResults = options ? options.maxResults || options.limit || 50 : 50;
        this.listOptions = Object.create(options || null);
        var pageSizeParameterName = "pageSize";
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
    Paginator.prototype.reset = function () {
        this.currentPageIndex = -1;
        this.currentElementIndex = -1;
        this.isFirstRequest = true;
        this.currentPageData = null;
    };
    Paginator.prototype.setCurrentPage = function (page) {
        this.currentPageData = page;
        this.currentPageIndex++;
    };
    Paginator.prototype.fetchNextPageCursor = function (page) {
        if (page && page.data.length !== 0) {
            return page.continuationMarker ? page.continuationMarker : this.fetchIdOfLastElement(page);
        }
        return null;
    };
    Paginator.prototype.fetchIdOfLastElement = function (page) {
        var lastElement = page.data.slice(-1).pop();
        var idParameterName = "id";
        return "" + (lastElement[idParameterName] || lastElement);
    };
    Paginator.prototype.hasNewPage = function () {
        if (this.maxResults && this.pageSize() * (this.currentPageIndex + 1) > this.maxResults) {
            return false;
        }
        var nextPage = this.currentPageData ? this.currentPageData.hasMore : this.isFirstRequest;
        return nextPage;
    };
    Paginator.prototype.nextPage = function () {
        var _this = this;
        if (this.hasNewPage()) {
            this.currentElementIndex = -1;
            var after = this.currentPageIndex < 0 ? null : this.fetchNextPageCursor(this.currentPageData);
            var newPageOptions = Object.create(this.listOptions || null);
            newPageOptions.after = after;
            return this.pageRequester(newPageOptions)
                .then(function (page) {
                _this.setCurrentPage(page);
                _this.isFirstRequest = false;
                return page;
            })
                .then(function (page) {
                if (page && page.data.length !== 0) {
                    return new listResponse_1.ListResponse(page, page.data.slice(0, _this.remainingElementsNumber()));
                }
                else {
                    return null;
                }
            })
                .catch(function (e) {
                throw e;
            });
        }
        else {
            return Promise.resolve(null);
        }
    };
    Paginator.prototype[Symbol.asyncIterator] = function () {
        this.reset();
        return this;
    };
    Paginator.prototype.return = function (value) {
        return Promise.resolve({
            value: value,
            done: true
        });
    };
    Paginator.prototype.throw = function (e) {
        throw e;
    };
    /**
     * Gets collection total count (Approximate number of results according to the API).
     */
    Paginator.prototype.totalCount = function () {
        var _this = this;
        if (this.collectionTotalCount) {
            return Promise.resolve(this.collectionTotalCount);
        }
        if (this.currentPageData && this.currentPageData.totalCount) {
            this.collectionTotalCount = this.currentPageData.totalCount;
            return Promise.resolve(this.collectionTotalCount);
        }
        else {
            var newPageOptions = Object.create(this.listOptions || null);
            if (newPageOptions.include && newPageOptions.include instanceof Array) {
                newPageOptions.include.push("totalCount");
            }
            else {
                newPageOptions.include = ["totalCount"];
            }
            return this.pageRequester(newPageOptions)
                .then(function (page) {
                _this.collectionTotalCount = page ? page.totalCount : undefined;
                return _this.collectionTotalCount;
            })
                .catch(function (e) {
                throw e;
            });
        }
    };
    /**
     * Gets page size.
     */
    Paginator.prototype.pageSize = function () {
        return this.currentPageData ? this.currentPageData.data.length : this.listOptions.limit;
    };
    /**
     * Checks whether there is a next element in the collection.
     */
    Paginator.prototype.hasNext = function () {
        if (this.hasNewPage()) {
            return true;
        }
        var remainder = this.remainingElementsNumber();
        return this.currentElementIndex < remainder - 1;
    };
    Paginator.prototype.remainingElementsNumber = function () {
        var remainingResults = this.maxResults ? this.maxResults - this.pageSize() * this.currentPageIndex : this.pageSize();
        return remainingResults ? remainingResults < 0 ? 0 : remainingResults : null;
    };
    Paginator.prototype.fetchElementInPage = function (page, index, remainder, setIndex) {
        if (!page) {
            return null;
        }
        var elementIndex = index > remainder ? remainder : index;
        if (setIndex) {
            this.currentElementIndex = elementIndex;
        }
        return elementIndex < 0 || elementIndex >= page.data.length ? null : page.data[elementIndex];
    };
    /**
     * Returns the first item from the query, or null if there are no results.
     */
    Paginator.prototype.first = function () {
        this.reset();
        return this.nextItem();
    };
    /**
     *  Gets next element in the sequence.
     */
    Paginator.prototype.nextItem = function () {
        var _this = this;
        this.currentElementIndex++;
        if (this.currentPageData) {
            var nextElement = this.fetchElementInPage(this.currentPageData, this.currentElementIndex, this.remainingElementsNumber(), false);
            return nextElement ? Promise.resolve(nextElement) : this.nextPage().then(function (page) { return page ? _this.nextItem() : null; });
        }
        else {
            return this.nextPage().then(function (page) { return page ? _this.nextItem() : null; });
        }
    };
    Paginator.prototype.next = function () {
        return __awaiter(this, void 0, void 0, function () {
            var nextItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.hasNext()) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.nextItem()];
                    case 1:
                        nextItem = _a.sent();
                        if (nextItem) {
                            return [2 /*return*/, {
                                    value: nextItem,
                                    done: false,
                                }];
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/, {
                            value: null,
                            done: true,
                        }];
                }
            });
        });
    };
    Paginator.prototype.browseAndConcatenateAllPages = function () {
        var _this = this;
        if (this.hasNewPage()) {
            return this.nextPage()
                .then(function (page) { return _this.browseAndConcatenateAllPages()
                .then(function (data) {
                if (page && page.data) {
                    return page.data.length === 0 ? data : page.data.concat(data);
                }
                return [];
            }); });
        }
        return Promise.resolve([]);
    };
    Paginator.prototype.executeOnAllElements = function (execute) {
        var _this = this;
        if (this.hasNext()) {
            return this.nextItem().then(function (element) { return execute(element); }).then(function () { return _this.executeOnAllElements(execute); });
        }
        return Promise.resolve();
    };
    /**
     * Executes a function on all the elements of the collection.
     * @param execute method to execute on the elements
     * Note: This requires browsing the whole collection and therefore can be expensive.
     */
    Paginator.prototype.executeForAll = function (execute) {
        this.reset();
        return this.executeOnAllElements(execute);
    };
    /**
     * Gets an array of all the elements of the collection.
     * Note: This requires browsing the whole collection and therefore can be expensive.
     * Moreover, all elements are stored in memory and hence, be careful when dealing with big collections.
     */
    Paginator.prototype.all = function () {
        this.reset();
        return this.browseAndConcatenateAllPages();
    };
    return Paginator;
}());
exports.Paginator = Paginator;
//# sourceMappingURL=pagination.js.map