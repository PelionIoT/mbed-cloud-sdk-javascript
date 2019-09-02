import { PreSharedKey as ConnectorPSKFull, PreSharedKeyWithoutSecret as ConnectorPSKPartial } from "../../_api/connector_bootstrap";
import { BootstrapApi } from "../bootstrapApi";
import { PreSharedKey } from "./preSharedKey";
import { AddPreSharedKey } from "../types";
/**
 * Internal
 * @ignore
 */
export declare const mapToSDK: (from: ConnectorPSKPartial, api: BootstrapApi) => PreSharedKey;
/**
 * Internal
 * @ignore
 */
export declare const mapFrom: (from: AddPreSharedKey, api: BootstrapApi) => PreSharedKey;
/**
 * Internal
 * @ignore
 */
export declare const mapToSpec: (from: AddPreSharedKey) => ConnectorPSKFull;
