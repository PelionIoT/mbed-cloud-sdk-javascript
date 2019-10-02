import { Repository } from "../../../common/repository";
import { PolicyGroup } from "./policyGroup";
import { ApiKey } from "../../index";
import { PolicyGroupListOptions } from "./types";
import { User } from "../../index";
import { PolicyGroupUserListOptions } from "./types";
import { Paginator } from "../../../index";
import { ListOptions } from "../../../common";
/**
 *PolicyGroup repository
 */
export declare class PolicyGroupRepository extends Repository {
    /**
     * apiKeys
     * @param id - The ID of the group.
     * @param options - options
     */
    apiKeys(id: string, options?: ListOptions): Paginator<ApiKey, ListOptions>;
    /**
     * list
     * @param options - Options to use for the List
     */
    list(options?: PolicyGroupListOptions): Paginator<PolicyGroup, ListOptions>;
    /**
     * read
     * @param id - The ID of the group.
     */
    read(id: string): Promise<PolicyGroup>;
    /**
     * users
     * @param id - The ID of the group.
     * @param options - Options to use for the List
     */
    users(id: string, options?: PolicyGroupUserListOptions): Paginator<User, ListOptions>;
}
