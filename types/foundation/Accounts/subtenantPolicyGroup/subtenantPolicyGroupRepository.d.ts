import { ListOptions } from "../../../common";
import { Repository } from "../../../common/repository";
import { Paginator } from "../../../index";
import { SubtenantApiKey } from "../../index";
import { SubtenantUser } from "../../index";
import { SubtenantPolicyGroup } from "./subtenantPolicyGroup";
import { SubtenantPolicyGroupUpdateRequest } from "./types";
import { SubtenantPolicyGroupSubtenantUserListOptions } from "./types";
import { SubtenantPolicyGroupCreateRequest } from "./types";
import { SubtenantPolicyGroupListOptions } from "./types";
/**
 *SubtenantPolicyGroup repository
 */
export declare class SubtenantPolicyGroupRepository extends Repository {
    /**
     * apiKeys
     * @param accountId - Account ID.
     * @param id - The ID of the group to retrieve API keys for.
     * @param options - options
     */
    apiKeys(accountId: string, id: string, options?: ListOptions): Paginator<SubtenantApiKey, ListOptions>;
    /**
     * create
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account this group belongs to.
     */
    create(request: SubtenantPolicyGroupCreateRequest, accountId: string): Promise<SubtenantPolicyGroup>;
    /**
     * delete
     * @param accountId - Account ID.
     * @param id - The ID of the group to delete.
     */
    delete(accountId: string, id: string): Promise<void>;
    /**
     * list
     * @param accountId - Account ID.
     * @param options - Options to use for the List
     */
    list(accountId: string, options?: SubtenantPolicyGroupListOptions): Paginator<SubtenantPolicyGroup, ListOptions>;
    /**
     * read
     * @param accountId - The ID of the account this group belongs to.
     * @param id - The ID of the group.
     */
    read(accountId: string, id: string): Promise<SubtenantPolicyGroup>;
    /**
     * update
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account this group belongs to.
     * @param id - The ID of the group.
     */
    update(request: SubtenantPolicyGroupUpdateRequest, accountId: string, id: string): Promise<SubtenantPolicyGroup>;
    /**
     * users
     * @param accountId - Account ID.
     * @param id - The ID of the group to retrieve users for.
     * @param options - Options to use for the List
     */
    users(accountId: string, id: string, options?: SubtenantPolicyGroupSubtenantUserListOptions): Paginator<SubtenantUser, ListOptions>;
}
