import { Entity } from "../../../common/entity";
/**
 *Policy
 */
export interface Policy extends Entity {
    /**
     *action
     */
    action?: string;

    /**
     *allow
     */
    allow?: boolean;

    /**
     *feature
     */
    feature?: string;

    /**
     *inherited
     */
    inherited?: boolean;

    /**
     *resource
     */
    resource?: string;
}
