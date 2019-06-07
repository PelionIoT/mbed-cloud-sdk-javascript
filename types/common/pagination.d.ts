import { ListResponse } from "../legacy/common/listResponse";
import { ListOptions } from "../legacy/common/interfaces";
/**
 * Run `execute` for all items returned from getPage, one page at a time. If any call to getPage or execute fails, the resulting promise is rejected.
 * @typeparam T  object that contains an Id property
 * @param getPage The function for receiving a page
 * @param execute The function to execute on each item
 */
export declare const executeForAll: <T extends {
    id: string;
}>(getPage: (options: {
    after?: string;
}) => Promise<ListResponse<T>>, execute: (id: string) => Promise<void>) => Promise<void>;
/**
 * Paginator
 * Iterator-like object over an entire result set of a truncated/paginated API operation (for instance,  listConnectedDevices).
 * @typeparam T Entity to paginate over
 * @typeparam U ListOptions class for paginator to use
 */
export declare class Paginator<T, U extends ListOptions> implements AsyncIterableIterator<T> {
    private pageRequester;
    private listOptions;
    private currentPageIndex;
    private currentPageData;
    private isFirstRequest;
    private currentElementIndex;
    private collectionTotalCount;
    maxResults?: number;
    /**
     * Constructor
     * @param getPage Method returning a page of results ([ListResponse](./listresponse.html))
     * @param maxResults The maximum number of results to return
     * @param options List options
     */
    constructor(getPage: (options: U) => Promise<ListResponse<T>>, options?: U);
    /**
     * Resets the state of the iterator.
     */
    private reset;
    private setCurrentPage;
    private fetchNextPageCursor;
    private fetchIdOfLastElement;
    private hasNewPage;
    private nextPage;
    [Symbol.asyncIterator](): AsyncIterableIterator<T>;
    return?(value?: any): Promise<IteratorResult<T>>;
    throw?(e?: any): Promise<IteratorResult<T>>;
    /**
     * Gets collection total count (Approximate number of results according to the API).
     */
    totalCount(): Promise<number>;
    /**
     * Gets page size.
     */
    pageSize(): number;
    /**
     * Checks whether there is a next element in the collection.
     */
    hasNext(): boolean;
    private remainingElementsNumber;
    private fetchElementInPage;
    /**
     * Returns the first item from the query, or null if there are no results.
     */
    first(): Promise<T>;
    /**
     *  Gets next element in the sequence.
     */
    private nextItem;
    next(): Promise<IteratorResult<T>>;
    private browseAndConcatenateAllPages;
    private executeOnAllElements;
    /**
     * Executes a function on all the elements of the collection.
     * @param execute method to execute on the elements
     * Note: This requires browsing the whole collection and therefore can be expensive.
     */
    executeForAll(execute: (element: T) => void): Promise<void>;
    /**
     * Gets an array of all the elements of the collection.
     * Note: This requires browsing the whole collection and therefore can be expensive.
     * Moreover, all elements are stored in memory and hence, be careful when dealing with big collections.
     */
    all(): Promise<Array<T>>;
}
