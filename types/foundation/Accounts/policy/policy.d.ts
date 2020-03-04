import { Entity } from "../../../common/entity";
import { PolicyInheritedType } from "./types";
/**
 *Policy
 */
export interface Policy extends Entity {
    /**
     *Comma-separated list of actions, empty string represents all actions.
     *@example GET
     */
    readonly action?: string;
    /**
     *True or false controlling whether an action is allowed or not.
     *@example true
     */
    readonly allow?: boolean;
    /**
     *Feature name corresponding to this policy.
     *@example update-campaigns
     */
    readonly feature?: string;
    /**
     *Flag indicating whether this feature is inherited or overwritten specifically.
     */
    readonly inherited?: boolean;
    /**
     *An ID indicating where this policy is inherited from.
     *@example 016ada3ec2d46665bf66e32e00000000
     */
    readonly inheritedFrom?: string;
    /**
     *Indicates the type of entity this policy is inherited from.
     *@example account
     */
    readonly inheritedType?: PolicyInheritedType;
    /**
     *Resource that is protected by this policy.
     *@example /v3/update-campaign
     */
    readonly resource?: string;
}
