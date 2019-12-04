/**
 * Policy
 * This object represents a feature policy. Either the feature or the resource must be specified.
 */
export declare class Policy {
    /**
     * Comma separated list of actions, empty string represents all actions.
     */
    readonly action?: string;
    /**
     * Resource that is protected by this policy.
     */
    readonly resource?: string;
    /**
     * Feature name corresponding to this policy.
     */
    readonly feature?: string;
    /**
     * True or false controlling whether an action is allowed or not.
     */
    readonly allow?: boolean;
    constructor(init: Partial<Policy>);
}
