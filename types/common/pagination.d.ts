import { ListResponse } from "./listResponse";
export declare const executeForAll: <T extends {
    id: string;
}>(getPage: (options: {
    after?: string;
}) => Promise<ListResponse<T>>, execute: (id: string) => Promise<void>) => Promise<void>;
