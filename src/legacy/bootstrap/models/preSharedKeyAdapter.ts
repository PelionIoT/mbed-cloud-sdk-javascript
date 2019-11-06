/*
 * Pelion Device Management JavaScript SDK
 * Copyright Arm Limited 2018
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {
    PreSharedKey as ConnectorPSKFull,
    PreSharedKeyWithoutSecret as ConnectorPSKPartial,
} from "../../_api/connector_bootstrap";
import { BootstrapApi } from "../bootstrapApi";
import { AddPreSharedKey } from "../types";
import { PreSharedKey } from "./preSharedKey";

/**
 * Internal
 * @ignore
 */
export const mapToSDK = (from: ConnectorPSKPartial, api: BootstrapApi): PreSharedKey => {
    return new PreSharedKey(
        {
            endpointName: from.endpoint_name,
            createdAt: from.created_at,
            secretHex: null,
        },
        api
    );
};

/**
 * Internal
 * @ignore
 */
export const mapFrom = (from: AddPreSharedKey, api: BootstrapApi): PreSharedKey => {
    return new PreSharedKey(
        {
            endpointName: from.endpointName,
            secretHex: from.secretHex,
        },
        api
    );
};

/**
 * Internal
 * @ignore
 */
export const mapToSpec = (from: AddPreSharedKey): ConnectorPSKFull => {
    return {
        endpoint_name: from.endpointName,
        secret_hex: from.secretHex,
    };
};
