import { Repository } from "../../../common/repository";
import { SubtenantApiKey } from "./subtenantApiKey";
import { SubtenantApiKeyCreateRequest } from "./types";
import { SubtenantApiKeyUpdateRequest } from "./types";
/**
 *SubtenantApiKey repository
 */
export declare class SubtenantApiKeyRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account.
     */
    create(request: SubtenantApiKeyCreateRequest, accountId: string): Promise<SubtenantApiKey>;
    /**
     * delete
     * @param accountId - Account ID.
     * @param id - The ID of the API key to delete.
     */
    delete(accountId: string, id: string): Promise<void>;
    /**
     * read
     * @param accountId - The ID of the account.
     * @param id - The ID of the API key.
     */
    read(accountId: string, id: string): Promise<SubtenantApiKey>;
    /**
     * update
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account.
     * @param id - The ID of the API key.
     */
    update(request: SubtenantApiKeyUpdateRequest, accountId: string, id: string): Promise<SubtenantApiKey>;
}
