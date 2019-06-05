import { ListOptions } from "../../../legacy/common/interfaces";
export type ApiKeyStatus = "ACTIVE" | "INACTIVE";
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
 *ApiKeyApiKeyKeyFilter
 */
export interface ApiKeyApiKeyKeyFilter {
    /**
     *key equal to
     */
    eq?: string;
}
/**
 *ApiKeyApiKeyOwnerFilter
 */
export interface ApiKeyApiKeyOwnerFilter {
    /**
     *owner equal to
     */
    eq?: string;
}
/**
 *ApiKeyApiKeyFilter
 */
export interface ApiKeyApiKeyFilter {
    /**
     *Filter by key on ApiKey
     */
    key?: string | ApiKeyApiKeyKeyFilter;

    /**
     *Filter by owner on ApiKey
     */
    owner?: string | ApiKeyApiKeyOwnerFilter;
}
/**
 *ApiKeyApiKeyListOptions
 */
export interface ApiKeyApiKeyListOptions extends ListOptions {
    /**
     *Filter for ApiKey
     */
    filter?: ApiKeyApiKeyFilter;
}
