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
import { AccountApi, StatisticsApi } from "../_api/statistics";
import { EndpointsBase } from "../common/endpointsBase";
import { DeviceRequestsApi, EndpointsApi, NotificationsApi, ResourcesApi, SubscriptionsApi, } from "../_api/mds";
export class Endpoints extends EndpointsBase {
    constructor(options) {
        super();
        this.endpoints = new EndpointsApi(options, this.responseHandler.bind(this));
        this.deviceRequests = new DeviceRequestsApi(options, this.responseHandler.bind(this));
        this.notifications = new NotificationsApi(options, this.responseHandler.bind(this));
        this.resources = new ResourcesApi(options, this.responseHandler.bind(this));
        this.subscriptions = new SubscriptionsApi(options, this.responseHandler.bind(this));
        this.account = new AccountApi(options, this.responseHandler.bind(this));
        this.statistics = new StatisticsApi(options, this.responseHandler.bind(this));
    }
}
//# sourceMappingURL=endpoints.js.map