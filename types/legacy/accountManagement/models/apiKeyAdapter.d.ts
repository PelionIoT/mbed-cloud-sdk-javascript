import { ApiKeyInfoReq as apiApiKeyAdd, ApiKeyInfoResp as apiApiKey, ApiKeyUpdateReq as apiApiKeyUpdate } from "../../_api/iam";
import { AccountManagementApi } from "../accountManagementApi";
import { AddApiKeyObject, UpdateApiKeyObject } from "../types";
import { ApiKey } from "./apiKey";
/**
 * API Key Adapter
 */
export declare class ApiKeyAdapter {
    static map(from: apiApiKey, api: AccountManagementApi): ApiKey;
    static addMap(from: AddApiKeyObject): apiApiKeyAdd;
    static updateMap(from: UpdateApiKeyObject): apiApiKeyUpdate;
}
