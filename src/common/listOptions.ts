/**
 * Options to use when listing objects
 */
export interface ListOptions {
    /**
     * How many objects to retrieve in the page (Page size)
     */
    limit?: number;

    /**
     * ASC or DESC
     */
    order?: Order;

    /**
     * The ID of the item after which to retrieve the next page
     */
    after?: string;

    /**
     * Optional fields to include
     */
    include?: string | Array<string>;

    /**
     * Number of results to retrieve
     */
    maxResults?: number;

    /**
     * The number of results to return in a page
     */
    pageSize?: number;

    /**
     * mapper function to apply to all results of the pagination
     */
    mapResults?(item: any, index?: number): any;
}

/**
 * Ordering options
 */
export type Order = "ASC" | "DESC";
