import { Repository } from "../../../common/repository";
import { UserInvitation } from "./userInvitation";
import { UserInvitationCreateRequest } from "./types";
import { UserInvitationListOptions } from "./types";
import { Paginator } from "../../../common/pagination";
import { ListOptions } from "../../../legacy/common/interfaces";
/**
 *UserInvitation repository
 */
export declare class UserInvitationRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     */
    create(request: UserInvitationCreateRequest): Promise<UserInvitation>;
    /**
     * delete
     * @param id - The ID of the invitation to delete.
     */
    delete(id: string): Promise<void>;
    /**
     * list
     * @param options - Options to use for the List
     */
    list(options?: UserInvitationListOptions): Paginator<UserInvitation, ListOptions>;
    /**
     * read
     * @param id - The ID of the invitation.
     */
    read(id: string): Promise<UserInvitation>;
}
