import { Order } from "./interfaces";
/**
 * ## List Response
 * Most listing operations are paginated and respond with truncated results. This object comprises the information related to one page.
 * For operations over a full collection, it is recommended to use the [Paginator](./paginator.html) instead.
 */
export declare class ListResponse<T> {
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
     * List of results.
     */
    readonly data: Array<T>;
    /**
     *  Entity id for fetch after it
     */
    readonly continuationMarker?: string;
    constructor(from: any, data?: Array<T>, mapper?: (key: any) => T);
}
