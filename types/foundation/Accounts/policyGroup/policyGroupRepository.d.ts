import { ListOptions } from "../../../common";
import { Repository } from "../../../common/repository";
import { Paginator } from "../../../index";
import { ApiKey } from "../../index";
import { User } from "../../index";
import { PolicyGroup } from "./policyGroup";
import { PolicyGroupUpdateRequest } from "./types";
import { PolicyGroupUserListOptions } from "./types";
import { PolicyGroupCreateRequest } from "./types";
import { PolicyGroupListOptions } from "./types";
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
     * create
     * @param request - The entity to perform action on.
     */
    create(request: PolicyGroupCreateRequest): Promise<PolicyGroup>;
    /**
     * delete
     * @param id - The ID of the group to delete.
     */
    delete(id: string): Promise<void>;
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
     * update
     * @param request - The entity to perform action on.
     * @param id - The ID of the group.
     */
    update(request: PolicyGroupUpdateRequest, id: string): Promise<PolicyGroup>;
    /**
     * users
     * @param id - The ID of the group.
     * @param options - Options to use for the List
     */
    users(id: string, options?: PolicyGroupUserListOptions): Paginator<User, ListOptions>;
}
