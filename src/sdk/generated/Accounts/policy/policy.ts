import { Entity } from "../../../common/entity";

/**
 * Policy
 */
export interface Policy extends Entity {
    /**
     * Comma separated list of actions, empty string represents all actions.
     */
    readonly action?: string;

    /**
     * True or false controlling whether an action is allowed or not.
     */
    readonly allow?: boolean;

    /**
     * Feature name corresponding to this policy.
     */
    readonly feature?: string;

    /**
     * Flag indicating whether this feature is inherited or overwritten specifically.
     */
    readonly inherited?: boolean;

    /**
     * Resource that is protected by this policy.
     */
    readonly resource?: string;
}
