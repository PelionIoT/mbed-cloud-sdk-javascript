import { Order } from "../legacy/common/interfaces";
import { ListOptions } from "./listOptions";
export declare class Page<T> implements IterableIterator<T> {
    /**
     * The data in the page
     */
    get data(): Array<T>;
    /**
     * Whether there are more results to display
     */
    readonly hasMore?: boolean;
    /**
     * Total number of records (Approximate number of results according to the API)
     */
    readonly totalCount?: number;
    /**
     * Entity id for fetch after it
     */
    readonly after?: string;
    /**
     * The page size
     */
    readonly pageSize?: number;
    /**
     * Order of returned records
     */
    readonly order?: Order;
    /**
     *  Entity id for fetch after it
     */
    readonly continuationMarker?: string;
    private currentIndex;
    private listOptions;
    private _data;
    constructor(from: any, data?: Array<T>, apiMapper?: (key: T, index?: number) => T, listOptions?: ListOptions);
    first(): T;
    last(): T;
    mapData<U>(mapFunc: (key: any, index?: number) => U): Array<U>;
    [Symbol.iterator](): IterableIterator<T>;
    next(): IteratorResult<T>;
    return?(value?: T): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}
