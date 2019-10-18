import { Repository } from "../../../common/repository";
import { SubtenantUser } from "./subtenantUser";
import { SubtenantUserCreateRequest } from "./types";
import { SubtenantPolicyGroup } from "../../index";
import { SubtenantUserUpdateRequest } from "./types";
import { Paginator } from "../../../index";
import { ListOptions } from "../../../common";
/**
 *SubtenantUser repository
 */
export declare class SubtenantUserRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account.
     * @param action - Create or invite user.
     */
    create(request: SubtenantUserCreateRequest, accountId: string, action?: string): Promise<SubtenantUser>;
    /**
     * delete
     * @param accountId - Account ID.
     * @param id - The ID of the user to delete.
     */
    delete(accountId: string, id: string): Promise<void>;
    /**
     * policyGroups
     * @param accountId - Account ID.
     * @param id - The ID of the user.
     * @param options - options
     */
    policyGroups(accountId: string, id: string, options?: ListOptions): Paginator<SubtenantPolicyGroup, ListOptions>;
    /**
     * read
     * @param accountId - The ID of the account.
     * @param id - The ID of the user.
     */
    read(accountId: string, id: string): Promise<SubtenantUser>;
    /**
     * update
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account.
     * @param id - The ID of the user.
     */
    update(request: SubtenantUserUpdateRequest, accountId: string, id: string): Promise<SubtenantUser>;
    /**
     * validateEmail
     * @param accountId - Account ID.
     * @param id - The ID of the user.
     */
    validateEmail(accountId: string, id: string): Promise<SubtenantUser>;
}
