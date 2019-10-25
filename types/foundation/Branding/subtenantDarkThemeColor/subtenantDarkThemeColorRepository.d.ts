import { Repository } from "../../../common/repository";
import { SubtenantDarkThemeColor } from "./subtenantDarkThemeColor";
import { SubtenantDarkThemeColorUpdateRequest } from "./types";
/**
 *SubtenantDarkThemeColor repository
 */
export declare class SubtenantDarkThemeColorRepository extends Repository {
    /**
     * delete
     * @param accountId - The ID of the account.
     * @param reference - The name of the branding color.
     */
    delete(accountId: string, reference: string): Promise<void>;
    /**
     * read
     * @param accountId - The ID of the account.
     * @param reference - Color name.
     */
    read(accountId: string, reference: string): Promise<SubtenantDarkThemeColor>;
    /**
     * update
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account.
     * @param reference - Color name.
     */
    update(request: SubtenantDarkThemeColorUpdateRequest, accountId: string, reference: string): Promise<SubtenantDarkThemeColor>;
}
