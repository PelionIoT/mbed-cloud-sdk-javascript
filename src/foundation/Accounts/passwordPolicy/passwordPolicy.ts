import { Entity } from "../../../common/entity";
/**
 *PasswordPolicy
 */
export interface PasswordPolicy extends Entity {
    /**
     *Minimum length for the password.
     *@example 8
     */
    readonly minimumLength?: number;
}
