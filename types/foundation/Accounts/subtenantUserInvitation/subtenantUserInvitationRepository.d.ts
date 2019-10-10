import { Repository } from "../../../common/repository";
import { SubtenantUserInvitation } from "./subtenantUserInvitation";
import { SubtenantUserInvitationCreateRequest } from "./types";
/**
 *SubtenantUserInvitation repository
 */
export declare class SubtenantUserInvitationRepository extends Repository {
    /**
     * create
     * @param request - The entity to perform action on.
     * @param accountId - The ID of the account the user is invited to.
     */
    create(request: SubtenantUserInvitationCreateRequest, accountId: string): Promise<SubtenantUserInvitation>;
    /**
     * delete
     * @param accountId - Account ID.
     * @param id - The ID of the invitation to delete.
     */
    delete(accountId: string, id: string): Promise<void>;
    /**
     * read
     * @param accountId - The ID of the account the user is invited to.
     * @param id - The ID of the invitation.
     */
    read(accountId: string, id: string): Promise<SubtenantUserInvitation>;
}
