import { ListOptions } from "../../../legacy/common/interfaces";
export type ApiKeyStatusEnum = "ACTIVE" | "INACTIVE";
/**
 *ApiKeyCreateRequest
 */
export interface ApiKeyCreateRequest {
    /**
     *The display name for the API key.
     *@example API key gorgon
     */
    readonly name: string;

    /**
     *The owner of this API key, who is the creator by default.
     *@example 01619571e2e89242ac12000600000000
     */
    readonly owner?: string;

    /**
     *The status of the API key.
     *@example ACTIVE
     */
    readonly status?: ApiKeyStatus;
}
/**
 *ApiKeyUpdateRequest
 */
export interface ApiKeyUpdateRequest {
    /**
     *The display name for the API key.
     *@example API key gorgon
     */
    readonly name: string;

    /**
     *The owner of this API key, who is the creator by default.
     *@example 01619571e2e89242ac12000600000000
     */
    readonly owner?: string;

    /**
     *The status of the API key.
     *@example ACTIVE
     */
    readonly status?: ApiKeyStatus;
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
