import { ListResponse } from "./listResponse";
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
