export type SubtenantApiKeyStatus = "ACTIVE" | "INACTIVE";
/**
 *SubtenantApiKeyCreateRequest
 */
export interface SubtenantApiKeyCreateRequest {
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
    readonly status?: SubtenantApiKeyStatus;
}
/**
 *SubtenantApiKeyUpdateRequest
 */
export interface SubtenantApiKeyUpdateRequest {
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
    readonly status?: SubtenantApiKeyStatus;
}
