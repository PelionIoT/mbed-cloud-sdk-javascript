export interface ConnectionOptions {
    /**
    * Access Key for your mbed Cloud account
    */
    accessKey: string;
    /**
    * URL for mbed Cloud API
    */
    host?: string;
}
export interface ListOptions {
    limit?: number;
    order?: string;
    after?: string;
    include?: string;
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
    order?: string;
    /**
    * Devices
    */
    data?: T[];
}
