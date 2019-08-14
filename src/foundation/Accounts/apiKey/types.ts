import { ListOptions } from "../../../common";
export type ApiKeyStatus = "ACTIVE" | "INACTIVE";
/**
 *ApiKeyCreateRequest
 */
export interface ApiKeyCreateRequest {
    /**
     *groups
     */
    readonly groups?: Array<string>;

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
     *groups
     */
    readonly groups?: Array<string>;

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
     *key equal to
     */
    eq?: string;
}
/**
 *ApiKeyOwnerFilter
 */
export interface ApiKeyOwnerFilter {
    /**
     *owner equal to
     */
    eq?: string;
}
/**
 *ApiKeyFilter
 */
export interface ApiKeyFilter {
    /**
     *Filter by key on ApiKey
     */
    key?: string | ApiKeyKeyFilter;

    /**
     *Filter by owner on ApiKey
     */
    owner?: string | ApiKeyOwnerFilter;
}
/**
 *ApiKeyListOptions
 */
export interface ApiKeyListOptions extends ListOptions {
    /**
     *Filter for ApiKey
     */
    filter?: ApiKeyFilter;
}
