import { Repository } from "../../../common/repository";
import { DarkThemeColor } from "./darkThemeColor";
import { DarkThemeColorUpdateRequest } from "./types";
import { Paginator } from "../../../common/pagination";
import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *DarkThemeColor repository
 */
export declare class DarkThemeColorRepository extends Repository {
    /**
     * delete
     * @param reference - Color name.
     */
    delete(reference: string): Promise<void>;
    /**
     * list
     * @param options - options
     */
    list(options?: ListOptions): Paginator<DarkThemeColor, ListOptions>;
    /**
     * read
     * @param reference - Color name.
     */
    read(reference: string): Promise<DarkThemeColor>;
    /**
     * update
     * @param request - The entity to perform action on.
     * @param reference - Color name.
     */
    update(request: DarkThemeColorUpdateRequest, reference: string): Promise<DarkThemeColor>;
}
