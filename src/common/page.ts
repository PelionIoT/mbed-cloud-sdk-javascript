import { Order } from "../legacy/common/interfaces";
import { ListOptions } from "./listOptions";

export class Page<T> implements IterableIterator<T> {
    private currentIndex: number = 0;

    private listOptions: ListOptions;

    private _data: Array<T>;

    /**
     * Whether there are more results to display
     */
    public readonly hasMore?: boolean;

    /**
     * Total number of records (Approximate number of results according to the API)
     */
    public readonly totalCount?: number;

    /**
     * Entity id for fetch after it
     */
    public readonly after?: string;

    /**
     * The page size
     */
    public readonly pageSize?: number;

    /**
     * Order of returned records
     */
    public readonly order?: Order;

    /**
     *  Entity id for fetch after it
     */
    public readonly continuationMarker?: string;

    /**
     * The data in the page
     */
    public get data(): Array<T> {
        return this._data;
    }

    constructor(from: any, data?: Array<T>, apiMapper?: (key: T, index?: number) => T, listOptions?: ListOptions) {
        this.listOptions = listOptions || {};
        this.after = from.after;
        this.hasMore = from.has_more || from.hasMore;
        this.pageSize = ("limit" in from) ? from.limit : ("pageSize" in from) ? from.pageSize : undefined;
        this.order = from.order;
        // default to 0 if either is undefined
        this.totalCount = from.total_count || from.totalCount || 0;
        this.continuationMarker = from.continuation_marker || from.continuationMarker;
        this._data = new Array<T>();

        if (data && data.length) {
            this._data = data;

            if (apiMapper) {
                this._data = this.mapData(apiMapper);
            }

            if (this.listOptions.mapResults) {
                this._data = this.mapData(this.listOptions.mapResults);
            }
        }
    }

    public first(): T {
        if (this.data && this.data[0]) {
            return this.data[0];
        }
    }

    public last(): T {
        if (this.data && this.data[this.data.length - 1]) {
            return this.data[this.data.length - 1];
        }
    }

    public mapData(mapFunc: (key: T, index?: number) => T): Array<T> {
        return this.data.map(mapFunc);
    }

    public [Symbol.iterator](): IterableIterator<T> {
        return this;
    }
    public next(): IteratorResult<T> {
        if (this.currentIndex < this.data.length) {
            return {
                done: false,
                value: this.data[this.currentIndex++],
            };
        } else {
            this.currentIndex = 0;
            return {
                done: true,
                value: null,
            };
        }
    }
    public return?(value?: T): IteratorResult<T> {
        return {
            done: true,
            value,
        };
    }
    public throw?(e?: any): IteratorResult<T> {
        throw e;
    }
}
