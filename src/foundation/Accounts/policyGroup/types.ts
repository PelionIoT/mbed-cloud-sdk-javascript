import { ListOptions } from "../../../common";
/**
 *PolicyGroupCreateRequest
 */
export interface PolicyGroupCreateRequest {
    /**
     *Represents arrays of user and API key IDs.
     */
    readonly members?: any;

    /**
     *The name of the group.
     *@example Administrators
     */
    readonly name: string;
}
/**
 *PolicyGroupUpdateRequest
 */
export interface PolicyGroupUpdateRequest {
    /**
     *The name of the group.
     *@example Administrators
     */
    readonly name: string;
}
/**
 *PolicyGroupNameFilter
 */
export interface PolicyGroupNameFilter {
    /**
     *name equal to
     */
    eq?: string;
}
/**
 *PolicyGroupFilter
 */
export interface PolicyGroupFilter {
    /**
     *Filter by name on PolicyGroup
     */
    name?: string | PolicyGroupNameFilter;
}
/**
 *PolicyGroupListOptions
 */
export interface PolicyGroupListOptions extends ListOptions {
    /**
     *Filter for PolicyGroup
     */
    filter?: PolicyGroupFilter;
}
/**
 *PolicyGroupUserStatusFilter
 */
export interface PolicyGroupUserStatusFilter {
    /**
     *status equal to
     */
    eq?: string;

    /**
     *status in
     */
    in?: Array<string>;

    /**
     *status not in
     */
    nin?: Array<string>;
}
/**
 *PolicyGroupUserFilter
 */
export interface PolicyGroupUserFilter {
    /**
     *Filter by status on User
     */
    status?: string | PolicyGroupUserStatusFilter;
}
/**
 *PolicyGroupUserListOptions
 */
export interface PolicyGroupUserListOptions extends ListOptions {
    /**
     *Filter for User
     */
    filter?: PolicyGroupUserFilter;
}
