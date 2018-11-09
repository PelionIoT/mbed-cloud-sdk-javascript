import { Paginator } from "../../common/pagination";
import { ListOptions } from "../../common/interfaces";

export interface CrudEntity<T> {
    id: string;
    get(): Promise<T>;
    list(): Paginator<T, ListOptions>;
    [property: string]: any;
}
