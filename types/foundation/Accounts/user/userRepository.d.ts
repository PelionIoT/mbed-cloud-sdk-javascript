import { Repository } from "../../../common/repository";
import { User } from "./user";
import { UserCreateRequest } from "./types";
import { UserListOptions } from "./types";
import { PolicyGroup } from "../../index";
import { UserUpdateRequest } from "./types";
import { Paginator } from "../../../index";
import { ListOptions } from "../../../common";
/**
 *User repository
 */
export declare class UserRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     * @param action - Action, either `create` or `invite`.
     */
    create(request: UserCreateRequest, action?: string): Promise<User>;
    /**
     * delete
     * @param id - The ID of the user to delete.
     */
    delete(id: string): Promise<void>;
    /**
     * list
     * @param options - Options to use for the List
     */
    list(options?: UserListOptions): Paginator<User, ListOptions>;
    /**
     * policyGroups
     * @param id - The ID of the user.
     * @param options - options
     */
    policyGroups(id: string, options?: ListOptions): Paginator<PolicyGroup, ListOptions>;
    /**
     * read
     * @param id - The ID of the user.
     */
    read(id: string): Promise<User>;
    /**
     * update
     * @param request - The entity to perform action on.
     * @param id - The ID of the user.
     */
    update(request: UserUpdateRequest, id: string): Promise<User>;
}