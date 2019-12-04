import { ListOptions } from "../../../common";
import { Repository } from "../../../common/repository";
import { Paginator } from "../../../index";
import { LightThemeColor } from "./lightThemeColor";
import { LightThemeColorUpdateRequest } from "./types";
/**
 *LightThemeColor repository
 */
export declare class LightThemeColorRepository extends Repository {
    /**
     * delete
     * @param reference - The name of the branding color.
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
