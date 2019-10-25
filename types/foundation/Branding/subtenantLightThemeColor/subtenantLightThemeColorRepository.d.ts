import { Repository } from "../../../common/repository";
import { SubtenantLightThemeColor } from "./subtenantLightThemeColor";
import { SubtenantLightThemeColorUpdateRequest } from "./types";
/**
 *SubtenantLightThemeColor repository
 */
export declare class SubtenantLightThemeColorRepository extends Repository {
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
    read(accountId: string, reference: string): Promise<SubtenantLightThemeColor>;
    /**
     * update
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account.
     * @param reference - Color name.
     */
    update(request: SubtenantLightThemeColorUpdateRequest, accountId: string, reference: string): Promise<SubtenantLightThemeColor>;
}
