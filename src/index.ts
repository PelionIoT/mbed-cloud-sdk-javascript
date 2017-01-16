/* 
* mbed Cloud JavaScript SDK
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

//import config = require('./helpers/node_config');
export { Access } from "./access";
export { Development } from "./development";
//export { Devices } from "./devices";
//export { Update } from "./update";
export { Logging } from "./logging";

//DeviceLogSerializer to DeviceLogSerializerData in device_catalog

// add comments to code from https://github.com/ARMmbed/mbed-cloud-sdk-javascript/tree/7ec7b3142c8c19d22125dd8440d9cea2071320f6/dist/_backends
// add events/subscriptions to devices/endpoints/resources for updates got through long polling notifications w/ obs guards?

// implement presubscriptions and test?
// implement webhooks and test? webhooks can be done

// others: putvalue, deleteresource, execute

// examples in ts?
// config env/minimist
// split into multiple files?
// legal approval
// polygoat to deffotyped?

// access - users, groups, keys, policies?

// development - certs
// update - manifest mgmt, firmware mgmt, start and monitor campaigns
// look at dqs and device catalog into devices
// unit testing + mock server?
// querying/sorting/paging
