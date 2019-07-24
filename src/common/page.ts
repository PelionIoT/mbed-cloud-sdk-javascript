import { Order } from "../legacy/common/interfaces";

export class Page<T> implements IterableIterator<T> {
    private currentIndex: number = 0;

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

    public get data(): Array<T> {
        return this._data;
    }

    constructor(from: any, data?: Array<T>, mapper?: (key: T, index?: number) => T) {
        this.after = from.after;
        this.hasMore = from.has_more || from.hasMore;
        this.pageSize = ("limit" in from) ? from.limit : ("pageSize" in from) ? from.pageSize : undefined;
        this.order = from.order;
        // default to 0 if either is undefined
        this.totalCount = from.total_count || from.totalCount || 0;
        this.continuationMarker = from.continuation_marker || from.continuationMarker;

        if (mapper && data && data.length) {
            // mapping function has been provided so map the data
            this._data = data.map((key, index) => mapper(key, index)) || [];
        } else {
            // data has already been mapped so just assign it
            this._data = data || [];
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

    public mapData(mapFunc: (key: T, index: number) => T): Array<T> {
        this._data = this._data.map(mapFunc);
        return this.data;
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
