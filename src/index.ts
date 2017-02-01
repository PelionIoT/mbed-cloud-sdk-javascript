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

/*
expand requests:

DevicesApi.updateDevice && DevicesApi.device.update
DevicesApi.addDevice
*/

// Add DeviceSubscriptions models?? <-perhaps after examples
// ADDITIONAL
// extract common superagent functions in _APIs to single file?
// polygoat to deffotyped?
// add links to examples from inline code
