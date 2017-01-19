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
export { DevelopmentApi } from "./development";
export { DevicesApi } from "./devices";
export { LoggingApi } from "./logging";
export { UpdateApi } from "./update";

// implement webhooks and test? webhooks can be done - node
// query/page devices - web
// long polling example - web
// get/set resource value example - web
// implement presubscriptions and test? - node

// others: putvalue, deleteresource, execute

// polygoat to deffotyped?
// catch/rethrow exceptions in JS - up to me?

// access - users, groups, keys, policies?
// update - manifest mgmt, firmware mgmt, start and monitor campaigns

// add links to examples from inline code
// optionally add iterator/generator functions for paging if language allows
// unit testing + mock server?
