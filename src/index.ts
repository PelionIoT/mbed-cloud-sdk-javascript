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
import { Access } from "./access";
import { Development } from "./development";
import { Devices } from "./devices";
import { Update } from "./update";


export = {
//	config: config,
    Access: Access, //iam
//    Assets: Assets,
//    Billing: Billing,
    Development: Development,
    Devices: Devices, //
//    Logging: Logging, // device logs from ??
//    Manufacturing: Manufacturing, //production_line_certificates, provisioining_certificates, factory_tool
//    Statistics: Statistics,
    Update: Update //firmware_catalog, deployment_service
};

// add comments to code from https://github.com/ARMmbed/mbed-cloud-sdk-javascript/tree/7ec7b3142c8c19d22125dd8440d9cea2071320f6/dist/_backends

// long polling
// examples in ts?
// config env/minimist

// wire up rest of devices (mds, device_catalog, device_query_service)
// development
// access
// update
// unit testing + mock server?
// querying/sorting/paging
