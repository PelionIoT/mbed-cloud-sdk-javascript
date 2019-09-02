import { ApiKeyInfoReq as apiApiKeyAdd, ApiKeyUpdateReq as apiApiKeyUpdate, ApiKeyInfoResp as apiApiKey } from "../../_api/iam";
import { AddApiKeyObject, UpdateApiKeyObject } from "../types";
import { AccountManagementApi } from "../accountManagementApi";
import { ApiKey } from "./apiKey";
/**
 * API Key Adapter
 */
export declare class ApiKeyAdapter {
    static map(from: apiApiKey, api: AccountManagementApi): ApiKey;
    static addMap(from: AddApiKeyObject): apiApiKeyAdd;
    static updateMap(from: UpdateApiKeyObject): apiApiKeyUpdate;
}
