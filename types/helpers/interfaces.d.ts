export interface ConnectionOptions {
    /**
    * API Key for your mbed Cloud account
    */
    apiKey: string;
    /**
    * URL for mbed Cloud API
    */
    host?: string;
}
/**
 * Possible optional fields to request when listing
 */
export declare type IncludeEnum = "totalCount";
export declare type OrderEnum = "ASC" | "DESC";
export interface ListOptions {
    limit?: number;
    order?: OrderEnum;
    after?: string;
    include?: IncludeEnum[];
    filter?: string;
}
export interface ListResponse<T> {
    /**
    * Whether there are more results to display
    */
    hasMore?: boolean;
    /**
    * Total number of records
    */
    totalCount?: number;
    /**
    * Entity id for fetch after it
    */
    after?: string;
    /**
    * The number of results to return
    */
    limit?: number;
    /**
    * Order of returned records
    */
    order?: OrderEnum;
    /**
    * Devices
    */
    data?: T[];
}
