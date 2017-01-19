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
    EndpointsApi, EndpointsApiApiKeys,
    NotificationsApi, NotificationsApiApiKeys,
    ResourcesApi, ResourcesApiApiKeys,
    SubscriptionsApi, SubscriptionsApiApiKeys
} from "../_api/mds";
import {
    DefaultApi as CatalogApi,
    DefaultApiApiKeys as CatalogApiApiKeys
} from "../_api/device_catalog";
import {
    DefaultApi as QueryApi,
    DefaultApiApiKeys as QueryApiApiKeys
} from "../_api/device_query_service";

export class Endpoints {

    endpoints: EndpointsApi;
    notifications: NotificationsApi;
    resources: ResourcesApi;
    subscriptions: SubscriptionsApi;
    catalog: CatalogApi;
    query: QueryApi;

    constructor(options: ConnectionOptions) {
        this.endpoints = new EndpointsApi(options.host);
        this.notifications = new NotificationsApi(options.host);
        this.resources = new ResourcesApi(options.host);
        this.subscriptions = new SubscriptionsApi(options.host);
        this.catalog = new CatalogApi(options.host);
        this.query = new QueryApi(options.host);

        this.endpoints.setApiKey(EndpointsApiApiKeys.Bearer, "Bearer " + options.apiKey);
        this.notifications.setApiKey(NotificationsApiApiKeys.Bearer, "Bearer " + options.apiKey);
        this.resources.setApiKey(ResourcesApiApiKeys.Bearer, "Bearer " + options.apiKey);
        this.subscriptions.setApiKey(SubscriptionsApiApiKeys.Bearer, "Bearer " + options.apiKey);
        this.catalog.setApiKey(CatalogApiApiKeys.Bearer, "Bearer " + options.apiKey);
        this.query.setApiKey(QueryApiApiKeys.Bearer, "Bearer " + options.apiKey);
    }
}
