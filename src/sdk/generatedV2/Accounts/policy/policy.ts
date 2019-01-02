/**
 *Policy
 */
export interface Policy {
    /**
     *action
     */
    action: string;

    /**
     *allow
     */
    allow: boolean;

    /**
     *feature
     */
    feature: string;

    /**
     *inherited
     */
    inherited: boolean;

    /**
     *resource
     */
    resource: string;
}
