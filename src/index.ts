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
export { UpdateApi } from "./update";

// add policies and subAccounts to iam.accounttype
// add listPolicies and listSubAccounts to User
// document includeExpired and type on listCertificates()
// update certificate example

// work out how new filters work __eq, etc.
// strongly type all add/update objects?
// add typed callbackfn?
// Fix issues - replace all single value calls with value instead of object (#21)
// Add DeviceSubscriptions models?? <-perhaps after examples
