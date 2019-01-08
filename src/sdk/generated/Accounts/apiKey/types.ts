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
