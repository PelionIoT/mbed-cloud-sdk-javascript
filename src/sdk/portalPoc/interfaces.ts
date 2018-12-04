
export interface ListResponse<A> {
    data: Array<A>;
    totalCount: number;
    hasMore: boolean;
    after?: string;
    order?: Order;
}

export type Order = "ASC" | "DESC";
