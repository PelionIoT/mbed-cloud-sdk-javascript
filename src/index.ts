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

// Fix issues - replace all single value calls with value instead of object (#21)
// Add "getting your API Key"" instructions to readme and make a more long-winded "getting started" mini guide:)
// Add DeviceSubscriptions models?? <-perhaps after examples
// add links to examples from inline code

/**
 * Root Access API:
 * ----------------
 * Available, not implemented
 * access.activateUser
 * access.applyPasswordRecovery
 * access.getInvitedUser
 * access.getSelfEnrollingUser
 * access.registerAccount
 * access.requestPasswordRecovery
 * access.signup
 * access.verifySelfEnrollment
 */