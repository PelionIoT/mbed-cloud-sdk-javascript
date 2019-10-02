import { Entity } from "../../../common/entity";
/**
 *ParentAccount
 */
export interface ParentAccount extends Entity {
    /**
     *The email address of the admin user who is the contact person of the parent account.
     *@example info@arm.com
     */
    readonly adminEmail?: string;
    /**
     *The name of the admin user who is the contact person of the parent account.
     *@example J. Doe
     */
    readonly adminName?: string;
}
