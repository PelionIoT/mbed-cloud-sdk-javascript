/*
* Pelion Device Management JavaScript SDK
* Copyright Arm Limited 2017
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
import { EndpointsBase } from "../common/endpointsBase";
import { AccountAdminApi as AdminApi, DeveloperApi as AccountDeveloperApi, } from "../_api/iam";
import { DeveloperCertificateApi as ConnectorApi, ServerCredentialsApi } from "../_api/connector_ca";
export class Endpoints extends EndpointsBase {
    constructor(options) {
        super();
        this.accountDeveloper = new AccountDeveloperApi(options, this.responseHandler.bind(this));
        this.connector = new ConnectorApi(options, this.responseHandler.bind(this));
        this.admin = new AdminApi(options, this.responseHandler.bind(this));
        this.serverCredentials = new ServerCredentialsApi(options, this.responseHandler.bind(this));
    }
}
//# sourceMappingURL=endpoints.js.map