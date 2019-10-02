"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("util");
/**
 * Paginator
 */
var Paginator = /** @class */ (function () {
    /**
     * Create a new instance of a Paginator
     * @param fetchPage the function to fetch each page
     * @param options the listOptions that are passed to every fetchPage call
     */
    function Paginator(fetchPage, options) {
        options = options || {};
        this.listOptions = options;
        this.listOptions.limit = this.listOptions.limit || this.listOptions.pageSize;
        this.maxResults = options.maxResults || options.limit || Number.MAX_SAFE_INTEGER;
        this.pageSize = options.pageSize || 50;
        this._totalPages = this.getTotalPages(this.maxResults, this.pageSize);
        this.fetchPageFunction = fetchPage;
        this.reset();
    }
    Object.defineProperty(Paginator.prototype, "totalPages", {
        /**
         * The total number of possible pages, calculated using mazResults and pageSize
         */
        get: function () {
            return this._totalPages;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paginator.prototype, "currentPageIndex", {
        /**
         * The index of the current page (0 indexed)
         */
        get: function () {
            return this._currentPageIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paginator.prototype, "currentPageAfter", {
        /**
         * The after value of the current page (id of the last item)
         */
        get: function () {
            return this._currentPageAfter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paginator.prototype, "currentPage", {
        /**
         * The current page
         */
        get: function () {
            return this._currentPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paginator.prototype, "afters", {
        /**
         * An array of cached after values
         */
        get: function () {
            return this._afters;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Reset the Paginator
     * Removes all cahced items and resets all indexes
     */
    Paginator.prototype.reset = function () {
        this._currentPageIndex = -1;
        this._currentPage = undefined;
        this._afters = [];
        this.listOptions.after = null;
        this._currentItemIndex = -1;
        this._currentPageHasMore = true;
    };
    /**
     * Return true if the next page is available
     */
    Paginator.prototype.hasNextPage = function () {
        if (this.currentPageIndex === -1) {
            return true;
        }
        return this.currentPageIndex < this.totalPages - 1 && this._currentPageHasMore;
    };
    /**
     * Get the next page
     */
    Paginator.prototype.nextPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.hasNextPage()) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.fetchPageFunction(this.listOptions)];
                    case 2:
                        page = _a.sent();
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
                            return [2 /*return*/, page];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        throw e_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Paginator.prototype[Symbol.asyncIterator] = function () {
        return this;
    };
    /**
     * Get the next item with the iterator.
     */
    Paginator.prototype.next = function () {
        return __awaiter(this, void 0, void 0, function () {
            var nextItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.hasNextItem()) return [3 /*break*/, 2];
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
                    case 2:
                        this.reset();
                        return [2 /*return*/, {
                                value: null,
                                done: true,
                            }];
                }
            });
        });
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
     * Get the first item in the list
     */
    Paginator.prototype.first = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._firstItem) {
                            return [2 /*return*/, this._firstItem];
                        }
                        this.reset();
                        return [4 /*yield*/, this.nextItem()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get all possible items
     * Note that this should only be used with a small value for maxResults
     */
    Paginator.prototype.all = function () {
        var e_2, _a;
        return __awaiter(this, void 0, void 0, function () {
            var allItems, _b, _c, item, e_2_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.reset();
                        allItems = [];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 12]);
                        _b = __asyncValues(this);
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        item = _c.value;
                        allItems.push(item);
                        _d.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_2_1 = _d.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _d.trys.push([7, , 10, 11]);
                        if (!(_c && !_c.done && (_a = _b.return))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _a.call(_b)];
                    case 8:
                        _d.sent();
                        _d.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12: return [2 /*return*/, allItems];
                }
            });
        });
    };
    /**
     * Get the number of items to be returned
     */
    Paginator.prototype.totalCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this._totalCount === null || this._totalCount === undefined)) return [3 /*break*/, 2];
                        this.reset();
                        if (util_1.isArray(this.listOptions.include) && !this.listOptions.include.includes("totalCount")) {
                            this.listOptions.include.push("totalCount");
                        }
                        else {
                            this.listOptions.include = ["totalCount"];
                        }
                        return [4 /*yield*/, this.nextPage()];
                    case 1:
                        _a.sent();
                        this.reset();
                        return [2 /*return*/, this._totalCount];
                    case 2: return [2 /*return*/, this._totalCount];
                }
            });
        });
    };
    /**
     * Get the previous page
     */
    Paginator.prototype.previousPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._currentPageIndex < 1) {
                            return [2 /*return*/];
                        }
                        this._currentPageIndex -= 2;
                        return [4 /*yield*/, this.getPreviousPageAtIndex()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Go to a specific page
     * @param number the page number
     */
    Paginator.prototype.goToPage = function (number) {
        return __awaiter(this, void 0, void 0, function () {
            var diff, diff, targetIndex, after;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (number > this.totalPages) {
                            // page is unreachable
                            return [2 /*return*/];
                        }
                        if (number === this.currentPageIndex + 1) {
                            return [2 /*return*/, this.currentPage];
                        }
                        if (!(number < this._currentPageIndex + 1)) return [3 /*break*/, 2];
                        diff = (this._currentPageIndex + 1) - number;
                        this._currentPageIndex = this._currentPageIndex - diff - 2;
                        return [4 /*yield*/, this.getPreviousPageAtIndex()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        diff = number - (this._currentPageIndex + 1);
                        targetIndex = this._currentPageIndex + diff;
                        after = this._afters[this._currentPageIndex];
                        if (!after) return [3 /*break*/, 4];
                        // we have a cached after, so go straight to the page
                        this._currentPageIndex = targetIndex - 1;
                        this._currentPageHasMore = true;
                        this.listOptions.after = after;
                        return [4 /*yield*/, this.nextPage()];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        if (!(this._currentPageIndex < targetIndex)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.nextPage()];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 6: return [2 /*return*/, this.currentPage];
                }
            });
        });
    };
    Paginator.prototype.getPreviousPageAtIndex = function () {
        return __awaiter(this, void 0, void 0, function () {
            var after;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        after = this._afters[this._currentPageIndex];
                        if (!after) return [3 /*break*/, 2];
                        this._currentPageHasMore = true;
                        this.listOptions.after = after;
                        return [4 /*yield*/, this.nextPage()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        this.reset();
                        return [4 /*yield*/, this.nextPage()];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Paginator.prototype.getTotalPages = function (maxResults, pageSize) {
        return Math.ceil(maxResults / pageSize);
    };
    Paginator.prototype.hasNextItem = function () {
        if (this.hasNextPage()) {
            return true;
        }
        return this._currentItemIndex < this.maxResults - 1;
    };
    Paginator.prototype.fetchNextPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var nextItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nextPage()];
                    case 1:
                        _a.sent();
                        if (this.currentPage) {
                            nextItem = this.currentPage.next();
                            if (nextItem.value) {
                                return [2 /*return*/, nextItem.value];
                            }
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    Paginator.prototype.nextItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            var item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._currentItemIndex++;
                        if (!this.currentPage) return [3 /*break*/, 3];
                        item = this.currentPage.next();
                        if (!(item.done && this.hasNextPage())) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fetchNextPage()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        if (item.value) {
                            return [2 /*return*/, item.value];
                        }
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.fetchNextPage()];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return Paginator;
}());
exports.Paginator = Paginator;
//# sourceMappingURL=paginator.js.map