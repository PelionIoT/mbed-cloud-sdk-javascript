import { ApiKeyStatus } from "./ApiKeyStatus";

export interface ApiKey {
    readonly id: string;
    readonly key: string;
    readonly name: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    readonly groups?: string[];
    readonly owner?: string;
    readonly lastLoginTime?: number;
    readonly status?: ApiKeyStatus;
    readonly creationTime?: number;
}

export interface ApiKeyUpdateRequest {
    name: string;
    owner?: string;
    groups?: string[];
    status?: ApiKeyStatus;
}

export interface ApiKeyCreateRequest {
    name: string;
    owner?: string;
    groups?: string[];
    status?: ApiKeyStatus;
}
