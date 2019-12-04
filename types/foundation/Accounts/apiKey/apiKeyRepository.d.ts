import { ListOptions } from "../../../common";
import { Repository } from "../../../common/repository";
import { Paginator } from "../../../index";
import { PolicyGroup } from "../../index";
import { ApiKey } from "./apiKey";
import { ApiKeyCreateRequest } from "./types";
import { ApiKeyUpdateRequest } from "./types";
import { ApiKeyListOptions } from "./types";
/**
 *ApiKey repository
 */
export declare class ApiKeyRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     */
    create(request: ApiKeyCreateRequest): Promise<ApiKey>;
    /**
     * delete
     * @param id - The ID of the API key to delete.
     */
    delete(id: string): Promise<void>;
    /**
     * list
     * @param options - Options to use for the List
     */
    list(options?: ApiKeyListOptions): Paginator<ApiKey, ListOptions>;
    /**
     * me
     */
    me(): Promise<ApiKey>;
    /**
     * policyGroups
     * @param id - The ID of the API key.
     * @param options - options
     */
    policyGroups(id: string, options?: ListOptions): Paginator<PolicyGroup, ListOptions>;
    /**
     * read
     * @param id - The ID of the API key.
     */
    read(id: string): Promise<ApiKey>;
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - The ID of the API key.
     */
    update(request: ApiKeyUpdateRequest, id: string): Promise<ApiKey>;
}
