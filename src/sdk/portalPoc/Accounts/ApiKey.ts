import { ApiKeyStatus } from "./ApiKeyStatus";

export interface ApiKey {
    readonly id: string;
    readonly key: string;
    readonly name: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    readonly groups?: Array<string>;
    readonly owner?: string;
    readonly lastLoginTime?: number;
    readonly status?: ApiKeyStatus;
    readonly creationTime?: number;
}

export interface ApiKeyUpdateRequest {
    readonly name: string;
    readonly owner?: string;
    readonly groups?: Array<string>;
    readonly status?: ApiKeyStatus;
}

export interface ApiKeyCreateRequest {
    readonly name: string;
    readonly owner?: string;
    readonly groups?: Array<string>;
    readonly status?: ApiKeyStatus;
}
