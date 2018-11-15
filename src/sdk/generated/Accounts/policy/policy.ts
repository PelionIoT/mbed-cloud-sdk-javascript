import { EntityBase } from "../../../common/entityBase";

/**
 * Policy
 */
export class Policy extends EntityBase {
    /**
     * Comma separated list of actions, empty string represents all actions.
     */
    public action?: string;

    /**
     * True or false controlling whether an action is allowed or not.
     */
    public allow?: boolean;

    /**
     * Feature name corresponding to this policy.
     */
    public feature?: string;

    /**
     * Flag indicating whether this feature is inherited or overwritten specifically.
     */
    public inherited?: boolean;

    /**
     * Resource that is protected by this policy.
     */
    public resource?: string;
}
