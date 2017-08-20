/*
* Mbed Cloud JavaScript SDK
* Copyright ARM Limited 2017
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

export class Filters {

    static readonly NESTED_FILTERS = ["customAttributes"];

    static readonly DEVICE_FILTER_MAP = {
        from: [
            "alias",
            "bootstrapCertificateExpiration",
            "certificateFingerprint",
            "certificateIssuerId",
            "connectorCertificateExpiration"
        ],
        to: [
            "endpoint_name",
            "bootstrap_expiration_date",
            "device_key",
            "ca_id",
            "connector_expiration_date"
        ]
    };

    static readonly DEVICE_EVENT_FILTER_MAP = {
        from: [
            "eventDate",
            "type"
        ],
        to: [
            "date_time",
            "event_type"
        ]
    };

    static readonly EMPTY_FILTER_MAP = {
        from: [],
        to: []
    };
}
