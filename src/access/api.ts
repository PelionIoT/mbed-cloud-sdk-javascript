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

import { ConnectionOptions } from "../helpers/interfaces";
import {
    DefaultApi, DefaultApiApiKeys,
    DeveloperApi, DeveloperApiApiKeys,
    RootAdminApi, RootAdminApiApiKeys,
    AccountAdminApi, AccountAdminApiApiKeys
} from "../_api/iam";

export class Api {

    default: DefaultApi;
    developer: DeveloperApi;
    admin: AccountAdminApi;
    root: RootAdminApi;

    constructor(options: ConnectionOptions) {
        this.default = new DefaultApi(options.host);
        this.developer = new DeveloperApi(options.host);
        this.admin = new AccountAdminApi(options.host);
        this.root = new RootAdminApi(options.host);

        this.default.setApiKey(DefaultApiApiKeys.Bearer, "Bearer " + options.accessKey);
        this.developer.setApiKey(DeveloperApiApiKeys.Bearer, "Bearer " + options.accessKey);
        this.admin.setApiKey(AccountAdminApiApiKeys.Bearer, "Bearer " + options.accessKey);
        this.root.setApiKey(RootAdminApiApiKeys.Bearer, "Bearer " + options.accessKey);
    }
}
