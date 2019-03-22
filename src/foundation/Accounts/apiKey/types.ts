import { ListOptions } from "../../../legacy/common/interfaces";
export type ApiKeyStatusEnum = "ACTIVE" | "INACTIVE";
/**
 *ApiKeyCreateRequest
 */
export interface ApiKeyCreateRequest {
    /**
     *name
     */
    readonly name: string;

    /**
     *owner
     */
    readonly owner?: string;

    /**
     *status
     */
    readonly status?: ApiKeyStatusEnum;
}
/**
 *ApiKeyUpdateRequest
 */
export interface ApiKeyUpdateRequest {
    /**
     *name
     */
    readonly name: string;

    /**
     *owner
     */
    readonly owner?: string;

    /**
     *status
     */
    readonly status?: ApiKeyStatusEnum;
}
/**
 *ApiKeyKeyFilter
 */
export interface ApiKeyKeyFilter {
    /**
     *eq
     */
    eq?: string;
}
/**
 *ApiKeyOwnerFilter
 */
export interface ApiKeyOwnerFilter {
    /**
     *eq
     */
    eq?: string;
}
/**
 *ApiKeyFilter
 */
export interface ApiKeyFilter {
    /**
     *key
     */
    key?: string | ApiKeyKeyFilter;

    /**
     *owner
     */
    owner?: string | ApiKeyOwnerFilter;
}
/**
 *ApiKeyListOptions
 */
export interface ApiKeyListOptions extends ListOptions {
    /**
     *filter
     */
    filter?: ApiKeyFilter;
}
