import { PreSharedKey as ConnectorPSKFull, PreSharedKeyWithoutSecret as ConnectorPSKPartial } from "../../_api/connector_bootstrap";
import { BootstrapApi } from "../bootstrapApi";
import { PreSharedKey } from "./preSharedKey";
import { AddPreSharedKey } from "../types";
export declare const mapToSDK: (from: ConnectorPSKPartial, api: BootstrapApi) => PreSharedKey;
export declare const stripToken: (from: AddPreSharedKey, api: BootstrapApi) => PreSharedKey;
export declare const mapToSpec: (from: AddPreSharedKey) => ConnectorPSKFull;
