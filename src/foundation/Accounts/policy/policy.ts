import { Entity } from "../../../common/entity";
/**
 *Policy
 */
export interface Policy extends Entity {
    /**
     *action
     */
    readonly action?: string;

    /**
     *allow
     */
    readonly allow?: boolean;

    /**
     *feature
     */
    readonly feature?: string;

    /**
     *inherited
     */
    readonly inherited?: boolean;

    /**
     *resource
     */
    readonly resource?: string;
}
