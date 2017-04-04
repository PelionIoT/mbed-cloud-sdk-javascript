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
//export { DevicesApi } from "./devices";
export { LoggingApi } from "./logging";
export { StatisticsApi } from "./statistics";
//export { UpdateApi } from "./update";

/*
check errors (401, 404) are correctly handled and brought back into error response
extract maps to adapter
move all object functions to use "this"
replace all single value calls with value instead of object (#21)
*/

// design structure of filter request object
// add policies and subAccounts to iam.accounttype
// add listPolicies and listSubAccounts to User
// document includeExpired and type on listCertificates()
// update certificate example

// Fix issues - 
// Add DeviceSubscriptions models?? <-perhaps after examples

// remove noexplicitany?
