import { OrderEnum } from "./interfaces";
/**
 * List Response
 */
export declare class ListResponse<T> {
    /**
     * Whether there are more results to display
     */
    readonly hasMore?: boolean;
    /**
     * Total number of records
     */
    readonly totalCount?: number;
    /**
     * Entity id for fetch after it
     */
    readonly after?: string;
    /**
     * The number of results to return
     */
    readonly limit?: number;
    /**
     * Order of returned records
     */
    readonly order?: OrderEnum;
    /**
     * Devices
     */
    readonly data: Array<T>;
    constructor(from: any, data?: Array<T>);
}
