"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Page = /** @class */ (function () {
    function Page(from, data, apiMapper, listOptions) {
        this.currentIndex = 0;
        this.listOptions = listOptions || {};
        this.hasMore = from.has_more || from.hasMore;
        this.continuationMarker = from.continuation_marker || from.continuationMarker;
        this.pageSize = ("limit" in from) ? from.limit : ("pageSize" in from) ? from.pageSize : undefined;
        this.order = from.order;
        // default to 0 if either is undefined
        this.totalCount = from.total_count || from.totalCount || 0;
        this._data = new Array();
        if (data && data.length) {
            this._data = data;
            if (apiMapper) {
                this._data = this.mapData(apiMapper);
            }
            if (this.listOptions.mapResults) {
                this._data = this.mapData(this.listOptions.mapResults);
            }
        }
        // change this stupid line
        this.after = this.continuationMarker || (this.hasMore ? (((this.last() || {}).id) || null) : null) || null;
    }
    Object.defineProperty(Page.prototype, "data", {
        /**
         * The data in the page
         */
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Page.prototype.first = function () {
        if (this.data && this.data[0]) {
            return this.data[0];
        }
    };
    Page.prototype.last = function () {
        if (this.data && this.data[this.data.length - 1]) {
            return this.data[this.data.length - 1];
        }
    };
    Page.prototype.mapData = function (mapFunc) {
        return this.data.map(mapFunc);
    };
    Page.prototype[Symbol.iterator] = function () {
        return this;
    };
    Page.prototype.next = function () {
        if (this.currentIndex < this.data.length) {
            return {
                done: false,
                value: this.data[this.currentIndex++],
            };
        }
        else {
            this.currentIndex = 0;
            return {
                done: true,
                value: null,
            };
        }
    };
    Page.prototype.return = function (value) {
        return {
            done: true,
            value: value,
        };
    };
    Page.prototype.throw = function (e) {
        throw e;
    };
    return Page;
}());
exports.Page = Page;
//# sourceMappingURL=page.js.map