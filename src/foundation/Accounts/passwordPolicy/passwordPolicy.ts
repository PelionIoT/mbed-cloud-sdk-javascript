import { Entity } from "../../../common/entity";
/**
 *PasswordPolicy
 */
export interface PasswordPolicy extends Entity {
    /**
     *Minimum length for the password. A number between 8 and 512.
     *@example 8
     */
    readonly minimumLength?: string;
}
