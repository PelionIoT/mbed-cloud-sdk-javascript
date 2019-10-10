import { ListOptions } from "../../../common";
/**
 *SubtenantPolicyGroupCreateRequest
 */
export interface SubtenantPolicyGroupCreateRequest {
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
 *SubtenantPolicyGroupUpdateRequest
 */
export interface SubtenantPolicyGroupUpdateRequest {
    /**
     *The name of the group.
     *@example Administrators
     */
    readonly name: string;
}
/**
 *SubtenantPolicyGroupNameFilter
 */
export interface SubtenantPolicyGroupNameFilter {
    /**
     *name equal to
     */
    eq?: string;
}
/**
 *SubtenantPolicyGroupFilter
 */
export interface SubtenantPolicyGroupFilter {
    /**
     *Filter by name on SubtenantPolicyGroup
     */
    name?: string | SubtenantPolicyGroupNameFilter;
}
/**
 *SubtenantPolicyGroupListOptions
 */
export interface SubtenantPolicyGroupListOptions extends ListOptions {
    /**
     *Filter for SubtenantPolicyGroup
     */
    filter?: SubtenantPolicyGroupFilter;
}
/**
 *SubtenantPolicyGroupSubtenantUserStatusFilter
 */
export interface SubtenantPolicyGroupSubtenantUserStatusFilter {
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
 *SubtenantPolicyGroupSubtenantUserFilter
 */
export interface SubtenantPolicyGroupSubtenantUserFilter {
    /**
     *Filter by status on SubtenantUser
     */
    status?: string | SubtenantPolicyGroupSubtenantUserStatusFilter;
}
/**
 *SubtenantPolicyGroupSubtenantUserListOptions
 */
export interface SubtenantPolicyGroupSubtenantUserListOptions extends ListOptions {
    /**
     *Filter for SubtenantUser
     */
    filter?: SubtenantPolicyGroupSubtenantUserFilter;
}
