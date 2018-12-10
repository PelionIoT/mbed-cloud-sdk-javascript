import { ListOptions } from "../../../../common/interfaces";

export type ApiKeyStatusEnum = "ACTIVE" | "INACTIVE";

export interface ApiKeyUpdateRequest {
    readonly name: string;
    readonly owner?: string;
    readonly groups?: Array<string>;
    readonly status?: ApiKeyStatusEnum;
}

export interface ApiKeyCreateRequest {
    readonly name: string;
    readonly owner?: string;
    readonly groups?: Array<string>;
    readonly status?: ApiKeyStatusEnum;
}

export interface ApiKeyListOptions extends ListOptions {
    keyEq?: string;
    ownerEq?: string;
}
