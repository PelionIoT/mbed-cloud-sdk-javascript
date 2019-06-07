import { Repository } from "../../../common/repository";
import { SubtenantDarkThemeColor } from "./subtenantDarkThemeColor";
import { SubtenantDarkThemeColorUpdateRequest } from "./types";
/**
 *SubtenantDarkThemeColor repository
 */
export declare class SubtenantDarkThemeColorRepository extends Repository {
    /**
     * delete
     * @param accountId - Account ID.
     * @param reference - Color name.
     */
    delete(accountId: string, reference: string): Promise<void>;
    /**
     * read
     * @param accountId - Account ID.
     * @param reference - Color name.
     */
    read(accountId: string, reference: string): Promise<SubtenantDarkThemeColor>;
    /**
     * update
     * @param request - The entity to perform action on.
     * @param accountId - Account ID.
     * @param reference - Color name.
     */
    update(request: SubtenantDarkThemeColorUpdateRequest, accountId: string, reference: string): Promise<SubtenantDarkThemeColor>;
}
