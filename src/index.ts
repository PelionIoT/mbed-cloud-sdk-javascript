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

export { AccessApi } from "./access";
export { CertificatesApi } from "./certificates";
export { DevicesApi } from "./devices";
export { LoggingApi } from "./logging";
export { StatisticsApi } from "./statistics";
export { UpdateApi } from "./update";

// ERRORS
// check errors (401, 404) are correctly handled and brought back into error response
// check proxy works and passes all errors properly
// check top=level error handling (#26) and handling of failed calls (incorrect keys, etc.)
// Add own error type structure>

// doc improvements
// check other github issues
// design structure of filter request object - all the crap on listDevices
// get devicesapi.notify working with events

// EXAMPLES
// check: device-logs
// check: webhook
// check: device-management
// check: long-polling
// check: query-management
// update: certificate
// add: statistics (node to dump or web to visualize)
// add: subscriptions (node)
// add: users/keys management (node)
// add: update (web)

// OTHER
// document includeExpired and type on listCertificates()
// remove noexplicitany?
// Add DeviceSubscriptions models?? <-perhaps after examples
// expose request ID
