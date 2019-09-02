import { Repository } from "../../../common/repository";
import { SubtenantPolicyGroup } from "./subtenantPolicyGroup";
import { SubtenantApiKey } from "../../index";
import { SubtenantPolicyGroupListOptions } from "./types";
import { SubtenantUser } from "../../index";
import { SubtenantPolicyGroupSubtenantUserListOptions } from "./types";
import { Paginator } from "../../../index";
import { ListOptions } from "../../../common";
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
     * users
     * @param accountId - Account ID.
     * @param id - The ID of the group to retrieve users for.
     * @param options - Options to use for the List
     */
    users(accountId: string, id: string, options?: SubtenantPolicyGroupSubtenantUserListOptions): Paginator<SubtenantUser, ListOptions>;
}
