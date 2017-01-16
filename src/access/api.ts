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
    DefaultApi as AccessApi,
    DefaultApiApiKeys as AccessApiApiKeys,
    DeveloperApi, DeveloperApiApiKeys,
    AccountAdminApi, AccountAdminApiApiKeys
} from "../_api/iam";

export class Api {

    access: AccessApi;
    developer: DeveloperApi;
    admin: AccountAdminApi;

    constructor(options: ConnectionOptions) {
        this.access = new AccessApi(options.host);
        this.developer = new DeveloperApi(options.host);
        this.admin = new AccountAdminApi(options.host);

        this.access.setApiKey(AccessApiApiKeys.Bearer, "Bearer " + options.accessKey);
        this.developer.setApiKey(DeveloperApiApiKeys.Bearer, "Bearer " + options.accessKey);
        this.admin.setApiKey(AccountAdminApiApiKeys.Bearer, "Bearer " + options.accessKey);
    }
}
