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
import { Access } from "./access/";
//import Development = require('./development');
import { Devices } from "./devices/";
//import Logging = require('./logging');
//import Manufacturing = require('./manufacturing');
//import Update = require('./update');

export = {
//	config: config,
    Access: Access,
//    Assets: Assets,
//    Billing: Billing,
//    Development: Development,
    Devices: Devices
//    Logging: Logging,
//    Manufacturing: Manufacturing,
//    Statistics: Statistics,
//    Update: Update
};

// examples in ts?
// config env/minimist
// read generated docs https://github.com/ARMmbed/mbed-cloud-sdk-javascript/tree/7ec7b3142c8c19d22125dd8440d9cea2071320f6/dist/_backends/mds/docs
// longpolling
// wire up rest of devices
// iam
// unit testing + mock server?
// querying/sorting/paging
