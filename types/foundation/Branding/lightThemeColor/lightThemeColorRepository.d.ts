import { Repository } from "../../../common/repository";
import { LightThemeColor } from "./lightThemeColor";
import { LightThemeColorUpdateRequest } from "./types";
import { Paginator } from "../../../common/pagination";
import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *LightThemeColor repository
 */
export declare class LightThemeColorRepository extends Repository {
    /**
     * delete
     * @param reference - Color name.
     */
    delete(reference: string): Promise<void>;
    /**
     * list
     * @param options - options
     */
    list(options?: ListOptions): Paginator<LightThemeColor, ListOptions>;
    /**
     * read
     * @param reference - Color name.
     */
    read(reference: string): Promise<LightThemeColor>;
    /**
     * update
     * @param request - The entity to perform action on.
     * @param reference - Color name.
     */
    update(request: LightThemeColorUpdateRequest, reference: string): Promise<LightThemeColor>;
}
