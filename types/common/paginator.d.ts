import { Entity } from "./entity";
import { ListOptions } from "./listOptions";
import { Page } from "./page";
/**
 * Paginator
 */
export declare class Paginator<T extends Entity, U extends ListOptions> implements AsyncIterableIterator<T> {
    /**
     * The total number of possible pages, calculated using mazResults and pageSize
     */
    get totalPages(): number;
    /**
     * The index of the current page (0 indexed)
     */
    get currentPageIndex(): number;
    /**
     * The after value of the current page (id of the last item)
     */
    get currentPageAfter(): string;
    /**
     * The current page
     */
    get currentPage(): Page<T>;
    /**
     * An array of cached after values
     */
    get afters(): string[];
    get currentTotalCount(): number;
    /**
     * The list options to pass to all api calls during pagination
     */
    readonly listOptions: U;
    /**
     * The size of each page
     */
    readonly pageSize: number;
    /**
     * The maximum number of results to receive
     */
    readonly maxResults: number;
    /**
     * The function that returns each page
     */
    readonly fetchPageFunction: (options: U) => Promise<Page<T>>;
    private _totalCount;
    private _firstItem;
    private _currentPageIndex;
    private _currentPageAfter;
    private _currentPageHasMore;
    private _currentPage;
    private _afters;
    private _currentItemIndex;
    private _totalPages;
    /**
     * Create a new instance of a Paginator
     * @param fetchPage the function to fetch each page
     * @param options the listOptions that are passed to every fetchPage call
     */
    constructor(fetchPage: (options: U) => Promise<Page<T>>, options?: U);
    /**
     * Reset the Paginator
     * Removes all cahced items and resets all indexes
     */
    reset(): void;
    /**
     * Return true if the next page is available
     */
    hasNextPage(): boolean;
    /**
     * Get the next page
     */
    nextPage(): Promise<Page<T>>;
    [Symbol.asyncIterator](): AsyncIterableIterator<T>;
    /**
     * Get the next item with the iterator.
     */
    next(): Promise<IteratorResult<T>>;
    return(value?: any): Promise<IteratorResult<T>>;
    throw(e?: any): Promise<IteratorResult<T>>;
    /**
     * Get the first item in the list
     */
    first(): Promise<T>;
    /**
     * Get all possible items
     * Note that this should only be used with a small value for maxResults
     */
    all(): Promise<Array<T>>;
    /**
     * Get the number of items to be returned
     */
    totalCount(): Promise<number>;
    /**
     * Get the previous page
     */
    previousPage(): Promise<Page<T>>;
    /**
     * Go to a specific page
     * @param number the page number
     */
    goToPage(number: number): Promise<Page<T>>;
    private getPreviousPageAtIndex;
    private getTotalPages;
    private hasNextItem;
    private fetchNextPage;
    private nextItem;
}
