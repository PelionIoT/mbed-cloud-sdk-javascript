import { EntityBase } from "../../../common/entityBase";

/**
 * PasswordPolicy
 */
export class PasswordPolicy extends EntityBase {
    /**
     * Minimum length for the password. A number between 8 and 512.
     */
    public minimumLength?: string;
}
